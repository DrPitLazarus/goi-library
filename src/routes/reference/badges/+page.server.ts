import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Type: string;
	Name: string;
	NameText?: { En?: string };
	DescriptionText?: { En?: string };
	Id: number | string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let badges = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.Type === 'BADGE')
	.map((item) => {
		return {
			name: item.Name,
			nameTextEn: item.NameText?.En || '',
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.Id,
		};
	});

// generate list of filenames
// console.log(JSON.stringify(badges.map(item => `item${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Badges';

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		badges,
	};
}) satisfies PageServerLoad;
