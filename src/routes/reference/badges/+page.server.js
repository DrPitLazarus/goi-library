import cachedRepository from "$lib/cachedRepository.json";

let badges = cachedRepository["Muse.Goi2.Entity.Item"]
  .filter((item) => item.Type === "BADGE")
  .map((item) => {
    return {
      name: item.Name,
      nameTextEn: item.NameText?.En || "",
      descriptionTextEn: item.DescriptionText?.En || "No description.",
      id: item.Id,
    };
  });

// generate list of filenames
// console.log(JSON.stringify(badges.map(item => `item${item.id}.png`)))

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    badges,
  };
}
