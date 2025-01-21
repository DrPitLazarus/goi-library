<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	data.title.set('Float Constants');
	let title = data.title;
</script>

<h1>{$title}</h1>

<p class="mt-4">All constants that are floating.</p>

{#if data.floatConstants.length > 0}
	<table>
		<tr>
			<th>Key</th>
			<th>Value</th>
		</tr>
		{#each data.floatConstants as float}
			<tr>
				<td>{float.key}</td>
				<td class="text-right-align">{float.value.toFixed(2)}</td>
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
