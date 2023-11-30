<script>
  import "../styles.css";

  /** @type {import('./$types').LayoutData} */
  export let data;
  export let title = data.title;
</script>

<svelte:head>
  <title>{$title + data.TITLE_SUFFIX}</title>
</svelte:head>

<a href="/">Guns of Icarus Library</a>

<slot />
