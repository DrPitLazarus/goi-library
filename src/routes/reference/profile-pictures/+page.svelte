<script lang="ts">
	import { page } from '$app/state';
	let profilePictures = page.data.profilePictures;

	const assets = import.meta.glob('$lib/assets/items/profile-pictures/*.webp', { eager: true });

	function getImage(filename: string) {
		return (
			assets[`/src/lib/assets/items/profile-pictures/item${filename}.webp`] as { default: string }
		)?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Profile pictures sorted by ID. There are {profilePictures.length} profile pictures.
	<br />
	<i>
		2023-12-19. Data source: cachedRepository.json. Not sure if "Release Valve" is real, no image
		for "Colorful Jerks".
	</i>
</p>

<table>
	{#each profilePictures as profilePicture}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(profilePicture.id.toString())}
						alt="Profile avatar."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{profilePicture.name}</h3>
					<p>{@html profilePicture.descriptionTextEn}</p>
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
