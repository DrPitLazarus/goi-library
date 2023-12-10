<script>
  import assetBookCover from "$lib/books/wilsons-notes-vol-1.webp";

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Wilson's Notes Vol. 1";
</script>

<h1>{$title}</h1>

<details class="dashed">
  <summary>Table of Contents</summary>
  <div>
    <ol>
      <li><a href="#description">Description</a></li>
    </ol>
  </div>
</details>
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

<style>
  h3 {
    margin-bottom: 0;
  }
  img {
    width: 100%;
    max-width: 700px;
    height: auto;
  }
</style>
