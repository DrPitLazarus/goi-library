<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Titles";
  export let { titles, titlesClass } = data;
  export let pilotTitles = titlesClass.filter((item) => item.class === "Pilot");
  export let gunnerTitles = titlesClass.filter((item) => item.class === "Gunner");
  export let engineerTitles = titlesClass.filter((item) => item.class === "Engineer");
</script>

<h1>{$title}</h1>

<p>
  Titles sorted by ID. There are {titles.length + titlesClass.length} titles, {titlesClass.length}
  are from classes and {titles.length} are from achievements.
  <br />
  <i>2024-01-18. Data source: cachedRepository.json.</i>
</p>

<h2>Class Titles</h2>
<p>These are earned by leveling specific classes. Each class has 15 titles.</p>

<h3>Pilot</h3>
<table>
  {#each pilotTitles as item}
    <tr>
      <th>
        <span>{item.title}</span>
      </th>
    </tr>
  {/each}
</table>

<h3>Gunner</h3>
<table>
  {#each gunnerTitles as item}
    <tr>
      <th>
        <span>{item.title}</span>
      </th>
    </tr>
  {/each}
</table>

<h3>Engineer</h3>
<table>
  {#each engineerTitles as item}
    <tr>
      <th>
        <span>{item.title}</span>
      </th>
    </tr>
  {/each}
</table>

<h2>Achievement Titles</h2>

<table>
  {#each titles as item}
    <tr>
      <th>
        <span>{item.titleTextEn}</span>
      </th>
      {#if item.titleTextEn !== item.name && item.name.length}
        <td>
          <span>{item.name}</span>
        </td>
      {/if}
    </tr>
  {/each}
</table>

<style>
  table {
    & th {
      text-align: left;
    }
  }
</style>
