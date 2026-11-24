import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, url }) => {
	let title = 'World Map Missions';
	const worldEvents = await query.getWorldEvents();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		worldEvents,
	};
}) satisfies PageServerLoad;
