import type { LayoutLoad } from './$types';

export const load = (async (event) => {
    const parent = await event.parent();
    const clanId = event.params.id;

    return {
        breadcrumbs: parent.breadcrumbs.concat(
            {
                name: "Clan Detail",
                href: `/clans/${clanId}`
            }
        )
    };
}) satisfies LayoutLoad;