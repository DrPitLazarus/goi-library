import { getPlayer } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, url }) => {
	let title = 'Player Detail';
	const playerId = parseInt(params.id);
	const player = await getPlayer(playerId);
	if (player.results.length !== 1) error(404, 'Player not found or not scanned yet.');
	const p = player.results[0];
	const clanTag = p.clanId !== 0 && p.clanTag !== null ? `[${p.clanTag}] ` : '';
	const playerName = `${p.name.slice(0, -5)}`;
	title = `Player: ${clanTag}${playerName}`;

	return {
		title,
		breadcrumbs: [
			{ name: 'Players', href: '/players' },
			{ name: 'Player Detail', href: url.pathname },
		],
		player,
		clanTag,
		playerName,
	};
}) satisfies PageServerLoad;
