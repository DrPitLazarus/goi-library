import type { LayoutLoad } from './$types';
import { title } from "$lib/title";
import { format, formatDistanceToNowStrict } from 'date-fns';
import humanizeDuration from 'humanize-duration';

const clanRoles = ['Leader', 'Officer', 'Member'];
const factionNames = [
    'Neutral',
    'Fjord Baronies',
    'Anglean Republic',
    'Order of Chaladon',
    'Mercantile Guild',
    'Arashi League',
    'Yesha Empire',
];
const timeAgo = (pastDate: Date) => {
    return formatDistanceToNowStrict(pastDate, { addSuffix: true, roundingMethod: 'floor' });
}
const formatDate = (date: Date) => {
    const formatString = 'yyyy-MM-dd HH:mm';
    return format(date, formatString);
}
const formatDuration = (rawSeconds: number) => {
    return humanizeDuration(rawSeconds * 1000, { units: ['d', 'h', 'm'], round: true });
}

const formatLevel = (totalLevel: number) => {
    const diamond = '✦';
    if (totalLevel > 90) {
        return `${diamond.repeat(2)}${totalLevel - 90}`;
    }
    if (totalLevel > 45) {
        return `${diamond}${totalLevel - 45}`;
    }
    return totalLevel;
}

const formatLevels = (ranks: any) => {
    return `P${formatLevel(ranks.Pilot)} G${formatLevel(ranks.Gunner)} E${formatLevel(ranks.Engineer)}`
}

const utils = {
    clanRoles,
    factionNames,
    timeAgo,
    formatDate,
    formatDuration,
    formatLevel,
    formatLevels,
};

export const load = (async () => {
    return {
        APP_NAME: "Guns of Icarus Library",
        title,
        breadcrumbs: [] as { name: string, href: string }[],
        utils,
    };
}) satisfies LayoutLoad;