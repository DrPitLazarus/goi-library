import cachedRepository from "$lib/cachedRepository.json";

let profilePictures = cachedRepository["Muse.Goi2.Entity.Item"]
  .filter((item) => item.Type === "PROFILE_PICTURE")
  .map((item) => {
    return {
      name: item.Name,
      descriptionTextEn: item.DescriptionText?.En || "No description.",
      id: item.Id,
    };
  });

// generate list of filenames
// console.log(JSON.stringify(profilePictures.map(item => `item${item.id}.png`)))

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    profilePictures,
  };
}
