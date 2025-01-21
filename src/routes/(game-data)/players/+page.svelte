<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Pagination from '$lib/components/ui/pagination/';
	import { goto } from '$app/navigation';

	export let data: PageData;
	data.title.set('Players');
	let title = data.title;

	const sortOptions = [
		{ value: 'totalPlayTime-desc', label: 'Total Play Time' },
		{ value: 'totalLevels-desc', label: 'Total Levels' },
		{ value: 'lastOnline-desc', label: 'Last Online' },
		{ value: 'id', label: 'Lowest ID' },
		{ value: 'id-desc', label: 'Highest ID' },
		{ value: 'name', label: 'Name A-Z' },
		{ value: 'name-desc', label: 'Name Z-A' },
	];

	let currentPage = 1;
	let searchValue = '';
	let sortValue = '';
	let selectedSort = sortOptions[0]; // Also change sort in page.server.ts!

	function handlePageChange(page: number) {
		const newSearchParams = new URLSearchParams($page.url.searchParams);
		newSearchParams.set('page', page.toString());
		goto(`?${newSearchParams.toString()}`);
	}

	function updateValuesFromUrl() {
		currentPage = parseInt($page.url.searchParams.get('page') ?? '1');
		searchValue = $page.url.searchParams.get('search') || '';
		sortValue = $page.url.searchParams.get('sort') || '';
		selectedSort = sortOptions.find((option) => option.value === sortValue) || sortOptions[0];
	}

	function displayFactionTag(tag: string | null) {
		if (tag === null) return '';
		return `[${tag}] `;
	}

	type Player = (typeof data.players.results)[0];
	function displayPlayerSubtitle(playerObject: Player) {
		if (selectedSort.value === 'lastOnline-desc') {
			return data.utils.timeAgo(playerObject.lastOnline);
		}
		if (selectedSort.value === 'totalPlayTime-desc') {
			return data.utils.formatDuration(playerObject.playedTimeTotal);
		}
		if (selectedSort.value === 'totalLevels-desc') {
			return `${data.utils.formatLevels(playerObject.ranks)} T${playerObject.ranksTotal}`;
		}
		return `Faction: ${data.utils.factionNames[playerObject.factionId]}`;
	}

	updateValuesFromUrl();

	$: {
		$page.url;
		updateValuesFromUrl();
	}
</script>

<h1>{$title}</h1>

<p class="mt-4">
	There are {data.players?.tableRowCount?.toLocaleString()} discovered players. Each page displays up
	to {data.players?.itemsPerPage?.toLocaleString()}
	items.
</p>
{#if data.players.items !== data.players.tableRowCount}
	<p>{data.players.items?.toLocaleString()} items matched your search.</p>
{/if}

<Card.Root class="mt-4">
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
				<Select.Root
					name="sort"
					selected={selectedSort}
					onSelectedChange={(v) => {
						v && (sortValue = v.value);
					}}
				>
					<Select.Trigger class="grow">
						<Select.Value placeholder="Sort by" />
					</Select.Trigger>
					<Select.Content>
						{#each sortOptions as option}
							<Select.Item value={option.value}>{option.label}</Select.Item>
						{/each}
					</Select.Content>
					<Select.Input />
				</Select.Root>
				<Button variant="secondary" type="submit">Search</Button>
			</div>
		</form>

		{#if data.players.success && data.players.results != null}
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.players.results as player}
					<div class="mt-2">
						<a href="./players/{player.id}">
							<p class="text-xl">{displayFactionTag(player.clanTag)}{player.name.slice(0, -5)}</p>
							<p>
								{#key $page.url}
									{displayPlayerSubtitle(player)}
								{/key}
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
			let:pages
			let:currentPage
			onPageChange={handlePageChange}
		>
			<Pagination.Content class="mt-4">
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<div></div>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage == page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</Card.Content>
</Card.Root>
