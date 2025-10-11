<script lang="ts">
	import { page } from '$app/state';
	import { appName } from '$lib/shared';
</script>

<svelte:head>
	<title>ERROR - {appName}</title>
</svelte:head>

<h1>{page.status}</h1>
<p>{page.error?.message}</p>
