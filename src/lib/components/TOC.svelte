<script lang="ts">
	let props = $props();
</script>

<details class="dashed">
	<summary>Table of Contents</summary>
	<div>
		<ol class="m-4 list-decimal">
			{#each props.toc as link}
				<li>
					<a href={link.link}>{link.name}</a>
					{#if link.children}
						<ol>
							{#each link.children as link2}
								<li><a href={link2.link}>{link2.name}</a></li>
							{/each}
						</ol>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</details>
