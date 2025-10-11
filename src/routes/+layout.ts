import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {
		title: '',
		breadcrumbs: [] as { name: string; href: string }[],
	};
}) satisfies LayoutLoad;
