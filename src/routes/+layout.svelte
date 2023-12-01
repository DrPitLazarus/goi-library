<script>
  import "../styles.css";
  import { page } from "$app/stores";

  /** @type {import('./$types').LayoutData} */
  export let data;
  export let title = data.title;
  $: fullTitle = `${$title} - ${data.APP_NAME}`;
  // TODO: real breadcrumbs
  $: showBreadcrumbs = $page.url.pathname.startsWith("/books/");
</script>

<svelte:head>
  <title>{fullTitle}</title>
</svelte:head>

<a href="/">{data.APP_NAME}</a>
{#if showBreadcrumbs}
  / <a href="/books">Books</a>
{/if}
<slot />
