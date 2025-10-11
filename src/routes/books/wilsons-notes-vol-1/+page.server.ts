import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	let title = "Wilson's Notes Vol. 1: Light Guns";
	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
	};
}) satisfies PageServerLoad;
