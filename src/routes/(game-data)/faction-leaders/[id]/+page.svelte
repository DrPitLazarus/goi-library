<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const player = data.player.results[0];
	const clanTag = player.clanId !== 0 && player.clanTag !== null ? `[${player.clanTag}] ` : '';
	const playerName = `${player.name.slice(0, -5)}`;
	data.title.set(`Player: ${clanTag}${playerName}`);
	const title = data.title;
	const updatedAt = data.utils.formatDate(player.updatedAt);
	const updatedAtAgo = data.utils.timeAgo(player.updatedAt);
	const joinDate = data.utils.formatDate(player.joinDate);
	const joinDateAgo = data.utils.timeAgo(player.joinDate);
	const lastOnline = data.utils.formatDate(player.lastOnline);
	const lastOnlineAgo = data.utils.timeAgo(player.lastOnline);
</script>

<h1>{$title}</h1>

<blockquote>
	{#if player.title}{player.title}<br />{/if}
	{player.description || 'No quote set.'}
</blockquote>

<p class="mt-4">Join date: {joinDate} ({joinDateAgo})</p>
<p>Last online: {lastOnline} ({lastOnlineAgo})</p>
<p>Last scan: {updatedAt} ({updatedAtAgo})</p>

<p class="mt-4">
	Levels: {data.utils.formatLevels(player.ranks)}
	<span class="text-yellow-900">(Total: {player.ranksTotal.toLocaleString()})</span>
</p>

<p>Faction: {data.utils.factionNames[player.factionId ?? 0]}</p>
<p>
	Clan:
	{#if player.clanId > 0 && player.clanTag}
		<a href="/clans/{player.clanId}">{clanTag}{player.clanName}</a>
		{#if player.clanRole < 2}
			<span> ({data.utils.clanRoles[player.clanRole]})</span>
		{/if}
	{:else if player.clanId > 0 && player.clanTag === null}
		N/A
	{:else}
		None
	{/if}
</p>
<p>Platform: {player.name.slice(-3, -1)}</p>
<p>PvP Matches: {player.skirmishMatches?.toLocaleString()}</p>
<p>PvE Matches: {player.allianceMatches?.toLocaleString()}</p>

<h4>Play Time</h4>
<p>Pilot: {data.utils.formatDuration(player.playedTime.Pilot)}</p>
<p>Gunner: {data.utils.formatDuration(player.playedTime.Gunner)}</p>
<p>Engineer: {data.utils.formatDuration(player.playedTime.Engineer)}</p>
<p>Total: {data.utils.formatDuration(player.playedTimeTotal)}</p>

