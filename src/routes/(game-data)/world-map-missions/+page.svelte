<script lang="ts">
	import { page } from '$app/state';
	import { factionNames, formatDate, formatDuration, timeAgo } from '$lib/shared';

	import * as Card from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';

	let { data } = $props();
	let title = $derived(page.data.title);
	let updatedAt = $derived(page.data.worldEvents.results[0].updatedAt);
</script>

<h1>{title}</h1>

<p>
	Displays world map missions and their status. There are {data.worldEvents.results.length} missions;
	ordered by active first, newest completion time, then newest start time. <br />
	Updated {timeAgo(updatedAt)} ({formatDate(updatedAt)}).
</p>

<Card.Root id="mission-card" class="my-4">
	<Card.Content>
		{#each data.worldEvents.results as event}
			{@const isStarted = event.startTime <= new Date()}
			{@const isEnded = event.endTime <= new Date()}
			<div class="event-entry">
				<h3 class="event-name">{event.name}</h3>
				<p class="event-objectives">
					{event.objectives}{#if !event.objectives.trim().endsWith('.')}.{/if}
				</p>
				<p class="event-time">
					<span class="text-yellow-900"
						>Start{isStarted ? 'ed' : 'ing'}
						{timeAgo(event.startTime)}, End{isEnded ? 'ed' : 's'}
						{timeAgo(event.endTime)} ({formatDate(event.startTime)} to {formatDate(event.endTime)})
						ID: {event.id.toLocaleString()}</span
					>
				</p>
				{#if event.completeTime === null && isStarted && event.progress.length > 0 && event.type !== 'WorldEventControlLocationsAtEndObjective'}
					<div class="event-progress">
						{#each event.progress as faction}
							{@const current = faction?.Current ?? 2}
							{@const goal = faction?.Goal ?? 100}
							{@const percent = (current / goal) * 100}
							{@const factions = faction.FactionIds.map((id: number) => factionNames[id]).join(
								', ',
							)}
							<p>Progress: {current} / {goal} {Math.floor(percent)}%</p>
							<Progress value={percent} class="w-75" />
							<p>Faction{faction.FactionIds.length > 1 ? 's' : ''}: {factions}</p>
						{/each}
						<!-- <pre>{JSON.stringify(event.progress, null, 2)}</pre> -->
					</div>
				{/if}
				{#if event.completeTime !== null}
					{@const duration = (event.completeTime.getTime() - event.startTime.getTime()) / 1000}
					<div class="event-completed">
						{#if event.completedFactions.length > 0}
							{@const factions = event.completedFactions
								.map((id: number) => factionNames[id])
								.join(', ')}
							<p class="text-green-500">
								Winning Faction{event.completedFactions.length > 1 ? 's' : ''}: {factions}
							</p>
						{:else}
							<p class="text-green-500">No winning factions... :(</p>
						{/if}
						<p>
							<span class="text-green-500"
								>Completed {timeAgo(event.completeTime)} and lasted {formatDuration(duration)} ({formatDate(
									event.completeTime,
								)})</span
							>
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</Card.Content>
</Card.Root>

<style>
	@reference '$lib/../app.css';

	.event-entry:first-of-type {
		@apply mt-0!;
	}
	.event-entry {
		@apply mt-2;

		h3,
		p {
			@apply my-0!;
		}
	}
</style>
