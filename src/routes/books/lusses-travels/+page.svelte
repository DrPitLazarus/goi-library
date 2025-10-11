<script lang="ts">
	import assetBookCover from '$lib/assets/books/lusses-travels.webp';
	import { maps, getToc } from '$lib/data/maps';
	import slug from 'slug';
	import TOC from '$lib/components/TOC.svelte';
	import { page } from '$app/state';

	const assetsMaps = import.meta.glob('$lib/assets/maps/*.webp', { eager: true });

	function getMapImage(filename: string) {
		return (assetsMaps[`/src/lib/assets/maps/${filename}`] as { default: string }).default;
	}

	export const toc = [
		{
			name: 'Description',
			link: '#description',
			children: [],
		},
		...getToc(),
	];
</script>

<h1>{page.data.title}</h1>

<TOC {toc}></TOC>

<details class="dashed">
	<summary>Data Source and Editor Notes</summary>
	<div>
		<p>
			Date Accessed: 2023-11-23<br />
			Obtained from the game via screenshots. Text copied with Windows' Snipping Tool OCR feature.
		</p>
	</div>
</details>

<h2 id="description">Description</h2>
<article>
	<img
		src={assetBookCover}
		alt="Green book cover with gold text reads 'Lusse's Travels: Maps for the Bold Adventurer'."
		height="683px"
		width="1024px"
	/>
	<h3>MAPS FOR THE WORLD ADVENTURER</h3>
	<p>
		The cover of this book is adorned with lavish, well-worn gold leaf lettering. The print inside
		is elegant and flowing, accompanied by exquisitely detailed maps and landscape art. The preface
		on the first page is flowery and grandiose.
	</p>
	<em>
		<p>
			When one wishes to discover the intricacies of cultures and lands unexplored, one wants for an
			expert in navigating any situation with elegance and poise. One shall need a well traveled
			connoisseur of the unfamiliar, brimming with experience among the dangers of each land.
			Without the sage advice of such a pathfinder, one would be lost to the winds and wilds in
			quite short order. In reading this book, good adventurer, you will find the pioneer of
			cartography you need to guide your adventures. From the desert mountains of the far west to
			the emerald islands of the far east, or the dangers of the icy north to the opulent mansions
			hovering high over the toxic lands of the south, let this book be your companion through the
			deadly wonders of each land.
		</p>
		<p>
			My name is Lusse. I have journeyed far and wide to gather the fascinating information you will
			find bound within these pages. No finer publication will be found, mark my words. Avoid the
			humdrum ways of sedentary life, and take to the skies! I will be certain to see you there.
		</p>
		<p>-Lusse</p>
	</em>
</article>

{#each maps as area}
	<h2 id={slug(area.areaTitle)}>{area.areaTitle}</h2>
	<article>
		{#each area.text as text}
			<p>{text}</p>
		{/each}
		{#each area.maps as map}
			<h3 id={slug(map.mapTitle)}>{map.mapTitle}</h3>
			<span
				>Gamemode: {map.gamemode}<br />
				Ships: {map.ships} <br />
				Difficulty: {map.difficulty}<br />
				{#if map.text}
					<p>{map.text}</p>
				{/if}
			</span>
			<img src={getMapImage(map.mapImage)} alt="" height="700px" width="700px" />
		{/each}
	</article>
{/each}

<style>
	img {
		width: 100%;
		max-width: 700px;
		height: auto;
	}
</style>
