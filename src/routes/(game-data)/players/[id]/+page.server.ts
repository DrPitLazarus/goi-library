import { getPlayer } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const playerId = parseInt(params.id);
    const player = await getPlayer(playerId);
    if (player.results.length !== 1) error(404, "Player not found or scanned yet.");
    return {
        player,
    };
}) satisfies PageServerLoad;