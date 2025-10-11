import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

export const load = (async ({ url }) => {
	let title = 'Difficulty Levels';
	const difficultyLevels = await query.getDifficultyLevels();
	const difficultyLevelsModifiers = await query.getDifficultyLevelsModifiers();

	return {
		title,
		breadcrumbs: [{ name: title, href: url.pathname }],
		difficultyLevels,
		difficultyLevelsModifiers,
	};
}) satisfies PageServerLoad;
