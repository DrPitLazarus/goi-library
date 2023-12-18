import cachedRepository from "$lib/cachedRepository.json";

let decals = cachedRepository["Muse.Goi2.Entity.Item"]
  .filter((item) => item.DecorationType === "Decal")
  .map((item) => {
    return {
      name: item.Name,
      descriptionTextEn: item.DescriptionText?.En || "No description.",
      id: item.Id,
      workshop: item.Workshop,
    };
  });

// generate list of decal filenames
// console.log(JSON.stringify(decals.map(item => `item${item.id}.png`)))

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    decals,
  };
}
