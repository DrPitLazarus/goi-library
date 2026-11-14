import type { PageServerLoad } from './$types';
import { getFactionLeaderHistoryForPlayer, getPlayersFromFactionLeaders } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import { hidePcFromPlayerName } from '$lib/shared';
type GetPlayersFromFactionLeaders = Awaited<ReturnType<typeof getPlayersFromFactionLeaders>>;

export const load = (async ({ params, url }) => {
	let title = 'Leader History';
	let playerId = parseInt(params.id ?? '-1');
	let history = null;
	let stats = {
		lifetime: {
			totalEffort: 0,
			timesAsLeader: 0,
			factionStats: [] as any[],
		},
	};

	const search = url.searchParams.get('search') || '';
	let playerSearchResults = {} as GetPlayersFromFactionLeaders;
	if (playerId < 0) {
		playerSearchResults = await getPlayersFromFactionLeaders(search);
		if (playerSearchResults.results.length === 1) {
			redirect(303, `/faction-leaders/leader-history/${playerSearchResults.results[0].userId}`);
		}
	} else {
		history = await getFactionLeaderHistoryForPlayer(playerId);
	}

	if (history && history.results.length > 0) {
		title = `Leader History: ${hidePcFromPlayerName(history.results[0].userName)}`;
		stats.lifetime = {
			totalEffort: history.results.reduce((acc, entry) => acc + entry.efforts, 0),
			timesAsLeader: history.results.length,
			factionStats: history.results
				.reduce((acc: any[], entry) => {
					const existingFaction = acc.find((f) => f.factionId === entry.factionId);
					if (existingFaction) {
						existingFaction.timesAsLeader++;
						existingFaction.totalEffort += entry.efforts;
						existingFaction.topEffort = Math.max(existingFaction.topEffort, entry.efforts);
					} else {
						acc.push({
							factionId: entry.factionId,
							timesAsLeader: 1,
							totalEffort: entry.efforts,
							topEffort: entry.efforts,
						});
					}
					return acc;
				}, [])
				.sort((a, b) => b.totalEffort - a.totalEffort),
		};
	}

	return {
		title,
		breadcrumbs: [
			{ name: 'Faction Leaders', href: '/faction-leaders' },
			{ name: 'Leader History', href: '/faction-leaders/leader-history' },
		],
		history,
		stats,
		playerSearchResults,
	};
}) satisfies PageServerLoad;
