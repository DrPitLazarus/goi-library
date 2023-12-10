<script>
  import assetBookCover from "$lib/books/wilsons-notes-vol-2.webp";

  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Wilson's Notes Vol. 2";
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
