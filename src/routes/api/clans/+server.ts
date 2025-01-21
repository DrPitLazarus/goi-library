import { json } from "@sveltejs/kit";
import { db, getClanList } from "$lib/server/db";
import { clan } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const results = await getClanList(page);
    return json(results);
};

export const POST: RequestHandler = async ({ request }) => {
    console.log("POST Request recieved!");
    let newJson: any = await request.json();
    let mappedJson = {
        id: newJson.Id,
        name: newJson.Name,
        tag: newJson.Tag,
        quote: newJson.Quote,
        message1: newJson.Message1,
        message2: newJson.Message2,
        message3: newJson.Message3,
        xp: newJson.XP,
        commendations: newJson.Commendations,
        memberCount: newJson.MemberCount
    };
    await db.insert(clan).values(mappedJson)
        .onDuplicateKeyUpdate({
            set: {
                ...mappedJson,
                updatedAt: sql`(utc_timestamp())`,
            }
        });
    return json({ success: true });
};