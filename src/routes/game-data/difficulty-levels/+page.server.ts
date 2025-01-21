import type { PageServerLoad } from '../$types';
import { query } from '$lib/server/db';


export const load = (async () => {
    const difficultyLevels = await query.getDifficultyLevels();
    const difficultyLevelsModifiers = await query.getDifficultyLevelsModifiers();

    return {
        difficultyLevels,
        difficultyLevelsModifiers,
    };
}) satisfies PageServerLoad;