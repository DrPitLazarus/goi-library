<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let title = data.title;
  $title = "Profile Pictures";
  export let profilePictures = data.profilePictures;

  const assets = import.meta.glob("$lib/items/profile-pictures/*.webp", { eager: true });
  /**
   * @param {string} filename
   */
  function getImage(filename) {
    // @ts-ignore
    return assets[`/src/lib/items/profile-pictures/item${filename}.webp`]?.default || "";
  }
</script>

<h1>{$title}</h1>

<p>
  Profile pictures sorted by ID. There are {profilePictures.length} profile pictures.
  <br />
  <i>
    2023-12-19. Data source: cachedRepository.json. Not sure if "Release Valve" is real, no
    image for "Colorful Jerks".
  </i>
</p>

<table>
  {#each profilePictures as profilePicture}
    <tr>
      <td>
        <img
          src={getImage(profilePicture.id.toString())}
          alt="Profile avatar."
          height="256"
          width="256"
        />
      </td>
      <td>
        <h2>{profilePicture.name}</h2>
        <p>{@html profilePicture.descriptionTextEn}</p>
      </td>
    </tr>
  {/each}
</table>

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
