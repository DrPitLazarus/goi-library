import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { db, query } from "$lib/server/db";
import { territoryConflict, territoryState } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import isEqual from "lodash/isEqual";

export const GET: RequestHandler = async ({ url }) => {
    return json("Hi");
};

export const POST: RequestHandler = async ({ request }) => {
    const rawJson = await request.json();

    let transformedConflicts: any = [];

    for (const conflict of rawJson) {
        const territoryId = conflict.LocationId;
        for (const [index, side] of [conflict.Attacker, conflict.Defender].entries()) {
            transformedConflicts.push({
                territoryId,
                factionId: side.FactionId,
                isDefender: index === 1,
                efforts: side.Efforts,
                goal: side.Goal,
                additionalGoal: side.AdditionalGoal,
                wall: side.Wall,
                leadersDeployedCount: side.LeaderVoteLevel,
            });
        }
    }

    const lastSubmissionId = (await query.getTerritoryConflictLastSubmissionId())
        .results[0].submissionId;
    const lastConflicts = (await query.getTerritoryConflicts(lastSubmissionId))
        .results
        .map(conflict => {
            const {
                territoryId,
                factionId,
                isDefender,
                efforts,
                goal,
                additionalGoal,
                wall,
                leadersDeployedCount,
            } = conflict;
            return {
                territoryId,
                factionId,
                isDefender,
                efforts,
                goal,
                additionalGoal,
                wall,
                leadersDeployedCount,
            };
        });
    if (isEqual(transformedConflicts, lastConflicts)) {
        return json({ success: true, message: "Current. Database not updated." });
    }
    // Add the submission ID to the input data.
    transformedConflicts = transformedConflicts.map((conflict: any) => ({
        ...conflict,
        submissionId: lastSubmissionId + 1,
    }));
    await db.insert(territoryConflict).values(transformedConflicts)
        .onDuplicateKeyUpdate({
            set: {
                ...transformedConflicts,
                updatedAt: sql`(utc_timestamp())`,
            }
        });
    return json({ success: true });
};