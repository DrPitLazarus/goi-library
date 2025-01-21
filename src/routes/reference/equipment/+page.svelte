<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Equipment";
  export let equipment = data.equipment;
  let sortById = (/** @type {{ id: number; }} */ a, /** @type {{ id: number; }} */ b) =>
    a.id - b.id;
  export let pilot = equipment.filter((item) => item.type === "Helm").sort(sortById);
  export let gunner = equipment.filter((item) => item.type === "Gun").sort(sortById);
  export let engineer = equipment.filter((item) => item.type === "Repair").sort(sortById);
  export let specialPilot = equipment
    .filter((item) => item.type === "SpecialPilot")
    .sort(sortById);
  export let specialGunner = equipment
    .filter((item) => item.type === "SpecialGunner")
    .sort(sortById);
  export let specialEngineer = equipment
    .filter((item) => item.type === "SpecialEngineer")
    .sort(sortById);
  export let equipmentCount = [
    ...pilot,
    ...gunner,
    ...engineer,
    ...specialPilot,
    ...specialGunner,
    ...specialEngineer,
  ].length;
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
  Equipment sorted by ID. There are {equipmentCount} equipment.
  <br />
  <i>
    2023-12-22. Data source: cachedRepository.json. "Heroic Stamina Ability" is not in the
    game.
  </i>
</p>

<h2>Pilot</h2>

<table>
  {#each pilot as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" loading="lazy" />
      </td>
      <td>
        <h3 class="mt-0">{item.nameTextEn}</h3>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<h2>Pilot Specials (PvE)</h2>

<table>
  {#each specialPilot as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h3>{item.nameTextEn}</h3>
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
        <h3>{item.nameTextEn}</h3>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<h2>Gunner Specials (PvE)</h2>

<table>
  {#each specialGunner as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h3>{item.nameTextEn}</h3>
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
        <h3>{item.nameTextEn}</h3>
        <p>
          {item.descriptionTextEn}
        </p>
      </td>
    </tr>
  {/each}
</table>

<h2>Enginner Specials (PvE)</h2>

<table>
  {#each specialEngineer as item}
    <tr>
      <td>
        <img src={getImage(item.id.toString())} alt="Equipment." height="256" width="256" />
      </td>
      <td>
        <h3>{item.nameTextEn}</h3>
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
      /* height: 128px; */
      min-width: 128px;
      width: 128px;
    }
    & h2 {
      margin-top: 0;
    }
  }
</style>
