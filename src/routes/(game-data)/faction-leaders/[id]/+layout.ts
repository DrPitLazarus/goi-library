import type { LayoutLoad } from './$types';

export const load = (async (event) => {
    const parent = await event.parent();
    const playerId = event.params.id;

    return {
        breadcrumbs: parent.breadcrumbs.concat(
            {
                name: "Player Detail",
                href: `/players/${playerId}`
            }
        )
    };
}) satisfies LayoutLoad;