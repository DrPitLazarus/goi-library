import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	let title = 'Bloodshed Among the Factions!';

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
	};
}) satisfies PageServerLoad;
