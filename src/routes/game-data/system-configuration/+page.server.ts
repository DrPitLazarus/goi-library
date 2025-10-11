import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load = (async ({ url }) => {
	let title = 'System Configuration';
	const systemConfiguration = await query.getSystemConfiguration();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		systemConfiguration,
	};
}) satisfies PageServerLoad;
