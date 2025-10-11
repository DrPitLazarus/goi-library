import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Name: string;
	DescriptionText?: { En?: string };
	Id: number | string;
	Workshop: boolean;
	DecorationType?: string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let decals = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.DecorationType === 'Decal')
	.map((item) => {
		return {
			name: item.Name,
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.Id,
			workshop: item.Workshop,
		};
	});

// generate list of decal filenames
// console.log(JSON.stringify(decals.map(item => `item${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Decals';

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		decals,
	};
}) satisfies PageServerLoad;
