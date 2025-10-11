import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load = (async ({ url }) => {
	let title = 'Skills';
	const skillConfig = await query.getSkillConfig();
	const skillConfigActivationIds = skillConfig.map((value) => value.activationId);
	const effects = await query.getEffects(skillConfigActivationIds);
	const specialAbilities = await query.getSpecialAbilities(skillConfigActivationIds);
	const specialAbilitiesParams = await query.getSpecialAbilitiesParams();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		skillConfig,
		effects,
		specialAbilities,
		specialAbilitiesParams,
	};
}) satisfies PageServerLoad;
