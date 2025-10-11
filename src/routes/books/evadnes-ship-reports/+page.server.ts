import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	let title = "Evadne's Ship Reports";

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
	};
}) satisfies PageServerLoad;
