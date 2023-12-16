<script>
  import assetBookCover from "$lib/books/wilsons-notes-vol-2.webp";
  import { guns, getToc } from "$lib/guns";
  import { slugify } from "$lib/util";
  import TOC from "$lib/TOC.svelte";

  const assetsGuns = import.meta.glob("$lib/items/guns-heavy/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getGunImage(filename) {
    // @ts-ignore
    return assetsGuns[`/src/lib/items/${filename}.webp`].default;
  }

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Wilson's Notes Vol. 2";

  export const toc = [
    {
      name: "Description",
      link: "#description",
      children: [],
    },
    ...getToc("Heavy"),
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
      <br />Images of the guns extracted from the game.
    </p>
  </div>
</details>

<h2 id="description">Description</h2>
<article>
  <img
    src={assetBookCover}
    alt="Paper inked with handwritten text reads '{$title}'"
    height="683px"
    width="1024px"
  />
  <h3>A GUIDE TO AIRSHIP ARTILLERY</h3>
  <p>
    This book contains information on Heavy guns. It is a haphazard conglomeration of paper
    scraps glued and sewn together to more or less form pages. The writing is coarse and
    sprawling, wild at times, amongst meticulously sketched Heavy gun diagrams, measurements,
    and firing angles. Many of the pages are singed and smeared with oil stains or black dust
    that smells of gunpowder. Hastily written notes can be read on the back margins of the
    cover page. Most are illegible. However, two stand out, the second being written much
    larger than the first.
  </p>
  <em>
    <p>
      By Gabe's back hairs! Twenty bloomin rockets? Twenty! I ain't seen that much firepower
      since Mum's third wedding. Or was it the fifth? Reminds me. She's been hassling me again
      about grands. I suppose I could teach the little tykes how to help clean the big guns
      where I can't reach so easy. How do you go about attracting a mate? Ma'am, your eyes are
      lovely in the light of the muzzle flash. Done deal! That would do it for me.
    </p>
    <p>That didn't bloody work.</p>
    <p>-Wilson</p>
  </em>
</article>

{#each guns.filter((gun) => gun.type === "Heavy") as gun}
  <h2 id={slugify(gun.name)}>{gun.name}</h2>
  <article>
    <img
      class="gun"
      src={getGunImage(gun.itemIdPath)}
      alt={`The gun ${gun.name}.`}
      height="512"
      width="512"
    />
    <p>{gun.description}</p>
    <table>
      <tr><th colspan="2">Main Properties</th></tr>
      <tr><th>Effective vs:</th><td>{gun.effectiveVs.join(", ")}</td></tr>
      <tr><th>{gun.primaryDamageType}:</th><td>{gun.primaryDamageValue}</td></tr>
      {#if gun.secondaryDamageType}
        <tr><th>{gun.secondaryDamageType}:</th><td>{gun.secondaryDamageValue}</td></tr>
      {/if}
      <tr><th>Rate of Fire:</th><td>{gun.rateOfFire} shots/s</td></tr>
      <tr><th>Reload Time:</th><td>{gun.reloadTime} s</td></tr>
      <tr><th>Magazine Size:</th><td>{gun.magazineSize}</td></tr>
      <tr><th>Projectile Speed:</th><td>{gun.projectileSpeed} m/s</td></tr>
      <tr><th>Range:</th><td>{gun.range} m</td></tr>
    </table>

    {#if Object.keys(gun.opt).length}
      <table>
        <tr><th colspan="2">Additional Properties</th></tr>
        {#if gun.opt.additionalShellDrop}
          <tr>
            <th>Additional Shell Drop:</th>
            <td>{gun.opt.additionalShellDrop} m/s<sup>2</sup></td>
          </tr>
        {/if}
        {#if gun.opt.aoeRadius}
          <tr><th>AoE Radius:</th><td>{gun.opt.aoeRadius.join("-")} m</td></tr>
        {/if}
        {#if gun.opt.buckshots}
          <tr><th>Buckshots:</th><td>{gun.opt.buckshots}</td></tr>
        {/if}
        {#if gun.opt.fireChance && gun.opt.fireChanceStacks}
          <tr>
            <th>Fire Ignition:</th>
            <td>
              {gun.opt.fireChance}% chance of {gun.opt.fireChanceStacks.join("-")} fire stacks
            </td>
          </tr>
        {/if}
        {#if gun.opt.flareDuration && gun.opt.flareIllumination}
          <tr><th>Flare Duration:</th><td>{gun.opt.flareDuration} s</td></tr>
          <tr><th>Flare Illumination:</th><td>{gun.opt.flareIllumination} lux</td></tr>
        {/if}
        {#if gun.opt.knockback}
          <tr><th>Knockback:</th><td>{gun.opt.knockback} kN*s</td></tr>
        {/if}
        {#if gun.opt.mineImpulse}
          <tr><th>Mine Impulse:</th><td>{gun.opt.mineImpulse} kN*s</td></tr>
        {/if}
        {#if gun.opt.pullDuration && gun.opt.pullStrength}
          <tr><th>Pull Duration:</th><td>{gun.opt.pullDuration}s</td></tr>
          <tr><th>Pull Strength:</th><td>{gun.opt.pullStrength} kN*s</td></tr>
        {/if}
      </table>
    {/if}
    <table>
      <tr>
        <th colspan="3">Movement and Arcs</th>
      </tr>
      <tr>
        <th>Left/Right:</th>
        <td>{gun.angles[0]}&deg;</td>
        <td>{gun.angles[1]}&deg;</td>
      </tr>
      <tr>
        <th>Up/Down:</th>
        <td>{gun.angles[2]}&deg;</td>
        <td>{gun.angles[3]}&deg;</td>
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

    &.gun {
      max-width: 300px;
    }
  }
  table {
    display: inline-table;

    & tr:first-child > th {
      border-bottom: 1px solid var(--color-heading);
    }

    & th {
      text-align: left;
    }
  }
</style>
