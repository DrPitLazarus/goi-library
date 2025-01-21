import type { PageServerLoad } from '../$types';
import { db, query } from '$lib/server/db';


export const load = (async () => {
    const floatConstants = await query.getFloatConstants();

    return {
        floatConstants,
    };
}) satisfies PageServerLoad;