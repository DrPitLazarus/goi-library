import type { LayoutLoad } from './$types';

export const load = (async (event) => {
    const parent = await event.parent();

    return {
        breadcrumbs: parent.breadcrumbs.concat(
            {
                name: "Clans",
                href: "/clans"
            }
        )
    };
}) satisfies LayoutLoad;