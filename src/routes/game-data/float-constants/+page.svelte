<script lang="ts">
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>{page.data.title}</h1>

<p>All constants that are floating.</p>

{#if data.floatConstants.length > 0}
	<table class="inline-table">
		<thead>
			<tr>
				<th>Key</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{#each data.floatConstants as float}
				<tr>
					<td>{float.key}</td>
					<td class="text-right">{float.value.toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
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
