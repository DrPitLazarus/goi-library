import { query } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
    const lastSubmissionId = (await query.getFactionLeaderLastSubmissionId())
        .results[0].submissionId;
    const leaders = await query.getFactionLeaders(lastSubmissionId);

    return {
        leaders,
    };
}) satisfies PageServerLoad;