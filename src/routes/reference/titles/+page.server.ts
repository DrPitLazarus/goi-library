import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Type: string;
	Name: string;
	TitleText?: { En?: string };
};

type AvatarClassSetting = {
	Titles: { Class: string; TitleText: { En: string } }[];
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
	'Muse.Goi2.Entity.AvatarClassSetting': AvatarClassSetting[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let titles = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.Type === 'TITLE')
	.map((item) => {
		return {
			name: item.Name,
			titleTextEn: item.TitleText?.En || '',
		};
	});

let titlesClass = [];
let titlesClassSet = new Set();
for (let avatarClass of cachedRepository['Muse.Goi2.Entity.AvatarClassSetting']) {
	for (let classTitle of avatarClass.Titles) {
		if (titlesClassSet.has(classTitle.TitleText.En)) continue;
		titlesClassSet.add(classTitle.TitleText.En);
		titlesClass.push({ class: classTitle.Class, title: classTitle.TitleText.En });
	}
}

export const load = (async ({ url }) => {
	let title = 'Titles';
	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		titles,
		titlesClass,
	};
}) satisfies PageServerLoad;
