import type { PageServerLoad } from '../$types';
import { db, query } from '$lib/server/db';


export const load = (async () => {
    const systemConfiguration = await query.getSystemConfiguration();

    return {
        systemConfiguration: systemConfiguration,
    };
}) satisfies PageServerLoad;