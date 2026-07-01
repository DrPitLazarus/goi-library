<script lang="ts">
	import { page } from '$app/state';
	import { Badge } from '$lib/components/ui/badge';
	import { clanRoles, formatDate, timeAgo } from '$lib/shared';

	let { data } = $props();
	let clan = $derived(data.clan.results[0]);
	let updatedAt = $derived(formatDate(clan.updatedAt));
	let updatedAtAgo = $derived(timeAgo(clan.updatedAt));
</script>

<h1>{page.data.title}</h1>

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
		<h3>Message 1</h3>
		<p class="border-l-2 pl-6 leading-7 whitespace-pre-wrap">
			{clan.message1.replaceAll('\r', '')}
		</p>
	</div>
{/if}

{#if clan.message2 && clan.message2.length > 0}
	<div class="overflow-x-auto">
		<h3>Message 2</h3>
		<p class="border-l-2 pl-6 leading-7 whitespace-pre-wrap">
			{clan.message2.replaceAll('\r', '')}
		</p>
	</div>
{/if}

{#if data.members}
	<h3>Members ({data.members.results.length?.toLocaleString()} discovered)</h3>
	<p>Sorted by last online.</p>
	<ul class="list-inside list-decimal">
		{#each data.members.results as member}
			<li>
				<a href="/players/{member.id}">{member.name.slice(0, -5)}</a>
				{#if member.clanRole < 2}<span> ({clanRoles[member.clanRole]})</span>{/if}
				<span class="text-yellow-900"> ({timeAgo(member.lastOnline)})</span>
			</li>
		{/each}
	</ul>
{/if}
