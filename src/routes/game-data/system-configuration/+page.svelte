<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	data.title.set('System Configuration');
	let title = data.title;
</script>

<h1>{$title}</h1>

<p class="mt-4">All key, value pairs for the system, I suppose.</p>

{#if data.systemConfiguration.length > 0}
	<table>
		<tr>
			<th>Key</th>
			<th>Value</th>
		</tr>
		{#each data.systemConfiguration as config}
			<tr>
				<td>{config.key}</td>
				<td>{config.value}</td>
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
