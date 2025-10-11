import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db, getFactionLeaderLastSubmissionId, getFactionLeaders } from '$lib/server/db';
import { factionLeader } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';
import isEqual from 'lodash/isEqual';

export const GET: RequestHandler = async ({ url }) => {
	return json('Hi');
};

export const POST: RequestHandler = async ({ request }) => {
	const newJson: any = await request.json();
	if (!Object.keys(newJson).includes('factions')) {
		return json({ success: false, message: 'Error. Missing expected keys.' });
	}

	let transformedRawJson: any = [];
	for (const faction of newJson.factions) {
		for (const leader of faction.PastLeaders) {
			transformedRawJson.push({
				factionId: faction.FactionId,
				rank: leader.Rank,
				userId: leader.UserId,
				userName: leader.UserName,
				efforts: leader.Efforts,
			});
		}
	}

	const lastSubmissionId = (await getFactionLeaderLastSubmissionId()).results[0].submissionId;
	const lastLeaders = (await getFactionLeaders(lastSubmissionId)).results.map((leader) => {
		const { factionId, rank, userId, userName, efforts } = leader;
		return {
			factionId,
			rank,
			userId,
			userName,
			efforts,
		};
	});
	if (isEqual(transformedRawJson, lastLeaders)) {
		return json({ success: true, message: 'Current. Database not updated.' });
	}
	// Add the submission ID to the input data.
	transformedRawJson = transformedRawJson.map((leader: any) => ({
		submissionId: lastSubmissionId + 1,
		...leader,
	}));
	await db
		.insert(factionLeader)
		.values(transformedRawJson)
		.onDuplicateKeyUpdate({ set: { updatedAt: sql`(utc_timestamp())` } });
	return json({ success: true });
};
