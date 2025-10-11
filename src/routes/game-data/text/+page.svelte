<script lang="ts">
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>{page.data.title}</h1>

<p class="mt-4">All text strings.</p>

{#if data.text.length > 0}
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Key</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{#each data.text as text}
				<tr>
					<td>{text.id}</td>
					<td>{text.key}</td>
					<td>{text.en}</td>
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
