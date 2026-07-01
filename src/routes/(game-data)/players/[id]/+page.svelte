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

	let player = $derived(data.player.results[0]);
	let playedTime = $derived(data.player.results[0].playedTime as PlayedTime);
	let updatedAt = $derived(formatDate(player.updatedAt));
	let updatedAtAgo = $derived(timeAgo(player.updatedAt));
	let joinDate = $derived(formatDate(player.joinDate));
	let joinDateAgo = $derived(timeAgo(player.joinDate));
	let lastOnline = $derived(formatDate(player.lastOnline));
	let lastOnlineAgo = $derived(timeAgo(player.lastOnline));
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
			<a href="/clans/{player.clanId}">[{player.clanTag}] {player.clanName}</a>
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
				<td>{formatDuration(playedTime.Pilot)}</td>
			</tr>
			<tr>
				<td>Gunner</td>
				<td>{formatDuration(playedTime.Gunner)}</td>
			</tr>
			<tr>
				<td>Engineer</td>
				<td>{formatDuration(playedTime.Engineer)}</td>
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
