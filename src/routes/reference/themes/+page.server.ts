import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Name: string;
	DescriptionText?: { En?: string };
	Id: string | number;
	DecorationType?: string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let themes = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.DecorationType === 'Theme')
	.map((item) => {
		return {
			name: item.Name,
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.Id,
		};
	});

// generate list of decal filenames
// console.log(JSON.stringify(themes.map(item => `item${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Themes';
	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		themes,
	};
}) satisfies PageServerLoad;
