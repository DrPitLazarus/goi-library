<script>
  import assetBookCover from "$lib/books/evadnes-ship-reports.png";

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Evadne's Ship Reports";
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
