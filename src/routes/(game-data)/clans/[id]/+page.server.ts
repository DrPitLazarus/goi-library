import { getClan, getClanMembers } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const clanId = parseInt(params.id);
    const clan = await getClan(clanId);
    if (clan.results.length !== 1) error(404, "Clan not found...");
    const members = await getClanMembers(clanId);
    return {
        clan,
        members,
    };
}) satisfies PageServerLoad;