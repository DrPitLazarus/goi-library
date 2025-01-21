<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	data.title.set('Difficulty Levels');
	let title = data.title;
</script>

<h1>{$title}</h1>

<p class="mt-4">All difficulty levels for PvE.</p>

{#if data.difficultyLevels.length > 0}
	<table>
		<!-- <tr>
			<th>Name</th>
			<th>World Score Modifier</th>
			<th>Enemy Budget Scale</th>
			<th>Level Range</th>
		</tr> -->
		{#each data.difficultyLevels as level}
			<tr>
				<th colspan="2">{level.name}</th>
			</tr>
			<tr>
				<td>World Score Modifier</td>
				<td class="text-right-align">{level.worldScoreModifier.toFixed(2)}</td>
			</tr>
			<tr>
				<td>Enemy Budget Scale</td>
				<td class="text-right-align">{level.enemyBudgetScale}</td>
			</tr>
			<tr>
				<td>Level Range</td>
				<td class="text-right-align">{level.levelLowerBound}-{level.levelUpperBound}</td>
			</tr>
			<tr>
				<td colspan="4">
					<table>
						<tr>
							<th>Team</th>
							<th>AffectsUnits</th>
							<th>Effect</th>
							<th>Strength</th>
						</tr>
						{#each data.difficultyLevelsModifiers.filter((value) => value.difficultyLevelId === level.id) as modifier}
							<tr>
								<td>{modifier.team}</td>
								<td>{modifier.affectsUnits}</td>
								<td>{modifier.effect}</td>
								<td class="text-right-align">{modifier.strength.toFixed(2)}</td>
							</tr>
						{/each}
					</table>
				</td>
			</tr>
		{/each}
	</table>
{/if}

<style>
	table {
		display: inline-table;

		& th {
			text-align: left;
			border-bottom: 1px solid var(--color-heading);
		}
	}
</style>
