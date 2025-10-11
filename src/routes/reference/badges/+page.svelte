<script lang="ts">
	import { page } from '$app/state';

	let badges = page.data.badges;

	const assets = import.meta.glob('$lib/assets/items/badges/*.webp', { eager: true });

	function getImage(filename: string) {
		return (assets[`/src/lib/assets/items/badges/item${filename}.webp`] as { default: string })
			?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Badges sorted by ID. There are {badges.length} badges.
	<br />
	<i>
		2023-12-20. Data source: cachedRepository.json. Missing images for "Japanese Tournament",
		"Second Anniversary", and all BFA.
	</i>
</p>

<table>
	{#each badges as badge}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(badge.id.toString())}
						alt="Badge."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{badge.nameTextEn || badge.name}</h3>
					<p>
						{badge.descriptionTextEn}
						{#if badge.nameTextEn !== badge.name && badge.nameTextEn.length}({badge.name}){/if}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<style>
	table {
		& img {
			height: 175px;
			width: 175px;
		}
	}
</style>
