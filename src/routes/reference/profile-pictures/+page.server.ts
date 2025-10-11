import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type Item = {
	Name: string;
	DescriptionText?: { En?: string };
	Id: number | string;
	Type: string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.Item': Item[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let profilePictures = cachedRepository['Muse.Goi2.Entity.Item']
	.filter((item) => item.Type === 'PROFILE_PICTURE')
	.map((item) => {
		return {
			name: item.Name,
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.Id,
		};
	});

// generate list of filenames
// console.log(JSON.stringify(profilePictures.map(item => `item${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Profile Pictures';

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		profilePictures,
	};
}) satisfies PageServerLoad;
