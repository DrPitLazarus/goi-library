<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { appName } from '$lib/shared';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';

	let { children } = $props();
	let fullTitle = $derived(page.data?.title ? `${page.data.title} - ${appName}` : appName);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Breadcrumb.Root>
	<Breadcrumb.List class="mt-4">
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">{appName}</Breadcrumb.Link>
		</Breadcrumb.Item>
		{#each page.data.breadcrumbs as breadcrumb}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href={breadcrumb.href}>{breadcrumb.name}</Breadcrumb.Link>
			</Breadcrumb.Item>
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

{@render children?.()}
