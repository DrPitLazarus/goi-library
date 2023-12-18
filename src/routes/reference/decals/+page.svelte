<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Decals";
  export let decals = data.decals;

  const assets = import.meta.glob("$lib/items/decals/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/decals/item${filename}.webp`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Decals sorted by ID. There are {decals.length} decals,
  {decals.filter((decal) => decal.workshop).length} are from the
  <a
    target="_blank"
    href="https://steamcommunity.com/workshop/browse/?appid=209080&browsesort=accepted&requiredtags%5B%5D=Decals"
    >Steam Workshop</a
  >.
  <br /><i
    >2023-12-18. Data source: cachedRepository.json. The last 3 decals don't seem to have
    images.</i
  >
</p>

<table>
  {#each decals as decal}
    <tr>
      <td>
        <img src={getImage(decal.id.toString())} alt="Decal." height="256" width="256" />
      </td>
      <td>
        <h2>{decal.name}</h2>
        <p>{@html decal.descriptionTextEn}</p>
      </td>
    </tr>
  {/each}
</table>

<style>
  table img {
    height: 128px;
    width: 128px;
  }
</style>
