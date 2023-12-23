import cachedRepository from "$lib/cachedRepository.json";

let equipment = cachedRepository["Muse.Goi2.Entity.SkillConfig"]
  .filter((item) => !item.Name.startsWith("ai") && !item.Name.startsWith("coop"))
  .map((item) => {
    return {
      nameTextEn: item.NameText?.En || "",
      descriptionTextEn: item.DescriptionText?.En || "No description.",
      id: item.ActivationId,
      type: item.Type,
    };
  });
// .sort((a, b) => a.id - b.id);

// generate list of filenames
// console.log(JSON.stringify(equipment.map(item => `skill${item.id}.png`)))

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    equipment,
  };
}
