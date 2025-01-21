import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { player } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    return json("Hi");
};

export const POST: RequestHandler = async ({ request }) => {
    const newJson: any = await request.json();
    console.log(`${newJson.ClanName} ${newJson.Id} ${newJson.Name}`)
    const mappedJson = {
        id: newJson.Id,
        name: newJson.Name,
        lastOnline: new Date(newJson.LastOnline),
        lastKnownClass: newJson.LastKnownClass,
        clanRole: newJson.ClanRole,
        isCa: newJson.IsCA,
        profilePicture: newJson.ProfilePicture,
        clanId: newJson.ClanId,
        titleId: newJson.TitleId,
        title: newJson.Title,
        description: newJson.Description,
        joinDate: new Date(newJson.JoinDate),
        skirmishMatches: newJson.SkirmishMatches,
        allianceMatches: newJson.AllianceMatches,
        matchCompletionRate: newJson.MatchCompletionRate,
        factionId: newJson.FactionId,
        ranks: newJson.Ranks,
        playedTime: newJson.PlayedTime,
        badges: newJson.Badges,
        achievements: newJson.Achievements,
        appearance: newJson.Appearance,
    };
    await db.insert(player).values(mappedJson)
        .onDuplicateKeyUpdate({
            set: {
                ...mappedJson,
                updatedAt: sql`(utc_timestamp())`,
            }
        });
    return json({ success: true });
};