<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
	let title = data.title;
	$title = 'Territory Conflicts';
	let conflicts = data.conflicts.results;
	$: createdAt = data.conflicts.results[0].createdAt;
	$: uniqueTerritoryIds = [...new Set(conflicts.map((item) => item.territoryId))];

	function getConflictsByTerritoryId(territoryId: number) {
		let result = conflicts.filter((item) => item.territoryId === territoryId);
		return result;
	}

	function getTerritoryNameById(territoryId: number) {
		let result = data.worldLocations.find((item: any) => item.Id === territoryId).Name;
		return result;
	}

	function getModifiersByConflictId(conflictId: number) {
		let result = data.conflictModifiers.results.filter((item) => item.conflictId === conflictId);
		return result;
	}

	function printLeaderDiamonds(leaderCount: number) {
		if (leaderCount < 2) {
			return '';
		}
		return data.utils.diamondSymbol.repeat(leaderCount - 1);
	}

	function sumModifierAmounts(amounts: number[]): number {
		let result = amounts.reduce((total, value) => total + value, 0);
		return Number(result.toFixed(2));
	}

	function formatPercent(percent: number): string {
		percent = percent * 100;
		let result = percent > 0 ? `+${percent}%` : `${percent}%`;
		return result;
	}
</script>

<h1>{$title}</h1>

<p>
	Displays current territory conflicts (battles). <br />
	<strong>ID</strong>: {data.submissionId.toLocaleString()}.
	<strong>Date</strong>: {data.utils.formatDate(createdAt)} ({data.utils.timeAgo(createdAt)})
</p>

<Card.Root class="mt-4">
	<Card.Content>
		<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{#each uniqueTerritoryIds as territoryId}
				<div class="text-center">
					<h2>{getTerritoryNameById(territoryId)}</h2>
					{#each getConflictsByTerritoryId(territoryId) as conflict}
						{@const totalGoal = conflict.goal + conflict.additionalGoal}
						{@const progress = conflict.efforts / totalGoal}
						{@const attackerDefenderText = conflict.isDefender ? 'Defender' : 'Attacker'}
						{@const additionalGoalText =
							conflict.additionalGoal > 0 ? ` (+${conflict.additionalGoal.toLocaleString()})` : ''}
						{@const leadersText =
							conflict.leadersDeployedCount > 0 ? conflict.leadersDeployedCount.toLocaleString() : ''}

						<progress value={progress}></progress>
						<span>{Math.floor(progress * 100).toFixed(0)}%</span><br />
						<p>{attackerDefenderText}: {data.utils.factionNames[conflict.factionId]}</p>
						<p>
							Effort: {conflict.efforts.toLocaleString()} / {totalGoal.toLocaleString()}{additionalGoalText}
						</p>
						{#if leadersText}
							<p>Leaders Deployed: {leadersText} {printLeaderDiamonds(conflict.leadersDeployedCount)}</p>
						{/if}
						{@const modifiers = getModifiersByConflictId(conflict.id)}
						{#if modifiers.length}
							{@const modifiersSum = sumModifierAmounts(modifiers.map((item) => item.amount))}
							<p>Effort Modifier: {formatPercent(modifiersSum)}</p>
							{#each modifiers as modifier}
								<p class="text-yellow-900">
									{formatPercent(modifier.amount)}
									{modifier.modifier}
									{modifier.additionalInfo ?? ''}
								</p>
							{/each}
						{/if}
						{#if !conflict.isDefender}
							<div class="mt-4"></div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>

<style>
	p {
		@apply mt-4;
	}
	.grid p,
	.grid h2 {
		@apply mt-0;
	}
</style>
