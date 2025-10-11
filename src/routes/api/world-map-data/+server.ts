import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { schema } from '$lib/server/db/schema';
import { desc, sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
	const rawJson = await request.json();
	const submitterId: number = rawJson.submitterId;

	interface Contest {
		factionId: number;
		targetFactionId: number;
		territoryId: number;
		type: string;
		time: Date;
		submitterId: number;
		submissionId: number;
	}

	if (rawJson.data.factions) {
		const lastSubmissionResult = await db
			.selectDistinct({
				submissionId: schema.territoryConflictLog.submissionId,
			})
			.from(schema.territoryConflictLog)
			.orderBy(desc(schema.territoryConflictLog.submissionId))
			.limit(1);
		const lastSubmissionId = lastSubmissionResult[0]?.submissionId ?? 0;

		let transformedContests: Contest[] = [];
		for (const faction of rawJson.data.factions) {
			const factionId = faction.FactionId;
			for (const contest of faction.RecentContests) {
				transformedContests.push({
					factionId,
					targetFactionId: contest.TargetFactionId,
					territoryId: contest.LocationId,
					type: contest.Type,
					time: new Date(contest.Time),
					submitterId,
					submissionId: lastSubmissionId + 1,
				});
			}
		}
		// console.log(transformedContests);

		await db
			.insert(schema.territoryConflictLog)
			.values(transformedContests)
			.onDuplicateKeyUpdate({ set: { updatedAt: sql`(utc_timestamp())` } });
		console.log(`territoryConflictLog: inserted!`);
	}

	return json({ success: true });
};
