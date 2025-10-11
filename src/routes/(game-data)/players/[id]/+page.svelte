<script lang="ts">
	import { page } from '$app/state';
	import {
		clanRoles,
		factionNames,
		formatDate,
		formatDuration,
		formatLevels,
		timeAgo,
	} from '$lib/shared';

	type PlayedTime = {
		Pilot: number;
		Gunner: number;
		Engineer: number;
	};

	let { data } = $props();
	let { clanTag } = data;

	let player = {
		...data.player.results[0],
		playedTime: data.player.results[0].playedTime as PlayedTime,
	};
	let updatedAt = formatDate(player.updatedAt);
	let updatedAtAgo = timeAgo(player.updatedAt);
	let joinDate = formatDate(player.joinDate);
	let joinDateAgo = timeAgo(player.joinDate);
	let lastOnline = formatDate(player.lastOnline);
	let lastOnlineAgo = timeAgo(player.lastOnline);
</script>

<h1>{page.data.title}</h1>

<blockquote>
	{#if player.title}{player.title}<br />{/if}
	{player.description || 'No quote set.'}
</blockquote>

<div class="mt-4">
	<p>Join date: {joinDate} ({joinDateAgo})</p>
	<p>Last online: {lastOnline} ({lastOnlineAgo})</p>
	<p>Last scan: {updatedAt} ({updatedAtAgo})</p>
</div>

<div class="mt-4">
	<p>
		Clan:
		{#if player.clanId && player.clanId > 0 && player.clanTag}
			<a href="/clans/{player.clanId}">{clanTag}{player.clanName}</a>
			{#if player.clanRole < 2}
				<span> ({clanRoles[player.clanRole]})</span>
			{/if}
		{:else if player.clanId && player.clanId > 0 && player.clanTag === null}
			N/A
		{:else}
			None
		{/if}
	</p>
	<p>Faction: {factionNames[player.factionId ?? 0]}</p>
	<p>Platform: {player.name.slice(-3, -1)}</p>
</div>

<div class="mt-4">
	<h4 class="my-0!">Experience</h4>
	<p>
		Levels: {formatLevels(player.ranks as number[])}
		<span class="text-yellow-900">(Total: {player.ranksTotal.toLocaleString()})</span>
	</p>
	<p>PvP Matches: {player.skirmishMatches?.toLocaleString()}</p>
	<p>PvE Matches: {player.allianceMatches?.toLocaleString()}</p>
</div>

<div class="mt-4">
	<h4 class="my-0!">Play Time</h4>
	<table>
		<tbody>
			<tr>
				<td>Pilot</td>
				<td>{formatDuration(player.playedTime.Pilot)}</td>
			</tr>
			<tr>
				<td>Gunner</td>
				<td>{formatDuration(player.playedTime.Gunner)}</td>
			</tr>
			<tr>
				<td>Engineer</td>
				<td>{formatDuration(player.playedTime.Engineer)}</td>
			</tr>
			<tr>
				<td>Total</td>
				<td>{formatDuration(player.playedTimeTotal)}</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	@reference "$lib/../app.css";

	div p {
		@apply m-0;
	}
	div tr td:first-child {
		@apply pl-0!;
	}
</style>
