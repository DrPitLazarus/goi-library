import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db, query } from '$lib/server/db';
import { territoryState } from '$lib/server/db/schema';
import { between, sql } from 'drizzle-orm';
import isEqual from 'lodash/isEqual';
import { eq } from 'drizzle-orm';

type TerritoryState = {
	submissionId: number;
	factionId: number;
	allianceId: number;
	territoryId: number;
};

export const GET: RequestHandler = async ({ url }) => {
	if (url.searchParams.size === 0) {
		const lastSubmissionId = (await query.getTerritoryStateLastSubmissionId()).results[0]
			.submissionId;
		const lastStates = await query.getTerritoryStates(lastSubmissionId);
		return json(lastStates);
	} else if (
		url.searchParams.get('war') === '2025-04-30' &&
		url.searchParams.get('get') === 'sids'
	) {
		const results = await db
			.selectDistinct({
				day: sql`date(created_at)`,
				createdAt: territoryState.createdAt,
				submissionId: territoryState.submissionId,
			})
			.from(territoryState)
			.where(
				between(
					territoryState.createdAt,
					new Date('2025-04-30 00:00:00Z'),
					new Date('2025-05-30 23:59:59Z'),
				),
			);
		return json({ success: true, results });
	} else if (
		url.searchParams.get('war') === '2025-04-30' &&
		url.searchParams.get('get') === 'all'
	) {
		const results = await db
			.select({
				createdAt: territoryState.createdAt,
				submissionId: territoryState.submissionId,
				territoryId: territoryState.territoryId,
				factionId: territoryState.factionId,
				allianceId: territoryState.allianceId,
			})
			.from(territoryState)
			.where(
				between(
					territoryState.createdAt,
					new Date('2025-04-30 00:00:00Z'),
					new Date('2025-05-30 23:59:59Z'),
				),
			);
		return json({ success: true, results });
	} else if (url.searchParams.get('sid')) {
		const submissionId = Number.parseInt(url.searchParams.get('sid') ?? '-1');
		if (isNaN(submissionId) || submissionId <= -1) return json(null);
		const results = await db
			.select({
				createdAt: territoryState.createdAt,
				submissionId: territoryState.submissionId,
				territoryId: territoryState.territoryId,
				factionId: territoryState.factionId,
				allianceId: territoryState.allianceId,
			})
			.from(territoryState)
			.where(eq(territoryState.submissionId, submissionId));
		return json({ success: true, results });
	}
	return json(null);
};

export const POST: RequestHandler = async ({ request }) => {
	const rawString = await request.text();
	const regex = /(?<factionId>\d+)\((?<allianceId>\d+);(?<territoryIds>\[.*?\]);(?<idk>\[.*?\])/gm;
	const matches: any = [...rawString.matchAll(regex)];
	if (matches.length === 0) {
		return json({ success: false, message: 'Invalid data.' });
	}

	let transformedJson: TerritoryState[] = [];

	for (const match of matches) {
		// Convert string to JSON.
		const factionId = JSON.parse(match.groups.factionId);
		const allianceId = JSON.parse(match.groups.allianceId);
		const territoryIds = JSON.parse(match.groups.territoryIds);
		// Create an object for each territory.
		for (const territoryId of territoryIds) {
			transformedJson.push({
				submissionId: -1,
				territoryId,
				factionId,
				allianceId,
			});
		}
	}

	const lastSubmissionId = (await query.getTerritoryStateLastSubmissionId()).results[0]
		.submissionId;
	const lastStates = (await query.getTerritoryStates(lastSubmissionId)).results.map((territory) => {
		const { territoryId, factionId, allianceId } = territory;
		return {
			// submissionId is set to -1 for the isEqual check.
			submissionId: -1,
			territoryId,
			factionId,
			allianceId,
		};
	});
	if (isEqual(transformedJson, lastStates)) {
		return json({ success: true, message: 'Current. Database not updated.' });
	}
	// Add the submission ID to the input data.
	transformedJson = transformedJson.map((territory) => ({
		...territory,
		submissionId: lastSubmissionId + 1,
	}));
	await db
		.insert(territoryState)
		.values(transformedJson)
		.onDuplicateKeyUpdate({
			set: {
				...transformedJson,
				updatedAt: sql`(utc_timestamp())`,
			},
		});
	return json({ success: true });
};
