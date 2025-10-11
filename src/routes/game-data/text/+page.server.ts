import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load = (async ({ url }) => {
	let title = 'Text';
	const text = await query.getText();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		text,
	};
}) satisfies PageServerLoad;
