<script lang="ts">
	import { page } from '$app/state';
	let themes = page.data.themes;

	const assets = import.meta.glob('$lib/assets/items/themes/*.webp', { eager: true });

	function getImage(filename: string) {
		return (assets[`/src/lib/assets/items/themes/item${filename}.webp`] as { default: string })
			?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Themes sorted by ID. There are {themes.length} themes.
	<br />
	<i>2023-12-19. Data source: cachedRepository.json.</i>
</p>

<table>
	{#each themes as theme}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(theme.id.toString())}
						alt="Theme."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{theme.name}</h3>
					<p>{@html theme.descriptionTextEn}</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<style>
	table {
		& img {
			/* height: 175px; */
			min-width: 175px;
		}
	}
</style>
