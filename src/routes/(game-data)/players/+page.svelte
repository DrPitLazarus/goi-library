<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { factionNames, formatDuration, formatLevels, timeAgo } from '$lib/shared';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Pagination from '$lib/components/ui/pagination/';

	let { data } = $props();

	const sortOptions = [
		{ value: 'totalPlayTime-desc', label: 'Total Play Time' },
		{ value: 'totalLevels-desc', label: 'Total Levels' },
		{ value: 'lastOnline-desc', label: 'Last Online' },
		{ value: 'id', label: 'Lowest ID' },
		{ value: 'id-desc', label: 'Highest ID' },
		{ value: 'name', label: 'Name A-Z' },
		{ value: 'name-desc', label: 'Name Z-A' },
	];

	let getSelectedSortFromUrl = () =>
		sortOptions.find((option) => option.value === page.url.searchParams.get('sort'))?.value ??
		sortOptions[0].value;

	let currentPage = $state(1);
	let searchValue = $state('');
	let sortValue = '';
	let selectedSort = $state(getSelectedSortFromUrl()); // Also change sort in page.server.ts!

	function handlePageChange(pageNumber: number) {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		newSearchParams.set('page', pageNumber.toString());
		goto(`?${newSearchParams.toString()}`);
	}

	function updateValuesFromUrl() {
		currentPage = parseInt(page.url.searchParams.get('page') ?? '1');
		searchValue = page.url.searchParams.get('search') || '';
		sortValue = page.url.searchParams.get('sort') || '';
		selectedSort = getSelectedSortFromUrl();
	}

	function displayFactionTag(tag: string | null) {
		if (tag === null) return '';
		return `[${tag}] `;
	}

	type Player = (typeof data.players.results)[0];
	function displayPlayerSubtitle(playerObject: Player) {
		let selectedSortOnLoad = getSelectedSortFromUrl();
		if (selectedSortOnLoad === 'lastOnline-desc') {
			return timeAgo(playerObject.lastOnline);
		}
		if (selectedSortOnLoad === 'totalLevels-desc') {
			return `${formatLevels(playerObject.ranks as number)} T${playerObject.ranksTotal}`;
		}
		return formatDuration(playerObject.playedTimeTotal);
	}

	let selectedSortLabel = $derived(
		sortOptions.find((option) => option.value === selectedSort)?.label || sortOptions[0].label,
	);

	$effect(() => {
		page.url; // Run when URL changes.
		updateValuesFromUrl();
	});
</script>

<h1>{page.data.title}</h1>

<p>
	There are {data.players?.tableRowCount?.toLocaleString()} discovered players. Each page displays up
	to {data.players?.itemsPerPage?.toLocaleString()}
	items.
</p>
{#if data.players.items !== data.players.tableRowCount}
	<p>{data.players.items?.toLocaleString()} items matched your search.</p>
{/if}

<Card.Root class="my-4">
	<Card.Content>
		<form class="grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2" action="">
			<Input
				type="text"
				name="search"
				value={searchValue}
				placeholder="Search by name"
				class="basis-full sm:basis-1/2"
			/>
			<div class="flex basis-1/2 gap-2">
				<Select.Root type="single" name="sort" bind:value={selectedSort}>
					<Select.Trigger class="grow">
						{selectedSortLabel}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Sort by...</Select.Label>
							{#each sortOptions as option (option.value)}
								<Select.Item value={option.value} label={option.label}>
									{option.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<Button variant="outline" type="submit">Search</Button>
			</div>
		</form>

		{#if data.players.success && data.players.results != null}
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.players.results as player}
					<div class="mt-2">
						<a href="./players/{player.id}">
							<p class="m-0! text-xl">
								{displayFactionTag(player.clanTag)}{player.name.slice(0, -5)}
							</p>
							<p class="m-0!">
								{displayPlayerSubtitle(player)}
							</p>
						</a>
					</div>
				{/each}
			</div>
		{/if}

		<Pagination.Root
			count={data.players.items ?? 1}
			perPage={data.players.itemsPerPage}
			page={currentPage}
			onPageChange={handlePageChange}
			class="mt-4"
		>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<!-- <Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item> -->
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</Card.Content>
</Card.Root>
