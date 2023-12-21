<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Badges";
  export let badges = data.badges;

  const assets = import.meta.glob("$lib/items/badges/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/badges/item${filename}.webp`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Badges sorted by ID. There are {badges.length} badges.
  <br />
  <i>
    2023-12-20. Data source: cachedRepository.json. Missing images for "Japanese Tournament",
    "Second Anniversary", and all BFA.
  </i>
</p>

<table>
  {#each badges as badge}
    <tr>
      <td>
        <img src={getImage(badge.id.toString())} alt="Badge." height="256" width="256" />
      </td>
      <td>
        <h2>{badge.nameTextEn || badge.name}</h2>
        <p>
          {badge.descriptionTextEn}
          {#if badge.nameTextEn !== badge.name && badge.nameTextEn.length}({badge.name}){/if}
        </p>
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
