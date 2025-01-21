<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	data.title.set('Skills');
	let title = data.title;
</script>

<h1>{$title}</h1>

<p class="mt-4">All skills.</p>
{#if data.skillConfig.length > 0}
	<table>
		{#each data.skillConfig as skill}
			<tr>
				<th>{skill.nameEn.length === 0 ? skill.name : skill.nameEn}</th>
			</tr>
			<tr>
				<td>{skill.descriptionEn.length === 0 ? 'No description.' : skill.descriptionEn}</td>
			</tr>
			<tr>
				<td>
					<table>
						<tr><td>Context</td>{skill.context}</tr>
						<tr><td>Range</td>{skill.range}</tr>
						<tr><td>Type</td>{skill.type}</tr>
						<tr><td>Public</td>{skill.public}</tr>
						<tr><td>DefaultUnlocked</td><td>{skill.defaultUnlocked}</td></tr>
						<tr><td>CoopOnly</td><td>{skill.coopOnly}</td></tr>
					</table>
				</td>
			</tr>
			{@const effects = data.effects.filter(
				(value) => value.activationId === skill.activationId && value.unlockLevel === 0
			)}
			{#if effects.length > 0}
				<tr>
					<td>
						<table>
							<tr>
								<th>Effect</th>
								<th>Duration</th>
								<th>Strength</th>
							</tr>
							{#each effects as effect}
								<tr>
									<td>{effect.type}</td>
									<td>{effect.duration}</td>
									<td>{effect.strength.toFixed(2)}</td>
								</tr>
							{/each}
						</table>
					</td>
				</tr>
			{/if}
			{@const specialAbility = data.specialAbilities.find(
				(value) => value.activationId == skill.activationId
			)}
			{#if specialAbility}
				{@const params = data.specialAbilitiesParams.filter(
					(value) => value.specialAbilityId === specialAbility.id
				)}
				<tr>
					<td>
						<table>
							<tr><td>Duration</td><td>{specialAbility.duration}</td></tr>
							<tr>
								<td>Cooldown Time</td><td>{specialAbility.cooldownTime}</td>
							</tr>
							<tr><td>Shipwide Display</td><td>{specialAbility.shipwideDisplay}</td></tr>
							<tr><th>Param</th><th>Value</th></tr>
							{#each params as param}
								<tr><td>{param.key}</td><td>{param.value}</td></tr>
							{/each}
						</table>
					</td>
				</tr>
			{/if}
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
