<script>
  import assetBookCover from "$lib/books/lusses-travels.png";
  import { maps, getToc } from "$lib/maps";
  import { slugify } from "$lib/util";
  import TOC from "$lib/TOC.svelte";

  const assetsMaps = import.meta.glob("$lib/maps/*.{png,webp}", { eager: true });
  /**
   * @param {string} filename
   */
  function getMapImage(filename) {
    // @ts-ignore
    return assetsMaps[`/src/lib/maps/${filename}`].default;
  }

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Lusse's Travels";

  export const toc = [
    {
      name: "Description",
      link: "#description",
      children: [],
    },
    ...getToc(),
  ];
</script>

<h1>{$title}</h1>

<TOC {toc}></TOC>

<details>
  <summary>Data Source and Editor Notes</summary>
  <div>
    <p>
      Date Accessed: 2023-11-23<br />
      Obtained from the game via screenshots. Text copied with Windows' Snipping Tool OCR feature.
    </p>
  </div>
</details>

<h2 id="description">Description</h2>
<article>
  <img
    src={assetBookCover}
    alt="Green book cover with gold text reads '{$title}'"
    height="683px"
    width="1024px"
  />
  <h3>MAPS FOR THE WORLD ADVENTURER</h3>
  <p>
    The cover of this book is adorned with lavish, well-worn gold leaf lettering. The print
    inside is elegant and flowing, accompanied by exquisitely detailed maps and landscape art.
    The preface on the first page is flowery and grandiose.
  </p>
  <em>
    <p>
      When one wishes to discover the intricacies of cultures and lands unexplored, one wants
      for an expert in navigating any situation with elegance and poise. One shall need a well
      traveled connoisseur of the unfamiliar, brimming with experience among the dangers of
      each land. Without the sage advice of such a pathfinder, one would be lost to the winds
      and wilds in quite short order. In reading this book, good adventurer, you will find the
      pioneer of cartography you need to guide your adventures. From the desert mountains of
      the far west to the emerald islands of the far east, or the dangers of the icy north to
      the opulent mansions hovering high over the toxic lands of the south, let this book be
      your companion through the deadly wonders of each land.
    </p>
    <p>
      My name is Lusse. I have journeyed far and wide to gather the fascinating information you
      will find bound within these pages. No finer publication will be found, mark my words.
      Avoid the humdrum ways of sedentary life, and take to the skies! I will be certain to see
      you there.
    </p>
    <p>-Lusse</p>
  </em>
</article>

{#each maps as area}
  <h2 id={slugify(area.areaTitle)}>{area.areaTitle}</h2>
  <article>
    {#each area.text as text}
      <p>{text}</p>
    {/each}
    {#each area.maps as map}
      <h3 id={slugify(map.mapTitle)}>{map.mapTitle}</h3>
      <span
        >Gamemode: {map.gamemode}<br />
        Ships: {map.ships} <br />
        Difficulty: {map.difficulty}<br />
        {#if map.text}
          <p>{map.text}</p>
        {/if}
      </span>
      <img src={getMapImage(map.mapImage)} alt="" height="700px" width="700px" />
    {/each}
  </article>
{/each}

<style>
  h3 {
    margin-bottom: 0;
  }
  img {
    width: 100%;
    max-width: 700px;
    height: auto;
  }
  details {
    & ol,
    ul {
      padding-left: 0;
    }
    & li > ol {
      padding-left: 16px;
    }
    & div {
      border: 1px dashed;
      padding-left: 40px;
      padding-right: 40px;
    }
  }
</style>
