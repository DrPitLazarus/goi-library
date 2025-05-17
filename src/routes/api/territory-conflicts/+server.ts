import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { db, query } from "$lib/server/db";
import { territoryConflict, territoryConflictModifier, territoryConflictModifierPair } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import isEqual from "lodash/isEqual";
import pullAllWith from "lodash/pullAllWith";
import uniqWith from "lodash/uniqWith";

export const GET: RequestHandler = async () => {
    const lastSubmissionId = (await query.getTerritoryConflictLastSubmissionId())
        .results[0].submissionId;
    const lastConflicts = (await query.getTerritoryConflicts(lastSubmissionId))
    return json(lastConflicts);
};

export const POST: RequestHandler = async ({ request }) => {
    const rawJson = await request.json();

    let submitterId = rawJson.submitterId ?? -1;
    let newConflictModifiers: any[] = [];
    let transformedConflicts: any[] = [];
    let conflictModifierPairs: { index: number, modifiers: { modifier: string, amount: number, additionalInfo: string | null }[] }[] = [];

    // Transform conflicts to desired structure and collect modifiers.
    let conflictEntryCount = 0;
    for (const conflict of rawJson.data) {
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
            if (side.Modifiers.length) {
                // console.log(side.Modifiers);
                newConflictModifiers = newConflictModifiers.concat(side.Modifiers.map(transformModifiersFunction));
                conflictModifierPairs.push({ index: conflictEntryCount, modifiers: side.Modifiers.map(transformModifiersFunction) });
            }
            conflictEntryCount++;
        }
    }

    // MODIFIERS
    // Transform key names and format amount to 2 decimal places.
    function transformModifiersFunction(modifier: any) {
        return {
            modifier: modifier.Modifier,
            amount: Number(Number(modifier.Amount).toFixed(2)),
            additionalInfo: modifier.AdditionalInfo,
        };
    }
    // Remove duplicate modifiers.
    newConflictModifiers = uniqWith(newConflictModifiers, isEqual);
    // console.log("foundConflictModifiers: ", newConflictModifiers);
    // Transform results for comparison.
    const modifiersComparisionFunction = (item: any) => {
        const { modifier, amount, additionalInfo } = item;
        return { modifier, amount, additionalInfo };
    };
    let dbConflictModifiers = (await query.getTerritoryConflictModifiers()).results;
    // Remove existing modifiers.
    let modifiersNotInTable = pullAllWith(newConflictModifiers, dbConflictModifiers.map(modifiersComparisionFunction), isEqual);
    // console.log("modifiersNotInTable: ", modifiersNotInTable);
    // Add submitter ID.
    modifiersNotInTable = modifiersNotInTable.map(modifier => ({
        ...modifier,
        submitterId,
    }));
    // Upload new conflict modifiers and get new, if any.
    if (newConflictModifiers.length > 0) {
        await db.insert(territoryConflictModifier).values(modifiersNotInTable).onDuplicateKeyUpdate({
            // Do nothing and set to itself.
            set: { modifier: sql`${territoryConflictModifier.modifier}` }
        });
        dbConflictModifiers = (await query.getTerritoryConflictModifiers()).results
    }

    // CONFLICTS
    // Get the last conflict submission to compare to.
    const lastSubmissionId = (await query.getTerritoryConflictLastSubmissionId())
        .results[0].submissionId;
    const lastConflicts = (await query.getTerritoryConflicts(lastSubmissionId))
        .results
        // Return certain keys.
        .map(conflict => {
            const { territoryId, factionId, isDefender, efforts, goal, additionalGoal, wall, leadersDeployedCount, } = conflict;
            return { territoryId, factionId, isDefender, efforts, goal, additionalGoal, wall, leadersDeployedCount, };
        });
    if (isEqual(transformedConflicts, lastConflicts)) {
        return json({ success: true, message: "Current. Database not updated." });
    }
    // Add the submission ID and submitter ID to the input data.
    transformedConflicts = transformedConflicts.map((conflict: any) => ({
        ...conflict,
        submissionId: lastSubmissionId + 1,
        submitterId,
    }));
    // Insert transformed conflicts and get the IDs of the inserted rows.
    let returnedIds = await db.insert(territoryConflict).values(transformedConflicts)
        .onDuplicateKeyUpdate({ set: { id: sql`${territoryConflict.id}` } })
        .$returningId();
    // console.log("returnedIds: ", returnedIds);
    // console.log("conflictModifierPairs: ", conflictModifierPairs);

    // MODIFIERS
    // Transform index to conflictIDs to assign conflict modifier pairs and insert.
    if (conflictModifierPairs.length) {
        let tranformedConflictModifierPairs = [];
        for (const conflictModifierPair of conflictModifierPairs) {
            for (const modifier of conflictModifierPair.modifiers) {
                let modifierId = dbConflictModifiers.find(item =>
                    item.modifier === modifier.modifier &&
                    item.amount === modifier.amount &&
                    item.additionalInfo === modifier.additionalInfo)?.id;
                if (modifierId) {
                    let returnedId = returnedIds[conflictModifierPair.index].id;
                    tranformedConflictModifierPairs.push({ conflictId: returnedId, modifierId });
                }
            }
        }
        // console.log("tranformedConflictModifierPairs: ", tranformedConflictModifierPairs);
        await db.insert(territoryConflictModifierPair).values(tranformedConflictModifierPairs)
            .onDuplicateKeyUpdate({ set: { conflictId: sql`${territoryConflictModifierPair.conflictId}` } });
    }
    return json({ success: true });
};