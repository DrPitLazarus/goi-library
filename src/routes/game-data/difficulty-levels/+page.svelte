<script lang="ts">
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>{page.data.title}</h1>

<p>All difficulty levels for PvE.</p>

{#if data.difficultyLevels.length > 0}
	{#each data.difficultyLevels as level}
		<div class="mb-4">
			<table class="inline-table">
				<thead>
					<tr>
						<th colspan="2"><h3>{level.name}</h3></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>World Score Modifier</td>
						<td class="text-right">{level.worldScoreModifier.toFixed(2)}</td>
					</tr>
					<tr>
						<td>Enemy Budget Scale</td>
						<td class="text-right">{level.enemyBudgetScale}</td>
					</tr>
					<tr>
						<td>Level Range</td>
						<td class="text-right">{level.levelLowerBound}-{level.levelUpperBound}</td>
					</tr>
				</tbody>
			</table>
			<table class="inline-table">
				<thead>
					<tr>
						<th>Team</th>
						<th>AffectsUnits</th>
						<th>Effect</th>
						<th>Strength</th>
					</tr>
				</thead>
				<tbody>
					{#each data.difficultyLevelsModifiers.filter((value) => value.difficultyLevelId === level.id) as modifier}
						<tr>
							<td>{modifier.team}</td>
							<td>{modifier.affectsUnits}</td>
							<td>{modifier.effect}</td>
							<td class="text-right">{modifier.strength.toFixed(2)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}
{/if}

<style>
	@reference 'tailwindcss';
	table {
		& thead th {
			text-align: left;
			border-bottom: 1px solid var(--color-goiyellow-header);
		}
	}
</style>
