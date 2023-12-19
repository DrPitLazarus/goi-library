<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Themes";
  export let themes = data.themes;

  const assets = import.meta.glob("$lib/items/themes/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/themes/item${filename}.webp`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Themes sorted by ID. There are {themes.length} themes.
  <br />
  <i>2023-12-19. Data source: cachedRepository.json.</i>
</p>

<table>
  {#each themes as theme}
    <tr>
      <td>
        <img src={getImage(theme.id.toString())} alt="Theme." height="256" width="256" />
      </td>
      <td>
        <h2>{theme.name}</h2>
        <p>{@html theme.descriptionTextEn}</p>
      </td>
    </tr>
  {/each}
</table>

<style>
  table {
    & img {
      height: 175px;
      width: 175px;
    }
    & h2 {
      margin-top: 0;
    }
  }
</style>
