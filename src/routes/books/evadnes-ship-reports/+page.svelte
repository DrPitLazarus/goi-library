<script>
  import assetBookCover from "$lib/books/evadnes-ship-reports.png";
  import { ships, getToc } from "$lib/ships";
  import { slugify } from "$lib/util";
  import TOC from "$lib/TOC.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Evadne's Ship Reports";

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

<details class="dashed">
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
    alt="Red book cover with white rectangle reads '{$title}'"
    height="683px"
    width="1024px"
  />
  <h3>A GUIDE TO THE SKY'S AIRSHIPS</h3>
  <p>
    The contents of this book match the cover; Simple, neat, and orderly. Ship diagrams play
    counterpoint to rows of numbers or diagrams describing various aspects of each ship. The
    evenness of the text indicates that it is the result of machine printed typesetting rather
    than handwritten. The preface is short and concise.
  </p>
  <p>
    <em>
      Contained within these pages you will find a report on each of the ships I have recently
      studied. The information will be of value to anyone needing to purchase a ship, or repair
      a currently owned ship. If any errors are discovered in my calculations or measurements,
      do not hesitate to contact me at my press and shipyard in Anvala.
    </em>
  </p>
  <p>
    <em> Fair weather and safe travels, friend. </em>
  </p>
  <p><em>-Evadne</em></p>
</article>

{#each ships as ship}
  <h2 id={slugify(ship.name)}>{ship.name}</h2>
  <article>
    <p>Difficulty: {ship.difficulty}</p>
    <p>{ship.description}</p>
    <table>
      <tr><th>Longitudinal Speed</th><td>{ship.longitudinalSpeed} m/s</td></tr>
      <tr><th>Longitudinal Accel.</th><td>{ship.longitudinalAccel} m/s<sup>2</sup></td></tr>
      <tr><th>Turn Speed</th><td>{ship.turnSpeed} deg/s</td></tr>
      <tr><th>Turn Accel.</th><td>{ship.turnAccel} deg/s<sup>2</sup></td></tr>
      <tr><th>Mass</th><td>{ship.mass} tonnes</td></tr>
      <tr><th>Vertical Speed</th><td>{ship.verticalSpeed} m/s</td></tr>
      <tr><th>Vertical Accel.</th><td>{ship.verticalAccel} m/s<sup>2</sup></td></tr>
    </table>
    <table>
      <tr>
        <th>Speed</th>
        <td><progress value={ship.ratingSpeed} max="47"></progress> {ship.ratingSpeed}</td>
      </tr>
      <tr>
        <th>Maneuverability</th>
        <td>
          <progress value={ship.ratingManeuverability} max="0.4"></progress>
          {ship.ratingManeuverability}
        </td>
      </tr>
      <tr>
        <th>Durability</th>
        <td>
          <progress value={ship.ratingDurability} max="1750"></progress>
          {ship.ratingDurability}
        </td>
      </tr>
      <tr>
        <th>Armor</th>
        <td>
          <progress value={ship.ratingArmor} max="820"></progress>
          {ship.ratingArmor}
        </td>
      </tr>
      <tr>
        <th>Firepower</th>
        <td>
          <progress value={ship.ratingFirepower} max="7"></progress>
          {ship.ratingFirepower}
        </td>
      </tr>
    </table>
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
  table {
    display: inline-table;
  }
  th {
    text-align: left;
  }
</style>
