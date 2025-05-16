import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    let submissionId = -1;
    let isHistoricSubmissionId = false;
    // Check for param.id and make sure it's a number.
    if (params?.id) {
        const isOnlyNumbers = /^[0-9]+$/.test(params.id);
        if (!isOnlyNumbers) {
            return error(404, "Bad parameter.");
        }
        submissionId = parseInt(params.id);
    }
    const lastSubmissionId = (await query.getTerritoryConflictLastSubmissionId())
        .results[0].submissionId;
    // Use the latest submissionId if not specified.
    if (submissionId === -1) {
        submissionId = lastSubmissionId;
    }
    // If not the latest submissionId, flag that it is historic.
    else {
        isHistoricSubmissionId = submissionId < lastSubmissionId;
    }
    const conflicts = await query.getTerritoryConflicts(submissionId);
    // Check if there are results.
    if (conflicts.results.length === 0) {
        error(404, "Not found.");
    }

    const worldLocations: any = (await query.getEntityWorldLocations()).results[0].json;
    // console.log(worldLocations);

    return {
        conflicts,
        isHistoricSubmissionId,
        submissionId,
        worldLocations,
    };
}) satisfies PageServerLoad;