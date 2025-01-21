import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
    const page = parseInt(url.searchParams.get('page') ?? "1");
    const search = url.searchParams.get('search') || '';
    const sort = url.searchParams.get('sort') || 'commendations-desc';
    
    const clans = await query.getClanList(page, search, sort);

    return {
        clans,
    };
}) satisfies PageServerLoad;