<script lang="ts">
	import { page } from '$app/state';

	let decals = page.data.decals;

	const assets = import.meta.glob('$lib/assets/items/decals/*.webp', { eager: true });

	function getImage(filename: string) {
		return (assets[`/src/lib/assets/items/decals/item${filename}.webp`] as { default: string })
			?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Decals sorted by ID. There are {decals.length} decals,
	{page.data.decals.filter((decal: { workshop: boolean }) => decal.workshop).length} are from the
	<a
		target="_blank"
		href="https://steamcommunity.com/workshop/browse/?appid=209080&browsesort=accepted&requiredtags%5B%5D=Decals"
		>Steam Workshop</a
	>.
	<br /><i
		>2023-12-18. Data source: cachedRepository.json. The last 3 decals don't seem to have images.</i
	>
</p>

<table>
	{#each decals as decal}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(decal.id.toString())}
						alt="Decal."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{decal.name}</h3>
					<p>{@html decal.descriptionTextEn}</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<style>
	table img {
		height: 128px;
		width: 128px;
	}
</style>
