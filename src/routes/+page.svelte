<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Home";
</script>

<h1>{$title}</h1>
<ul>
  <li><a href="books">Books</a></li>
</ul>
<h2>Reference</h2>
<ul>
  <li><a href="reference/decals">Decals</a></li>
  <li><a href="reference/figureheads">Figureheads</a></li>
</ul>
