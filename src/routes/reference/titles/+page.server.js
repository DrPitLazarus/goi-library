import cachedRepository from "$lib/cachedRepository.json";

let titles = cachedRepository["Muse.Goi2.Entity.Item"]
  .filter((item) => item.Type === "TITLE")
  .map((item) => {
    return {
      name: item.Name,
      titleTextEn: item.TitleText?.En || "",
    };
  });

/**
 * @type {{ class: string; title: string; }[]}
 */
let titlesClass = [];
let titlesClassSet = new Set();
for (let avatarClass of cachedRepository["Muse.Goi2.Entity.AvatarClassSetting"]) {
  for (let classTitle of avatarClass.Titles) {
    if (titlesClassSet.has(classTitle.TitleText.En)) continue;
    titlesClassSet.add(classTitle.TitleText.En);
    titlesClass.push({class: classTitle.Class, title: classTitle.TitleText.En });
  }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    titles,
    titlesClass,
  };
}
