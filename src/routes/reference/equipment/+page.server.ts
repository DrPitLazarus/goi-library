import type { PageServerLoad } from './$types';
import cachedRepositoryJson from '$lib/data/cachedRepository.json';

type SkillConfigItem = {
	Name: string;
	NameText?: { En?: string };
	DescriptionText?: { En?: string };
	ActivationId: number;
	Type: string;
};

type CachedRepository = {
	'Muse.Goi2.Entity.SkillConfig': SkillConfigItem[];
};

const cachedRepository = cachedRepositoryJson as CachedRepository;

let equipment = cachedRepository['Muse.Goi2.Entity.SkillConfig']
	.filter((item) => !item.Name.startsWith('ai') && !item.Name.startsWith('coop'))
	.map((item) => {
		return {
			nameTextEn: item.NameText?.En || '',
			descriptionTextEn: item.DescriptionText?.En || 'No description.',
			id: item.ActivationId,
			type: item.Type,
		};
	});
// .sort((a, b) => a.id - b.id);

// generate list of filenames
// console.log(JSON.stringify(equipment.map(item => `skill${item.id}.png`)))

export const load = (async ({ url }) => {
	let title = 'Equipment';

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		equipment,
	};
}) satisfies PageServerLoad;
