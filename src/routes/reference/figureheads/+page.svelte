<script lang="ts">
	import { page } from '$app/state';

	let figureheads = page.data.figureheads;

	const assets = import.meta.glob('$lib/assets/items/figureheads/*.webp', { eager: true });

	function getImage(filename: string) {
		return (assets[`/src/lib/assets/items/figureheads/item${filename}.webp`] as { default: string })
			?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Figureheads sorted by ID. There are {figureheads.length} figureheads.
	<br />
	<i>2023-12-19. Data source: cachedRepository.json.</i>
</p>

<table>
	{#each figureheads as figurehead}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(figurehead.id.toString())}
						alt="Figurehead."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{figurehead.name}</h3>
					<p>{figurehead.descriptionTextEn}</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<style>
	table img {
		/* height: 175px; */
		min-width: 175px;
	}
</style>
