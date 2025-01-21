import { json } from "@sveltejs/kit";
import { getClan } from "$lib/server/db";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    const clanId = parseInt(params.id);
    if (isNaN(clanId)) return json({ success: false, message: "Not a number!" });
    
    const results = await getClan(clanId);
    return json(results);
};