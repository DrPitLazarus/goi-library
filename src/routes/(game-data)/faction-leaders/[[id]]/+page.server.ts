import type { PageServerLoad } from './$types';
import { getFactionLeaderSubmissions, query } from '$lib/server/db';
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
    const lastSubmissionId = (await query.getFactionLeaderLastSubmissionId())
        .results[0].submissionId;
    // Use the latest submissionId if not specified.
    if (submissionId === -1) {
        submissionId = lastSubmissionId;
    }
    // If not the latest submissionId, flag that it is historic.
    else {
        isHistoricSubmissionId = submissionId < lastSubmissionId;
    }
    const leaders = await query.getFactionLeaders(submissionId);
    // Check if there are results.
    if (leaders.results.length === 0) {
        error(404, "Not found.");
    }

    const pastLeaderLists = await getFactionLeaderSubmissions();

    return {
        leaders,
        isHistoricSubmissionId,
        pastLeaderLists,
    };
}) satisfies PageServerLoad;