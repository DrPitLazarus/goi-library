import type { PageServerLoad } from './$types';
import { db, query } from '$lib/server/db';


export const load = (async () => {
    const skillConfig = await query.getSkillConfig();
    const skillConfigActivationIds = skillConfig.map(value => value.activationId);
    const effects = await query.getEffects(skillConfigActivationIds);
    const specialAbilities = await query.getSpecialAbilities(skillConfigActivationIds);
    const specialAbilitiesParams = await query.getSpecialAbilitiesParams();

    return {
        skillConfig,
        effects,
        specialAbilities,
        specialAbilitiesParams,
    };
}) satisfies PageServerLoad;