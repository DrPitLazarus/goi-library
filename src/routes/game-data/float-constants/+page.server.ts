import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load = (async ({ url }) => {
	let title = 'Float Constants';
	const floatConstants = await query.getFloatConstants();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		floatConstants,
	};
}) satisfies PageServerLoad;
