<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	let title = data.title;
	$title = $page.status.toString();
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>
