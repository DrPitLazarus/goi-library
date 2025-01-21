import type { RequestHandler } from './$types';
import { json } from "@sveltejs/kit";
import { db, getCachedRepository } from "$lib/server/db";
import { cachedRepository } from "$lib/server/schema";
import { sql } from "drizzle-orm";
import isEqual from "lodash/isEqual";


export const GET: RequestHandler = async () => {
  const result = await getCachedRepository();
  const success = result.length > 0;
  return json({ success, results: result });
}

export const POST: RequestHandler = async ({ request }) => {
  let newJson: any = await request.json();
  const currentJson: Array<any> = await getCachedRepository();
  const currentJsonExists = currentJson.length > 0;
  delete newJson["Muse.Goi2.Entity.BadWord"]; // Don't want this ;D
  const expectedKeys = [
    "Muse.Goi2.Entity.FloatConstant",
    "Muse.Goi2.Entity.SystemConfiguration",
    "Muse.Goi2.Entity.Text",
    "Muse.Goi2.Entity.SkillConfig",
    "Muse.Goi2.Entity.Region",
    "Muse.Goi2.Entity.MapGroup",
    "Muse.Goi2.Entity.Item",
    "Muse.Goi2.Entity.ShipModel",
    "Muse.Goi2.Entity.Quest",
    "Muse.Goi2.Entity.AvatarClassSetting",
    "Muse.Goi2.Entity.Reward",
    "Muse.Goi2.Entity.SkillEffectDescriptor",
    "Muse.Goi2.Entity.FactionBase",
    "Muse.Goi2.Entity.WorldLocation",
    "Muse.Goi2.Entity.DifficultyLevel",
    "Muse.Goi2.Entity.ClanLevel",
    "Muse.Goi2.Entity.WorldItem"
  ];
  if (!expectedKeys.every(value => Object.keys(newJson).includes(value))) {
    return json({ success: false, message: "Error. Missing expected keys." });
  }
  if (currentJsonExists && isEqual(newJson, currentJson[0].json)) {
    return json({ success: false, message: "Current. Database not updated." });
  }
  await db.insert(cachedRepository).values({ json: newJson });
  await db.execute(sql`optimize table 'cached_repository'`);
  return json({ success: true, message: "Outdated. Database updated." });
}
