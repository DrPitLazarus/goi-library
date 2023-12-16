<script>
  import assetBookCover from "$lib/books/wilsons-notes-vol-1.webp";
  import { guns, getToc } from "$lib/guns";
  import { slugify } from "$lib/util";
  import TOC from "$lib/TOC.svelte";

  const assetsGuns = import.meta.glob("$lib/items/guns-light/*.webp", { eager: true });
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
  $title = "Wilson's Notes Vol. 1";

  export const toc = [
    {
      name: "Description",
      link: "#description",
      children: [],
    },
    ...getToc("Light"),
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
    This book contains information on Light guns. It is a haphazard conglomeration of paper
    scraps glued and sewn together to more or less form pages. The writing is coarse and
    sprawling, wild at times, amongst meticulously sketched light gun diagrams, measurements,
    and firing angles. Many of the pages are singed and smeared with oil stains or black dust
    that smells of gunpowder. Hastily written notes can be read on the back margins of the
    cover page.
  </p>
  <em>
    <p>What a beaut! Sweet mother of Gabe, can't wait to get to get her mounted.</p>
    <p>
      Bloody hell that was more than expected. Need to replace supplies. Blastyard: 2x
      Lochnagar order 10x mine casing 1x Phobos. Bandages and splint. Write Mum to delay visit
      until wall is replaced. Replace wall. Move cannons outside before loadin. Maybe don't
      replace wall yet.
    </p>
    <p>
      Sleepin just ain't happening. Leg aching again. The metal one don't hurt at all. Shoulda
      shot em both off. Could do with both eyes and ears though. Hard to gauge range.
    </p>
    <p>
      For posterity, Mum thinks it would be a bloomin great idea to write about myself. Who
      would want to know about a one-legged man missing an eye, ear, and a few fingers when you
      got all these cannons to read about? No one. That's who. Men are dull mouthholes of idle
      chat. Big roarin guns! The smell of hot iron and burnt powder! That's what stirs the ol'
      belly. I ain't writing no fluff travel book here.
    </p>
    <p>-Wilson</p>
  </em>
</article>

{#each guns.filter((gun) => gun.type === "Light") as gun}
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
