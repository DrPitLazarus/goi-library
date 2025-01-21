<script lang="ts">
	import type { PageData } from './$types';
	import '../app.css';
	import '../styles.css';
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/';

	export let data: PageData;
	export let title = data.title;
	$: fullTitle = `${$title} - ${data.APP_NAME}`;
	$: breadcrumbs = $page.data.breadcrumbs;
</script>

<svelte:head>
	<title>{fullTitle}</title>
</svelte:head>

<Breadcrumb.Root>
	<Breadcrumb.List class="mt-2">
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">{data.APP_NAME}</Breadcrumb.Link>
		</Breadcrumb.Item>
		{#each breadcrumbs as breadcrumb}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="{breadcrumb.href}">{breadcrumb.name}</Breadcrumb.Link>
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

<slot />
