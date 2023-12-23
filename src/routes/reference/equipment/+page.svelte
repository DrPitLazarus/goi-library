<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Equipment";
  export let equipment = data.equipment;
  export let pilot = equipment
    .filter((item) => item.type === "Helm")
    .toSorted((a, b) => a.id - b.id);
  export let gunner = equipment
    .filter((item) => item.type === "Gun")
    .toSorted((a, b) => a.id - b.id);
  export let engineer = equipment
    .filter((item) => item.type === "Repair")
    .toSorted((a, b) => a.id - b.id);

  const assets = import.meta.glob("$lib/items/equipment/*.png", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/equipment/skill${filename}.png`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Equipment sorted by ID. There are {equipment.length} equipment.
  <br />
  <i> 2023-12-22. Data source: cachedRepository.json. </i>
</p>

<h2>Pilot</h2>

<table>
  {#each pilot as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h2>{item.nameTextEn}</h2>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<h2>Gunner</h2>

<table>
  {#each gunner as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h2>{item.nameTextEn}</h2>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<h2>Engineer</h2>

<table>
  {#each engineer as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h2>{item.nameTextEn}</h2>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<!-- <table>
  {#each equipment as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h2>{item.nameTextEn}</h2>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table> -->

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
