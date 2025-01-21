<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	data.title.set('Text');
	let title = data.title;
</script>

<h1>{$title}</h1>

<p class="mt-4">All text strings.</p>

{#if data.text.length > 0}
	<table>
		<tr>
			<th>ID</th>
			<th>Key</th>
			<th>Value</th>
		</tr>
		{#each data.text as text}
			<tr>
				<td>{text.id}</td>
				<td>{text.key}</td>
				<td>{text.en}</td>
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
