<script lang="ts">
	import { page } from '$app/state';
	import assetBookCover from '$lib/assets/books/evadnes-ship-reports.webp';
	import { ships, getToc } from '$lib/data/ships';
	import slug from 'slug';
	import TOC from '$lib/components/TOC.svelte';

	const assetsShips = import.meta.glob('$lib/assets/ships/*.webp', { eager: true });

	function getShipImage(filename: string) {
		return (assetsShips[`/src/lib/assets/ships/${filename}.webp`] as { default: string }).default;
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
		alt="Red book cover with white rectangle reads 'Evadne's Ship Reports - A Guide to the Sky's Airships'."
		height="683px"
		width="1024px"
	/>
	<h3>A GUIDE TO THE SKY'S AIRSHIPS</h3>
	<p>
		The contents of this book match the cover; Simple, neat, and orderly. Ship diagrams play
		counterpoint to rows of numbers or diagrams describing various aspects of each ship. The
		evenness of the text indicates that it is the result of machine printed typesetting rather than
		handwritten. The preface is short and concise.
	</p>
	<em>
		<p>
			Contained within these pages you will find a report on each of the ships I have recently
			studied. The information will be of value to anyone needing to purchase a ship, or repair a
			currently owned ship. If any errors are discovered in my calculations or measurements, do not
			hesitate to contact me at my press and shipyard in Anvala.
		</p>
		<p>Fair weather and safe travels, friend.</p>
		<p>-Evadne</p>
	</em>
</article>

{#each ships as ship}
	<h2 id={slug(ship.name)}>{ship.name}</h2>
	<article>
		<img
			class="ship"
			src={getShipImage(ship.name.toLowerCase())}
			alt={`The airship ${ship.name}.`}
			height="512"
			width="512"
		/>
		<p>Difficulty: {ship.difficulty}</p>
		<p>{ship.description}</p>
		<table>
			<thead>
				<tr><th>Longitudinal Speed</th><td>{ship.longitudinalSpeed} m/s</td></tr>
			</thead>
			<tbody>
				<tr><th>Longitudinal Accel.</th><td>{ship.longitudinalAccel} m/s<sup>2</sup></td></tr>
				<tr><th>Turn Speed</th><td>{ship.turnSpeed} deg/s</td></tr>
				<tr><th>Turn Accel.</th><td>{ship.turnAccel} deg/s<sup>2</sup></td></tr>
				<tr><th>Mass</th><td>{ship.mass} tonnes</td></tr>
				<tr><th>Vertical Speed</th><td>{ship.verticalSpeed} m/s</td></tr>
				<tr><th>Vertical Accel.</th><td>{ship.verticalAccel} m/s<sup>2</sup></td></tr>
			</tbody>
		</table>
		<table>
			<tbody>
				<tr>
					<th>Speed</th>
					<td><progress value={ship.ratingSpeed} max="47"></progress> {ship.ratingSpeed}</td>
				</tr>
				<tr>
					<th>Maneuverability</th>
					<td>
						<progress value={ship.ratingManeuverability} max="0.4"></progress>
						{ship.ratingManeuverability}
					</td>
				</tr>
				<tr>
					<th>Durability</th>
					<td>
						<progress value={ship.ratingDurability} max="1750"></progress>
						{ship.ratingDurability}
					</td>
				</tr>
				<tr>
					<th>Armor</th>
					<td>
						<progress value={ship.ratingArmor} max="820"></progress>
						{ship.ratingArmor}
					</td>
				</tr>
				<tr>
					<th>Firepower</th>
					<td>
						<progress value={ship.ratingFirepower} max="7"></progress>
						{ship.ratingFirepower}
					</td>
				</tr>
			</tbody>
		</table>
	</article>
{/each}

<style>
	img {
		width: 100%;
		max-width: 700px;
		height: auto;

		&.ship {
			max-width: 300px;
		}
	}
	table {
		display: inline-table;
	}
	th {
		text-align: left;
	}
</style>
