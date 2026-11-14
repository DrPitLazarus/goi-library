import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { getPlayersFromFactionLeaders } from '$lib/server/db';

export const GET: RequestHandler = async ({ url }) => {
    const search = url.searchParams.get('search') || '';
    const players = await getPlayersFromFactionLeaders(search);
    return json(players);
};
