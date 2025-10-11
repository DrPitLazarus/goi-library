import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	let title = 'Players';
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const search = url.searchParams.get('search') || '';
	const sort = url.searchParams.get('sort') || 'totalPlayTime-desc';

	const players = await query.getPlayerList(page, search, sort);

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		players,
	};
}) satisfies PageServerLoad;
