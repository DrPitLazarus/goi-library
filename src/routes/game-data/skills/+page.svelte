<script lang="ts">
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>{page.data.title}</h1>

<p>All skills.</p>
{#if data.skillConfig.length > 0}
	{#each data.skillConfig as skill}
		{@const effects = data.effects.filter(
			(value) => value.activationId === skill.activationId && value.unlockLevel === 0,
		)}
		{@const specialAbility = data.specialAbilities.find(
			(value) => value.activationId == skill.activationId,
		)}
		<div class="mb-4">
			<table class="w-full">
				<thead>
					<tr>
						<th><h3>{skill.nameEn.length === 0 ? skill.name : skill.nameEn}</h3></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{skill.descriptionEn.length === 0 ? 'No description.' : skill.descriptionEn}</td>
					</tr>
				</tbody>
			</table>
			<table class="inline-table">
				<thead>
					<tr><th>Property</th><th>Value</th></tr>
				</thead>
				<tbody>
					<tr><td>Context</td><td>{skill.context}</td></tr>
					<tr><td>Range</td><td>{skill.range}</td></tr>
					<tr><td>Type</td><td>{skill.type}</td></tr>
					<tr><td>Public</td><td>{skill.public}</td></tr>
					<tr><td>DefaultUnlocked</td><td>{skill.defaultUnlocked}</td></tr>
					<tr><td>CoopOnly</td><td>{skill.coopOnly}</td></tr>
				</tbody>
			</table>

			{#if effects.length > 0}
				<table class="inline-table">
					<thead>
						<tr>
							<th>Effect</th>
							<th>Duration</th>
							<th>Strength</th>
						</tr>
					</thead>
					<tbody>
						{#each effects as effect}
							<tr>
								<td>{effect.type}</td>
								<td class="text-right">{effect.duration}</td>
								<td class="text-right">{effect.strength.toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}

			{#if specialAbility}
				{@const params = data.specialAbilitiesParams.filter(
					(value) => value.specialAbilityId === specialAbility.id,
				)}
				<table class="inline-table">
					<thead>
						<tr><th>Special Ability</th><th>Value</th></tr>
					</thead>
					<tbody>
						<tr><td>Duration</td><td class="text-right">{specialAbility.duration}</td></tr>
						<tr>
							<td>Cooldown Time</td><td class="text-right">{specialAbility.cooldownTime}</td>
						</tr>
						<tr><td>Shipwide Display</td><td>{specialAbility.shipwideDisplay}</td></tr>
					</tbody>
				</table>
				<table class="inline-table">
					<thead>
						<tr><th>Param</th><th>Value</th></tr>
					</thead>
					<tbody>
						{#each params as param}
							<tr>
								<td>{param.key}</td>
								<td class="text-right">{parseFloat(param.value).toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
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
