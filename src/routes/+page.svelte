<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let title = data.title;
	$title = 'Home';
</script>

<h1>{$title}</h1>

<blockquote class="mt-6 border-l-2 pl-6 italic">
	The library is under construction! Pardon the mess! <br />-Dr. Pit Lazarus
</blockquote>

<h3>Game Data</h3>
<ul class="ml-6 mt-2 list-disc">
	<li><a href="clans">Clans</a></li>
	<li><a href="players">Players</a></li>
	<li><a href="faction-leaders">Faction Leaders</a></li>
</ul>

<h3>Books</h3>
<ul class="ml-6 mt-2 list-disc">
	<li><a href="books/wilsons-notes-vol-1">Wilson's Notes Vol. 1</a></li>
	<li><a href="books/wilsons-notes-vol-2">Wilson's Notes Vol. 2</a></li>
	<li><a href="books/evadnes-ship-reports">Evadne's Ship Reports</a></li>
	<li><a href="books/lusses-travels">Lusse's Travels</a></li>
	<li><a href="books/bloodshed-among-the-factions">Bloodshed Among the Factions!</a></li>
</ul>

<h3>Reference</h3>
<ul class="ml-6 mt-2 list-disc">
	<li><a href="reference/badges">Badges</a></li>
	<li><a href="reference/decals">Decals</a></li>
	<li><a href="reference/equipment">Equipment</a></li>
	<li><a href="reference/figureheads">Figureheads</a></li>
	<li><a href="reference/profile-pictures">Profile Pictures</a></li>
	<li><a href="reference/themes">Themes</a></li>
</ul>

<h3>Game Data [Old]</h3>
<ul class="ml-6 mt-2 list-disc">
	<li><a href="game-data/difficulty-levels">Difficulty Levels</a></li>
	<li><a href="game-data/float-constants">Float Constants</a></li>
	<li><a href="game-data/skills">Skills</a></li>
	<li><a href="game-data/system-configuration">System Configuration</a></li>
	<li><a href="game-data/text">Text</a></li>
</ul>
