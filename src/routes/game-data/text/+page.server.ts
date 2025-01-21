import type { PageServerLoad } from '../$types';
import { db, query } from '$lib/server/db';


export const load = (async () => {
    const text = await query.getText();

    return {
        text,
    };
}) satisfies PageServerLoad;