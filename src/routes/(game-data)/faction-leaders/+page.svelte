<script lang="ts">
	import type { PageData } from './$types';

	import { sub, isBefore } from 'date-fns';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';

	export let data: PageData;
	data.title.set('Faction Leaders');
	let title = data.title;
	const updatedAt = data.leaders.results[0].updatedAt;
	const nextLeaderDate = nextLeaderCycleDate();

	function isOutdated() {
		// If updatedAt is 7+ days away from nextLeaderDate, it is outdated.
		const outdatedDate = sub(nextLeaderDate, { days: 7 });
		return isBefore(updatedAt, outdatedDate);
	}

	function factionTotalLeaderEffort(factionId: number) {
		// Sum effort for all leaders of a specified faction.
		const filteredLeaders = data.leaders.results.filter(
			(leader) => leader.factionId === factionId
		);
		const totalEffort = filteredLeaders.reduce((total, leader) => total + leader.efforts, 0);
		return totalEffort;
	}

	function nextLeaderCycleDate() {
		// New leaders chosen every Tuesday at 9:21 AM UTC. -Pit 2025-01-20.
		// Copilot helped me with this (had to fix bugs twice) ＞﹏＜
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

<h1>{$title}</h1>

<p class="mt-4">
	Displays current faction leaders. Updated {data.utils.timeAgo(updatedAt)}. New leaders are
	chosen {data.utils.timeAgo(nextLeaderDate)}.
</p>
{#if isOutdated()}
	<p>Leader data is OUTDATED! Please wait for the next scan.</p>
{/if}

<Card.Root class="mt-4">
	<Card.Content>
		{#if data.leaders.success && data.leaders.results != null}
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				{#each data.utils.factionNames as faction, factionIndex}
					{#if factionIndex !== 0}
						<div>
							<h2 class="first-of-type:mt-0">{faction}</h2>
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
											<Table.Cell class="p-2 text-center font-medium">{leader.rank}</Table.Cell
											>
											<Table.Cell class="p-2"
												><a href="./players/{leader.userId}">{leader.userName.slice(0, -5)}</a
												></Table.Cell
											>
											<Table.Cell class="p-2 text-right"
												>{leader.efforts.toLocaleString()}</Table.Cell
											>
										</Table.Row>
									{/each}
								</Table.Body>
								<Table.Footer>
									<Table.Row>
										<Table.Cell class="p-2" colspan={2}>Total Effort</Table.Cell>
										<Table.Cell class="p-2 text-right"
											>{factionTotalLeaderEffort(factionIndex).toLocaleString()}</Table.Cell
										>
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
