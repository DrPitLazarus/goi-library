<script lang="ts">
	import { page } from '$app/state';
	import { sub, isBefore } from 'date-fns';
	import { factionNames, formatDate, timeAgo } from '$lib/shared';
	import slug from 'slug';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();

	let title = $derived(page.data.title);
	let updatedAt = $derived(data.leaders.results[0].updatedAt);
	let nextLeaderDate = $derived(page.url && nextLeaderCycleDate());
	let isOutdated = $derived(page.url && isUpdatedAtOutdated());
	let totalPastLeaderListEfforts = $derived(page.url && getTotalPastLeaderListEfforts());

	function isUpdatedAtOutdated() {
		// If updatedAt is 7+ days away from nextLeaderDate, it is outdated.
		const outdatedDate = sub(nextLeaderDate, { days: 7 });
		return isBefore(updatedAt, outdatedDate);
	}

	function factionTotalLeaderEffort(factionId: number) {
		// Sum effort for all leaders of a specified faction.
		const filteredLeaders = data.leaders.results.filter((leader) => leader.factionId === factionId);
		const totalEffort = filteredLeaders.reduce((total, leader) => total + leader.efforts, 0);
		return totalEffort;
	}

	function getTotalPastLeaderListEfforts() {
		const pastLeaderLists = data.pastLeaderLists.results;
		const total = pastLeaderLists.reduce((total, list) => total + list.totalEfforts, 0);
		return total;
	}

	function nextLeaderCycleDate() {
		// New leaders chosen every Tuesday at 9:21 AM UTC. -Pit 2025-01-20.
		const now = new Date();
		const nextTuesday = new Date(now);

		// Calculate days until next Tuesday
		const dayOfWeek = 2; // Tuesday
		const daysUntilNextTuesday = (dayOfWeek + 7 - now.getUTCDay()) % 7;
		nextTuesday.setUTCDate(now.getUTCDate() + daysUntilNextTuesday);
		nextTuesday.setUTCHours(9, 21, 0, 0); // Set the time to 9:21 AM UTC
		// Check if this date is in the past. If so, set it to next week.
		if (isBefore(nextTuesday, now)) {
			nextTuesday.setUTCDate(nextTuesday.getUTCDate() + 7);
		}
		return nextTuesday;
	}
</script>

<h1>{title}</h1>

{#if !data.isHistoricSubmissionId}
	<p>
		Displays current faction leaders. Updated {timeAgo(updatedAt)}. New leaders are chosen {timeAgo(
			nextLeaderDate,
		)}.
	</p>
	{#if isOutdated}
		<p>Leader list is OUTDATED! Please wait for the next scan.</p>
	{/if}
{:else}
	<p>
		You are viewing a past leader list. <a href="/faction-leaders">Click here</a> for the current leader
		list.
	</p>
	<p>
		<span class="font-medium">Date:</span>
		{formatDate(updatedAt)} ({timeAgo(updatedAt)})
	</p>
{/if}

<ul class="mt-2 ml-6 list-disc">
	<li><a href="/faction-leaders/faction-effort">Faction Effort</a></li>
	<li><a href="/faction-leaders/leader-history">Leader History</a></li>
</ul>

<Card.Root class="my-4">
	<Card.Content>
		{#if data.leaders.success && data.leaders.results != null}
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each factionNames as faction, factionIndex}
					{#if factionIndex !== 0}
						{@const factionSlug = slug(faction)}
						<div>
							<h2 id={factionSlug} class="mt-0!"><a href="#{factionSlug}">{faction}</a></h2>
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head class="px-2">Rank</Table.Head>
										<Table.Head class="w-full px-2">Name</Table.Head>
										<Table.Head class="px-2 text-right">Effort</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each data.leaders.results.filter((leader) => leader.factionId === factionIndex) as leader}
										<Table.Row>
											<Table.Cell class="p-2 text-center font-medium">
												{leader.rank}
											</Table.Cell>
											<Table.Cell class="p-2">
												<a href="/players/{leader.userId}">{leader.userName.replace(' [PC]', '')}</a
												>
											</Table.Cell>
											<Table.Cell class="p-2 text-right">
												{leader.efforts.toLocaleString()}
											</Table.Cell>
										</Table.Row>
									{/each}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.Cell class="p-2" colspan={2}>Total Effort</Table.Cell>
										<Table.Cell class="p-2 text-right">
											{page.url && factionTotalLeaderEffort(factionIndex).toLocaleString()}
										</Table.Cell>
									</Table.Row>
								</Table.Footer>
							</Table.Root>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</Card.Content>
</Card.Root>

{#if data.pastLeaderLists.results}
	<Card.Root class="my-4 sm:w-fit max-h-svh overflow-auto scrollbar-thumb-accent">
		<Card.Content>
			<h2 id="past-leader-lists" class="mt-0!">
				<a href="#past-leader-lists">Past Leader Lists</a>
			</h2>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="px-2">ID</Table.Head>
						<Table.Head class="min-w-24 px-2">Date</Table.Head>
						<Table.Head class="px-2">Top Faction</Table.Head>
						<Table.Head class="px-2 text-right">Top Effort</Table.Head>
						<Table.Head class="px-2 text-right">Total Effort</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.pastLeaderLists.results as list}
						<Table.Row
							class={data.leaders.results[0].submissionId === list.submissionId
								? 'bg-muted/50'
								: ''}
						>
							<Table.Cell class="p-2 text-center font-medium">
								<a href="/faction-leaders/{list.submissionId}">{list.submissionId}</a>
							</Table.Cell>
							<Table.Cell class="p-2">
								<a href="/faction-leaders/{list.submissionId}">
									{formatDate(list.updatedAt, true)}
								</a>
							</Table.Cell>
							<Table.Cell class="p-2">
								{factionNames[list.topFactionEffortsId ?? 0]}
							</Table.Cell>
							<Table.Cell class="p-2 text-right">
								{list.topFactionEfforts.toLocaleString()}
							</Table.Cell>
							<Table.Cell class="p-2 text-right">
								{list.totalEfforts.toLocaleString()}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.Cell class="p-2" colspan={4}>Total Effort</Table.Cell>
						<Table.Cell class="p-2 text-right">
							{totalPastLeaderListEfforts.toLocaleString()}
						</Table.Cell>
					</Table.Row>
				</Table.Footer>
			</Table.Root>
		</Card.Content>
	</Card.Root>
{/if}
