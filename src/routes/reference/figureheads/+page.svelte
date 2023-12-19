<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Figureheads";
  export let figureheads = data.figureheads;

  const assets = import.meta.glob("$lib/items/figureheads/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/figureheads/item${filename}.webp`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Figureheads sorted by ID. There are {figureheads.length} figureheads.
  <br />
  <i>2023-12-19. Data source: cachedRepository.json.</i>
</p>

<table>
  {#each figureheads as figurehead}
    <tr>
      <td>
        <img src={getImage(figurehead.id.toString())} alt="Figurehead." height="256" width="256" />
      </td>
      <td>
        <h2>{figurehead.name}</h2>
        <p>{figurehead.descriptionTextEn}</p>
      </td>
    </tr>
  {/each}
</table>

<style>
  table img {
    height: 175px;
    width: 175px;
  }
</style>
