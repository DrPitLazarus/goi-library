<script lang="ts">
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>{page.data.title}</h1>

<p class="mt-4">All key value pairs for the system, I suppose.</p>

{#if data.systemConfiguration.length > 0}
	<table>
		<thead>
			<tr>
				<th>Key</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{#each data.systemConfiguration as config}
				<tr>
					<td>{config.key}</td>
					<td>{config.value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	@reference 'tailwindcss';

	table {
		& th {
			text-align: left;
			border-bottom: 1px solid var(--color-goiyellow-header);
		}
	}
</style>
