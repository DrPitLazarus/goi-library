import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { db, query } from "$lib/server/db";
import { territoryState } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import isEqual from "lodash/isEqual";

type TerritoryState = {
    submissionId: number,
    factionId: number,
    allianceId: number,
    territoryId: number,
}

export const GET: RequestHandler = async () => {
    const lastSubmissionId = (await query.getTerritoryStateLastSubmissionId())
    .results[0].submissionId;
    const lastStates = await query.getTerritoryStates(lastSubmissionId)
    return json(lastStates);
};

export const POST: RequestHandler = async ({ request }) => {
    const rawString = await request.text();
    const regex = /(?<factionId>\d+)\((?<allianceId>\d+);(?<territoryIds>\[.*?\]);(?<idk>\[.*?\])/gm;
    const matches: any = [...rawString.matchAll(regex)];
    if (matches.length === 0) {
        return json({ success: false, message: 'Invalid data.' })
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

    const lastSubmissionId = (await query.getTerritoryStateLastSubmissionId())
        .results[0].submissionId;
    const lastStates = (await query.getTerritoryStates(lastSubmissionId))
        .results
        .map(territory => {
            const { territoryId, factionId, allianceId } = territory;
            return {
                // submissionId is set to -1 for the isEqual check.
                submissionId: -1, territoryId, factionId, allianceId,
            };
        });
    if (isEqual(transformedJson, lastStates)) {
        return json({ success: true, message: "Current. Database not updated." });
    }
    // Add the submission ID to the input data.
    transformedJson = transformedJson.map((territory) => ({
        ...territory,
        submissionId: lastSubmissionId + 1,
    }));
    await db.insert(territoryState).values(transformedJson)
        .onDuplicateKeyUpdate({
            set: {
                ...transformedJson,
                updatedAt: sql`(utc_timestamp())`,
            }
        });
    return json({ success: true });
};