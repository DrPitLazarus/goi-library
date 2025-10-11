import { format, formatDistanceToNowStrict } from 'date-fns';
import humanizeDuration from 'humanize-duration';

export const appName = 'Guns of Icarus Library';

export const clanRoles = ['Leader', 'Officer', 'Member'];

export const diamondSymbol = '✦';

export const factionNames = [
	'Neutral',
	'Fjord Baronies',
	'Anglean Republic',
	'Order of Chaladon',
	'Mercantile Guild',
	'Arashi League',
	'Yesha Empire',
];

export const timeAgo = (pastDate: Date) => {
	return formatDistanceToNowStrict(pastDate, { addSuffix: true, roundingMethod: 'floor' });
};

export const formatDate = (date: Date) => {
	const formatString = 'yyyy-MM-dd HH:mm';
	return format(date, formatString);
};

export const formatDuration = (rawSeconds: number) => {
	return humanizeDuration(rawSeconds * 1000, { units: ['d', 'h', 'm'], round: true });
};

export const formatLevel = (totalLevel: number) => {
	if (totalLevel > 90) {
		return `${diamondSymbol.repeat(2)}${totalLevel - 90}`;
	}
	if (totalLevel > 45) {
		return `${diamondSymbol}${totalLevel - 45}`;
	}
	return totalLevel;
};

export const formatLevels = (ranks: any) => {
	return `P${formatLevel(ranks.Pilot)} G${formatLevel(ranks.Gunner)} E${formatLevel(ranks.Engineer)}`;
};
