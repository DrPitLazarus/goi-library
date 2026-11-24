import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db, query } from '$lib/server/db';
import { schema } from '$lib/server/db/schema';
import { desc, sql } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const result = await query.getWorldEvents();
	return json(result);
};

export const POST: RequestHandler = async ({ request }) => {
	const rawJson = await request.json();
	const submitterId: number = rawJson.submitterId;
	const data = rawJson.data;

	const conflictLast = await db
		.selectDistinct({ submissionId: schema.territoryConflictLog.submissionId })
		.from(schema.territoryConflictLog)
		.orderBy(desc(schema.territoryConflictLog.submissionId))
		.limit(1);

	const conflictLastSubmissionId = conflictLast[0]?.submissionId ?? 0;

	// Territory conflict log
	if (data?.factions) {
		interface Contest {
			factionId: number;
			targetFactionId: number;
			territoryId: number;
			type: string;
			time: Date;
			submitterId: number;
			submissionId: number;
		}

		const transformedContests: Contest[] = [];
		for (const faction of data.factions) {
			const factionId = faction.FactionId;
			for (const contest of faction.RecentContests ?? []) {
				transformedContests.push({
					factionId,
					targetFactionId: contest.TargetFactionId,
					territoryId: contest.LocationId,
					type: contest.Type,
					time: new Date(contest.Time),
					submitterId,
					submissionId: conflictLastSubmissionId + 1,
				});
			}
		}

		if (transformedContests.length > 0) {
			await db
				.insert(schema.territoryConflictLog)
				.values(transformedContests)
				.onDuplicateKeyUpdate({ set: { updatedAt: sql`(utc_timestamp())` } });
			console.log(`territoryConflictLog: inserted ${transformedContests.length} rows`);
		}
	}

	// World events/missions
	if (data?.events && Array.isArray(data.events)) {
		interface WorldEvent {
			id: number;
			name: string;
			type: string;
			rawObjectives: any[];
			objectives: string;
			description: string | null;
			imageId: number;
			startTime: Date;
			endTime: Date;
			completeTime: Date | null;
			completedFactions: number[];
			progress: any[];
			rewards: any[];
			rewardBuff: string;
			rewardBuffAmount: number;
			rewardBuffHours: number;
			rewardMultiplier: number;
			durationModifier: number;
			originalDurationSeconds: number;
			eventType: string;
			allianceId: number;
			submitterId: number;
		}

		const transformedEvents: WorldEvent[] = [];

		for (const event of data.events) {
			const completeTime = event.CompleteTime != null ? new Date(event.CompleteTime) : null;

			transformedEvents.push({
				id: event.Id,
				name: event.Name ?? '',
				type: event.Type ?? '',
				rawObjectives: event.RawObjectives ?? {},
				objectives: event.Objectives ?? '',
				description: event.Description ?? null,
				imageId: event.ImageId ?? 0,
				startTime: new Date(event.StartTime),
				endTime: new Date(event.EndTime),
				completeTime,
				completedFactions: Array.isArray(event.CompletedFactions) ? event.CompletedFactions : [],
				progress: event.Progress ?? [],
				rewards: event.Rewards ?? [],
				rewardBuff: event.RewardBuff ?? '',
				rewardBuffAmount: event.RewardBuffAmount ?? 0,
				rewardBuffHours: event.RewardBuffHours ?? 0,
				rewardMultiplier: event.RewardMultiplier ?? 0,
				durationModifier: event.DurationModifier ?? 0,
				originalDurationSeconds: event.OriginalDurationSeconds ?? 0,
				eventType: event.EventType ?? '',
				allianceId: event.AllianceId ?? 0,
				submitterId,
			});
		}

		if (transformedEvents.length > 0) {
			await db
				.insert(schema.worldEvent)
				.values(transformedEvents)
				.onDuplicateKeyUpdate({
					set: {
						updatedAt: sql`(utc_timestamp())`,
						startTime: sql`VALUES(start_time)`,
						completeTime: sql`VALUES(complete_time)`,
						completedFactions: sql`VALUES(completed_factions)`,
						progress: sql`VALUES(progress)`,
						rewardBuff: sql`VALUES(reward_buff)`,
						rewardBuffAmount: sql`VALUES(reward_buff_amount)`,
						rewardBuffHours: sql`VALUES(reward_buff_hours)`,
						rewardMultiplier: sql`VALUES(reward_multiplier)`,
						durationModifier: sql`VALUES(duration_modifier)`,
						originalDurationSeconds: sql`VALUES(original_duration_seconds)`,
					},
				});
			console.log(`worldEvent: inserted/updated ${transformedEvents.length} rows`);
		}
	}

	return json({ success: true });
};
