<script lang="ts">
	import { page } from '$app/state';

	type Equipment = {
		nameTextEn: string;
		descriptionTextEn: string;
		id: number;
		type: string;
	};

	let equipment: Equipment[] = page.data.equipment;
	let sortById = (a: { id: number }, b: { id: number }) => a.id - b.id;

	let pilot = equipment.filter((item) => item.type === 'Helm').sort(sortById);
	let gunner = equipment.filter((item) => item.type === 'Gun').sort(sortById);
	let engineer = equipment.filter((item) => item.type === 'Repair').sort(sortById);
	let specialPilot = equipment.filter((item) => item.type === 'SpecialPilot').sort(sortById);
	let specialGunner = equipment.filter((item) => item.type === 'SpecialGunner').sort(sortById);
	let specialEngineer = equipment.filter((item) => item.type === 'SpecialEngineer').sort(sortById);
	let equipmentCount = [
		...pilot,
		...gunner,
		...engineer,
		...specialPilot,
		...specialGunner,
		...specialEngineer,
	].length;

	const assets = import.meta.glob('$lib/assets/items/equipment/*.png', { eager: true });

	function getImage(filename: string) {
		return (assets[`/src/lib/assets/items/equipment/skill${filename}.png`] as { default: string })
			?.default;
	}
</script>

<h1>{page.data.title}</h1>

<p>
	Equipment sorted by ID. There are {equipmentCount} equipment.
	<br />
	<i>
		2023-12-22. Data source: cachedRepository.json. "Heroic Stamina Ability" is not in the game.
	</i>
</p>

<h2>Pilot</h2>

<table>
	{#each pilot as item}
		<tbody>
			<tr>
				<td>
					<img
						src={getImage(item.id.toString())}
						alt="Equipment."
						height="256"
						width="256"
						loading="lazy"
					/>
				</td>
				<td>
					<h3 class="mt-0">{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<h2>Pilot Specials (PvE)</h2>

<table>
	{#each specialPilot as item}
		<tbody>
			<tr>
				<td>
					<img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
				</td>
				<td>
					<h3>{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<h2>Gunner</h2>

<table>
	{#each gunner as item}
		<tbody>
			<tr>
				<td>
					<img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
				</td>
				<td>
					<h3>{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<h2>Gunner Specials (PvE)</h2>

<table>
	{#each specialGunner as item}
		<tbody>
			<tr>
				<td>
					<img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
				</td>
				<td>
					<h3>{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<h2>Engineer</h2>

<table>
	{#each engineer as item}
		<tbody>
			<tr>
				<td>
					<img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
				</td>
				<td>
					<h3>{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<h2>Enginner Specials (PvE)</h2>

<table>
	{#each specialEngineer as item}
		<tbody>
			<tr>
				<td>
					<img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
				</td>
				<td>
					<h3>{item.nameTextEn}</h3>
					<p>
						{item.descriptionTextEn}
					</p>
				</td>
			</tr>
		</tbody>
	{/each}
</table>

<!-- <table>
  {#each equipment as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h2>{item.nameTextEn}</h2>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table> -->

<style>
	table {
		& img {
			/* height: 128px; */
			min-width: 128px;
			width: 128px;
		}
	}
</style>
