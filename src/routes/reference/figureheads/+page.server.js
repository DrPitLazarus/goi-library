import cachedRepository from "$lib/cachedRepository.json";

let figureheads = cachedRepository["Muse.Goi2.Entity.Item"]
  .filter((item) => item.DecorationType === "FigureHead")
  .map((item) => {
    return {
      name: item.Name,
      descriptionTextEn: item.DescriptionText?.En || "No description.",
      id: item.Id,
    };
  });

// generate list of decal filenames
// console.log(JSON.stringify(figureheads.map(item => `item${item.id}.png`)))

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    figureheads,
  };
}
