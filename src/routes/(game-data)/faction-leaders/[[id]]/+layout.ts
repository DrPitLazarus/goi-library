import type { LayoutLoad } from './$types';

export const load = (async (event) => {
    const parent = await event.parent();

    return {
        breadcrumbs: parent.breadcrumbs.concat(
            {
                name: "Faction Leaders",
                href: "/faction-leaders"
            }
        )
    };
}) satisfies LayoutLoad;