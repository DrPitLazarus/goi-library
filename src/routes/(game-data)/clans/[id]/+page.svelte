<script lang="ts">
	import type { PageData } from './$types';
	import { Badge } from '$lib/components/ui/badge';

	export let data: PageData;
	const clan = data.clan.results[0];
	data.title.set(`Clan: [${clan.tag}] ${clan.name}`);
	const title = data.title;
	const updatedAt = data.utils.formatDate(clan.updatedAt);
	const updatedAtAgo = data.utils.timeAgo(clan.updatedAt);
</script>

<h1>{$title}</h1>

<blockquote>
	{clan.quote}
</blockquote>

<div class="mt-4">
	<Badge variant="outline">{clan.memberCount.toLocaleString()} members</Badge>
	<Badge variant="outline">{clan.commendations.toLocaleString()} commendations</Badge>
</div>

<p class="mt-4">Last scan: {updatedAt} ({updatedAtAgo})</p>

{#if clan.message1 && clan.message1.length > 0}
	<div class="overflow-x-auto">
		<h4>Message 1</h4>
		<p class="whitespace-pre-wrap border-l-2 pl-6 leading-7">
			{clan.message1.replaceAll('\r', '')}
		</p>
	</div>
{/if}

{#if clan.message2 && clan.message2.length > 0}
	<div class="overflow-x-auto">
		<h4>Message 2</h4>
		<p class="whitespace-pre-wrap border-l-2 pl-6 leading-7">
			{clan.message2.replaceAll('\r', '')}
		</p>
	</div>
{/if}

{#if data.members}
	<h4>Members ({data.members.results.length?.toLocaleString()} discovered)</h4>
	<p>Sorted by last online.</p>
	{#each data.members.results as member}
		<li>
			<a href="/players/{member.id}">{member.name.slice(0, -5)}</a>
			{#if member.clanRole < 2}<span> ({data.utils.clanRoles[member.clanRole]})</span>{/if}
			<span class="text-yellow-900"> ({data.utils.timeAgo(member.lastOnline)})</span>
		</li>
	{/each}
{/if}
