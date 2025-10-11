import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Name: string;
	DescriptionText?: { En?: string };
	Id: number | string;
	DecorationType?: string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let figureheads = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.DecorationType === 'FigureHead')
	.map((item) => {
		return {
			name: item.Name,
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.Id,
		};
	});

// generate list of decal filenames
// console.log(JSON.stringify(figureheads.map(item => `item${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Figureheads';
	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		figureheads,
	};
}) satisfies PageServerLoad;
