<script lang="ts">
	import { page } from '$app/state';

	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Pagination from '$lib/components/ui/pagination/';
	import { goto } from '$app/navigation';

	const sortOptions = [
		{ value: 'commendations-desc', label: 'Most Commendations' },
		{ value: 'commendations', label: 'Least Commendations' },
		{ value: 'members-desc', label: 'Most Members' },
		{ value: 'members', label: 'Least Members' },
		{ value: 'id-desc', label: 'Highest ID' },
		{ value: 'id', label: 'Lowest ID' },
		{ value: 'tag', label: 'Tag A-Z' },
		{ value: 'tag-desc', label: 'Tag Z-A' },
		{ value: 'name', label: 'Name A-Z' },
		{ value: 'name-desc', label: 'Name Z-A' },
	];

	let { data } = $props();
	let currentPage = $state(1);
	let searchValue = $state('');
	let sortValue = $state('');
	let selectedSort = $state(sortOptions[0]);

	function handlePageChange(pageNumber: number) {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		newSearchParams.set('page', pageNumber.toString());
		goto(`?${newSearchParams.toString()}`);
	}

	function updateValuesFromUrl() {
		currentPage = parseInt(page.url.searchParams.get('page') ?? '1');
		searchValue = page.url.searchParams.get('search') || '';
		sortValue = page.url.searchParams.get('sort') || 'commendations-desc';
		selectedSort = sortOptions.find((option) => option.value === sortValue) || sortOptions[0];
	}

	updateValuesFromUrl();

	let selectedSortLabel = $derived(
		sortOptions.find((option) => option.value === selectedSort.value)?.label ||
			sortOptions[0].label,
	);

	$effect(() => {
		page.url; // Run when URL changes.
		updateValuesFromUrl();
	});
</script>

<h1>{page.data.title}</h1>

<p>
	There are {data.clans.tableRowCount?.toLocaleString()} clans created by players. Each page displays
	up to {data.clans.itemsPerPage?.toLocaleString()}
	items.
</p>
{#if data.clans.items !== data.clans.tableRowCount}
	<p>{data.clans.items?.toLocaleString()} items matched your search.</p>
{/if}

<Card.Root class="my-4">
	<Card.Content>
		<form class="grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2" action="">
			<Input
				type="text"
				name="search"
				value={searchValue}
				placeholder="Search by tag or name"
				class="basis-full sm:basis-1/2"
			/>
			<div class="flex basis-1/2 gap-2">
				<Select.Root type="single" name="sort" bind:value={selectedSort.value}>
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

		{#if data.clans.success && data.clans.results != null}
			<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.clans.results as clan}
					<div class="mt-2">
						<a href="./clans/{clan.id}">
							<p class="m-0! text-xl">[{clan.tag}] {clan.name}</p>
							<p class="m-0!">
								{clan.memberCount.toLocaleString()} members
								{clan.commendations.toLocaleString()} commendations
							</p>
						</a>
					</div>
				{/each}
			</div>
		{/if}

		<Pagination.Root
			count={data.clans.items ?? 1}
			perPage={data.clans.itemsPerPage}
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
