import { getClan, getClanMembers } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
	let title = 'Clan Detail';
	const clanId = parseInt(params.id);
	const clan = await getClan(clanId);
	if (clan.results.length !== 1) error(404, 'Clan not found...');
	title = `Clan: [${clan.results[0].tag}] ${clan.results[0].name}`;
	const members = await getClanMembers(clanId);
	return {
		title,
		breadcrumbs: [
			{ name: 'Clans', href: '/clans' },
			{ name: 'Clan Detail', href: url.pathname },
		],
		clan,
		members,
	};
}) satisfies PageServerLoad;
