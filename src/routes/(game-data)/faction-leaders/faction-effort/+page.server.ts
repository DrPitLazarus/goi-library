import {
	getFactionEffortFromFactionLeaders,
	getFactionEffortFromFactionLeadersWeekly,
} from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let title = 'Faction Effort';
	let factionEfforts = await getFactionEffortFromFactionLeaders();
	let weeklyEffort = await getFactionEffortFromFactionLeadersWeekly();

	return {
		title,
		breadcrumbs: [
			{ name: 'Faction Leaders', href: '/faction-leaders' },
			{ name: 'Faction Effort', href: '/faction-leaders/faction-effort' },
		],
		factionEfforts,
        weeklyEffort,
	};
}) satisfies PageServerLoad;
