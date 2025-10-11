<script lang="ts">
	import { page } from '$app/state';
	import { diamondSymbol, factionNames, formatDate, timeAgo } from '$lib/shared';
	import slug from 'slug';
	import { cn } from '$lib/utils.js';
	import { goto } from '$app/navigation';

	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';

	let { data } = $props();
	let title = $derived(page.data.title);
	let conflicts = $derived(data.conflicts.results);
	let createdAt = $derived(data.conflicts.results[0].createdAt);

	// Change text color and progress bar ([&>*] selects child) color based on faction.
	let factionIdAndStyleClass = [
		'',
		'font-semibold text-fjord [&>*]:bg-fjord',
		'font-semibold text-anglea [&>*]:bg-anglea',
		'font-semibold text-chaladon [&>*]:bg-chaladon',
		'font-semibold text-merchant [&>*]:bg-merchant',
		'font-semibold text-arashi [&>*]:bg-arashi',
		'font-semibold text-yesha [&>*]:bg-yesha',
	];

	//#region Faction Perspective Dropdown
	let perspectiveOptions = factionNames.slice(1).map((name) => ({
		value: slug(name),
		label: name,
	}));

	let getPerspectiveValueFromUrl = () =>
		perspectiveOptions.find((item) => item.value === page.url.searchParams.get('faction'))?.value ??
		perspectiveOptions[0].value;

	let selectedPerspectiveValue = $state(getPerspectiveValueFromUrl());

	let selectedPerspectiveLabel = $derived(
		perspectiveOptions.find((option) => option.value === selectedPerspectiveValue)?.label ??
			perspectiveOptions[0].label,
	);

	let selectedPerspectiveFactionId = $derived(factionNames.indexOf(selectedPerspectiveLabel));

	function onPerspectiveValueChange(value: string) {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		newSearchParams.set('faction', value);
		goto(`?${newSearchParams.toString()}`);
	}
	//#endregion

	let conflictsFiltered = $derived.by(() => {
		let factionTerritoryIds = conflicts
			.filter((item) => item.factionId === selectedPerspectiveFactionId)
			.map((item) => item.territoryId);
		let factionConflicts = conflicts
			.filter((item) => factionTerritoryIds.includes(item.territoryId))
			.sort((a, b) => {
				// Place the selected faction first.
				if (
					a.factionId === selectedPerspectiveFactionId &&
					b.factionId !== selectedPerspectiveFactionId
				) {
					return -1;
				}
				if (
					a.factionId !== selectedPerspectiveFactionId &&
					b.factionId === selectedPerspectiveFactionId
				) {
					return 1;
				}
				// Sort by progress.
				let aProgress = getProgress(a);
				let bProgress = getProgress(b);
				if (aProgress > bProgress) {
					return -1;
				}
				if (aProgress < bProgress) {
					return 1;
				}
				return 0;
			});
		// console.log(
		// 	factionConflicts.map((item) => ({
		// 		name: getTerritoryNameById(item.territoryId),
		// 		isDefender: item.isDefender,
		// 		progress: getProgress(item),
		// 	})),
		// );
		return factionConflicts;
	});
	let uniqueTerritoryIdsFiltered = $derived([
		...new Set(conflictsFiltered.map((item) => item.territoryId)),
	]);
	let attacksCount = $derived(
		conflictsFiltered.filter(
			(item) => !item.isDefender && item.factionId === selectedPerspectiveFactionId,
		).length,
	);
	let defensesCount = $derived(
		conflictsFiltered.filter(
			(item) => item.isDefender && item.factionId === selectedPerspectiveFactionId,
		).length,
	);

	function getConflictsByTerritoryId(territoryId: number) {
		// return conflicts.filter((item) => item.territoryId === territoryId);
		return conflictsFiltered.filter((item) => item.territoryId === territoryId);
	}

	function getTerritoryNameById(territoryId: number) {
		return data.worldLocations.find((item: any) => item.Id === territoryId).Name;
	}

	function getModifiersByConflictId(conflictId: number) {
		return data.conflictModifiers.results.filter((item) => item.conflictId === conflictId);
	}

	function territoryHasFactionConflict(territoryId: number, factionId: number) {
		return conflicts.some(
			(item) => item.territoryId === territoryId && item.factionId === factionId,
		);
	}

	function formatConflictLog(conflictLog: (typeof data.conflictLogs.results)[0]) {
		let title = '';
		let message = '';
		let factionName = factionNames[conflictLog.factionId];
		factionName = `<span class="${factionIdAndStyleClass[conflictLog.factionId]}">${factionName}</span>`;
		let targetFactionName = factionNames[conflictLog.targetFactionId];
		targetFactionName = `<span class="${factionIdAndStyleClass[conflictLog.targetFactionId]}">${targetFactionName}</span>`;
		let territoryName = getTerritoryNameById(conflictLog.territoryId);
		switch (conflictLog.type) {
			case 'StartAttack':
			case 'StartExtraAttack':
				title = `${territoryName} Attack Opened`;
				message = `${factionName} has begun attacking ${targetFactionName} at ${territoryName}.`;
				break;
			case 'StartDefend':
				title = `${territoryName} Defense Opened`;
				message = `${factionName} has begun defending against ${targetFactionName} at ${territoryName}.`;
				break;
			case 'GainedControl':
				title = `${territoryName} Won!`;
				message = `${factionName} has conquered ${targetFactionName} at ${territoryName}.`;
				break;
			case 'LostControl':
				title = `${territoryName} Lost...`;
				message = `${factionName} has lost control of ${territoryName} to ${targetFactionName}.`;
				break;
			case 'SuccessDefend':
				title = `${territoryName} Defended!`;
				message = `${factionName} has successfully defended ${territoryName} against ${targetFactionName}.`;
				break;
			case 'FailAttack':
				title = `${territoryName} Attack Failed...`;
				message = `${factionName} has failed in its attack on ${targetFactionName} at ${territoryName}.`;
				break;
			case 'Confiscated':
				title = `${territoryName} Contest Canceled!`;
				message = `Contest between ${factionName} and ${targetFactionName} at ${territoryName} was 
				removed because attacker was no longer adjacent to it. Efforts from both sides were moved to new contest.`;
		}
		return { title, message };
	}

	function getProgress(item: (typeof conflicts)[0]) {
		return item.efforts / (item.goal + item.additionalGoal);
	}

	function printLeaderDiamonds(leaderCount: number) {
		return leaderCount > 1 ? diamondSymbol.repeat(leaderCount - 1) : '';
	}

	function sumModifierAmounts(amounts: number[]): number {
		let result = amounts.reduce((total, value) => total + value, 0);
		return Number(result.toFixed(2));
	}

	function formatPercentChange(percent: number, toFixed: number = 0): string {
		let percentString = (percent * 100).toFixed(toFixed);
		return percent > 0 ? `+${percentString}%` : `${percentString}%`;
	}

	$effect(() => {
		page.url; // Run when URL changes.
		selectedPerspectiveValue = getPerspectiveValueFromUrl();
	});
</script>

<h1>{title}</h1>

<p>
	Displays current battles on the world map and recent events. <br />
	<strong>ID</strong>: {data.submissionId.toLocaleString()}.
	<strong>Date</strong>: {formatDate(createdAt)} ({timeAgo(createdAt)})
</p>

<Label for="faction-perspective">Faction Perspective:</Label>
<Select.Root
	type="single"
	bind:value={selectedPerspectiveValue}
	name="perspective"
	onValueChange={onPerspectiveValueChange}
>
	<Select.Trigger class="w-[250px]" id="faction-perspective">
		{selectedPerspectiveLabel}
	</Select.Trigger>
	<Select.Content>
		{#each perspectiveOptions as option (option.value)}
			<Select.Item value={option.value}>{option.label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>

<Card.Root class="my-4">
	<Card.Content>
		<h3 class="mt-0!">
			{attacksCount} Attacks, {defensesCount} Defenses
		</h3>
		<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{#each uniqueTerritoryIdsFiltered as territoryId}
				{#if territoryHasFactionConflict(territoryId, selectedPerspectiveFactionId)}
					<div class="mb-4 text-center">
						<h2>{getTerritoryNameById(territoryId)}</h2>
						{#each getConflictsByTerritoryId(territoryId) as conflict (conflict.id)}
							{@const totalGoal = conflict.goal + conflict.additionalGoal}
							{@const progress = conflict.efforts / totalGoal}
							{@const attackerDefenderText = conflict.isDefender ? 'Defender' : 'Attacker'}
							{@const additionalGoalText =
								conflict.additionalGoal > 0
									? ` (+${conflict.additionalGoal.toLocaleString()})`
									: ''}
							<p>
								{attackerDefenderText}:
								<span class={factionIdAndStyleClass[conflict.factionId]}
									>{factionNames[conflict.factionId]}</span
								>
								{printLeaderDiamonds(conflict.leadersDeployedCount)}
							</p>
							<Progress
								class={cn(`${factionIdAndStyleClass[conflict.factionId]} mx-auto w-[300px]`)}
								value={progress * 100 || 2}
							/>
							<p>
								Effort: {conflict.efforts.toLocaleString()} / {totalGoal.toLocaleString()}{additionalGoalText}
								<span>{Math.floor(progress * 100).toFixed(0)}%</span>
							</p>
							{@const modifiers = getModifiersByConflictId(conflict.id)}
							{#if modifiers.length}
								{@const modifiersSum = sumModifierAmounts(modifiers.map((item) => item.amount))}
								{#if modifiersSum != 0}
									<p>{formatPercentChange(modifiersSum)} Effort</p>
								{/if}
								{#each modifiers as modifier}
									<p class="text-yellow-900">
										{formatPercentChange(modifier.amount)}
										{modifier.modifier}
										{modifier.additionalInfo ?? ''}
									</p>
								{/each}
							{/if}
							{#if !conflict.isDefender}
								<!-- spacer after attacker -->
								<div class="mt-2"></div>
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</Card.Content>
</Card.Root>

<Card.Root class="my-4">
	<Card.Content>
		<h2 class="mt-0!" id="event-log"><a href="#event-log">Event Log</a></h2>
		{#each data.conflictLogs.results.filter((item) => item.factionId === selectedPerspectiveFactionId) as log}
			{@const formattedLog = formatConflictLog(log)}
			<div class="event-entry">
				<h3>{formattedLog.title}</h3>
				<p>{@html formattedLog.message}</p>
				<p>
					{timeAgo(log.time)}
					<span class="text-yellow-900">({formatDate(log.time)})</span>
				</p>
			</div>
		{/each}
	</Card.Content>
</Card.Root>

<style>
	@reference '$lib/../app.css';

	.event-entry {
		@apply mt-2;

		h3,
		p {
			@apply my-0!;
		}
	}

	.grid p,
	.grid h2 {
		@apply my-0;
	}
</style>
