<script lang="ts">
	import { page } from '$app/state';
	import { factionNames, formatDate, hidePcFromPlayerName, timeAgo } from '$lib/shared';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let title = $derived(data.title);
	let history = $derived(data.history);
	let stats = $derived(data.stats);
	let searchValue = $state(page.url.searchParams.get('search') ?? '');
	let playerSearchResults = $derived(data.playerSearchResults);

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const formElement = event.target as HTMLFormElement;
		const formData = new FormData(formElement);
		const search = formData.get('search')?.toString() ?? '';
		goto(`/faction-leaders/leader-history?search=${encodeURIComponent(search)}`);
		formElement.reset();
	};

	$effect(() => {
		page.url; // Run when URL changes.
		searchValue = page.url.searchParams.get('search') ?? '';
	});
</script>

<h1>{title}</h1>

<p>
	View a player's faction leader history.
	{#if history?.results.length}
		<a href="/players/{history.results[0].userId}">View player page.</a>
	{/if}
</p>

<div class="flex gap-2 flex-col sm:flex-row flex-wrap my-4">
	<div class="flex gap-2 flex-col w-full sm:w-fit">
		<!-- Player Search -->
		 {#if !history?.results}
		<Card.Root>
			<Card.Content>
				<form class="flex gap-2" onsubmit={handleSubmit}>
					<Input
						type="text"
						name="search"
						value={searchValue}
						placeholder="Search by player name"
						class="grow"
					/>
					<div class="flex gap-2">
						<Button variant="outline" type="submit">Search</Button>
					</div>
				</form>
				{#if playerSearchResults.results?.length >= 0}
					<p class="mt-4">
						{playerSearchResults.results.length.toLocaleString()} results found.
					</p>
					<div class="mt-2">
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head class="px-2">Player</Table.Head>
									<Table.Head class="px-2">Times</Table.Head>
									<Table.Head class="px-2 text-right">Top Effort</Table.Head>
									<Table.Head class="px-2 min-w-18 text-right">Effort</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each playerSearchResults.results as player}
									<Table.Row>
										<Table.Cell class="p-2"
											><a
												href={`/faction-leaders/leader-history/${player.userId}`}
												title="View player's leader history."
												>{hidePcFromPlayerName(player.userName)}</a
											></Table.Cell
										>
										<Table.Cell class="p-2">{player.timesAsLeader}</Table.Cell>
										<Table.Cell class="p-2 text-right"
											>{player.topEffort.toLocaleString()}</Table.Cell
										>
										<Table.Cell class="p-2 text-right">{player.effort.toLocaleString()}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				{/if}
			</Card.Content>
		</Card.Root>
		{/if}
		<!-- Stats  -->
		{#if history?.results}
			<div class="flex gap-2 flex-col w-full sm:w-fit">
				<Card.Root>
					<Card.Content>
						<h3 class="mt-0!">Lifetime Stats</h3>
						<ul>
							<li>
								<span class="font-medium">Total Effort:</span>
								{stats.lifetime.totalEffort.toLocaleString()}
							</li>
							<li>
								<span class="font-medium">Times as Leader:</span>
								{stats.lifetime.timesAsLeader.toLocaleString()}
							</li>
						</ul>
						<div class="mt-2 overflow-auto">
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.Head class="px-2 min-w-34">Faction</Table.Head>
										<Table.Head class="px-2 text-right">Times</Table.Head>
										<Table.Head class="px-2 min-w-18 text-right">Top Effort</Table.Head>
										<Table.Head class="px-2 min-w-18 text-right">Effort</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{#each stats.lifetime.factionStats as entry}
										<Table.Row>
											<Table.Cell class="p-2">{factionNames[entry.factionId]}</Table.Cell>
											<Table.Cell class="p-2 text-right"
												>{entry.timesAsLeader.toLocaleString()}</Table.Cell
											>
											<Table.Cell class="p-2 text-right"
												>{entry.topEffort.toLocaleString()}</Table.Cell
											>
											<Table.Cell class="p-2 text-right"
												>{entry.totalEffort.toLocaleString()}</Table.Cell
											>
										</Table.Row>
									{/each}
								</Table.Body>
							</Table.Root>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		{/if}
		<!-- Leader History -->
		{#if history?.results}
			<Card.Root>
				<Card.Content>
					<h3 class="mt-0!">Leader History</h3>
					<p>
						{history.results.length.toLocaleString()} result{history.results.length === 1
							? ''
							: 's'} found.
					</p>
					<div class="mt-2">
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head class="px-2">Date</Table.Head>
									<Table.Head class="px-2 min-w-34">Faction</Table.Head>
									<Table.Head class="px-2 text-right">Rank</Table.Head>
									<Table.Head class="px-2 min-w-18 text-right">Effort</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each history.results as entry}
									<Table.Row>
										<Table.Cell class="p-2"
											><a
												href={`/faction-leaders/${entry.submissionId}`}
												title="View faction leader list.">{formatDate(entry.updatedAt, true)}</a
											></Table.Cell
										>
										<Table.Cell class="p-2">{factionNames[entry.factionId]}</Table.Cell>
										<Table.Cell class="p-2 text-right">{entry.rank}</Table.Cell>
										<Table.Cell class="p-2 text-right">{entry.efforts.toLocaleString()}</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</Card.Content>
			</Card.Root>
		{/if}
	</div>
</div>
