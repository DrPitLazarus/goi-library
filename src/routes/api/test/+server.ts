import type { RequestHandler } from './$types';
import type { MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { json } from "@sveltejs/kit";
import { db, getCachedRepository } from "$lib/server/db";
import { cachedRepositoryDifficultyLevelModifier, schema } from "$lib/server/schema";
import { sql } from "drizzle-orm";


// This is horrible. Atrocious even. >_<
export const GET: RequestHandler = async () => {
  let result = await getCachedRepository();
  let success = result.length > 0;
  if (!success) return json({ success, message: "No cached repository." });
  let repository: any = result[0].json;

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.FloatConstant", schema.cachedRepositoryFloatConstant,
    { key: sql`${schema.cachedRepositoryFloatConstant.key}` }, (key: Array<any>) => {
      let values = key.map((value) => ({ key: value.Key, value: value.Value }));
      return values;
    });

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.SystemConfiguration", schema.cachedRepositorySystemConfiguration,
    { key: sql`${schema.cachedRepositorySystemConfiguration.key}` }, (key: Array<any>) => {
      let values = key.map((value) => ({ key: value.Key, value: value.Value }));
      return values;
    });

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.Text", schema.cachedRepositoryText,
    { id: sql`${schema.cachedRepositoryText.id}` }, (key: Array<any>) => {
      let values = key.map((value) => ({ id: value.Id, key: value.Key, en: value.En }));
      return values;
    });

  await async function addSkillConfigRelatedToDatabase() {
    let keyName = "Muse.Goi2.Entity.SkillConfig";
    let success = Object.hasOwn(repository, keyName);
    if (!success) return json({ success, message: `No ${keyName}.` });
    // Collect data to move into their own tables from skill config.
    let toAddToText: Array<any> = [];
    let toAddToEffect: Array<any> = [];
    let toAddToSpecialAbility: Array<any> = [];
    let toAddToSpecialAbilityParam: Array<any> = [];
    let key = repository[keyName];
    key.forEach((row: any) => {
      toAddToText.push(row.NameText);
      toAddToText.push(row.DescriptionText);
      if (row.Effects) toAddToEffect.push(...row.Effects);
      if (row.SpecialAbility) toAddToSpecialAbility.push(row.SpecialAbility);
    });
    toAddToSpecialAbility.forEach(row => {
      let params = Object.entries(row.Params);
      let values = params.map((param) => ({ specialAbilityId: row.Id, key: param[0], value: param[1] }));
      toAddToSpecialAbilityParam.push(...values);
    });

    // Start inserting into db.
    toAddToText = toAddToText.map((value) => ({ id: value.Id, key: value.Key, en: value.En }));
    await db.insert(schema.cachedRepositoryText).values(toAddToText).onDuplicateKeyUpdate({ set: { id: sql`${schema.cachedRepositoryText.id}` } });

    toAddToSpecialAbility = toAddToSpecialAbility.map((value) => ({
      id: value.Id,
      activationId: value.ActivationId,
      className: value.ClassName,
      cooldownTime: value.CooldownTime,
      duration: value.Duration,
      shipwideDisplay: value.ShipwideDisplay,
    }));
    await db.insert(schema.cachedRepositorySpecialAbility).values(toAddToSpecialAbility).onDuplicateKeyUpdate({ set: { id: sql`${schema.cachedRepositorySpecialAbility.id}` } });
    await db.insert(schema.cachedRepositorySpecialAbilityParam).values(toAddToSpecialAbilityParam).onDuplicateKeyUpdate({ set: { id: sql`${schema.cachedRepositorySpecialAbilityParam.id}` } });

    toAddToEffect = toAddToEffect.map((value) => ({
      id: value.Id,
      activationId: value.ActivationId,
      unlockLevel: value.UnlockLevel,
      type: value.Type,
      duration: value.Duration,
      strength: value.Strength,
      scale: value.Scale
    }));
    await db.insert(schema.cachedRepositorySkillEffect).values(toAddToEffect).onDuplicateKeyUpdate({ set: { id: sql`${schema.cachedRepositorySkillEffect.id}` } });
  }();

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.SkillConfig", schema.cachedRepositorySkillConfig,
    { activationId: sql`${schema.cachedRepositorySkillConfig.activationId}` }, async (key: Array<any>) => {
      let values = key.map((value) => ({
        activationId: value.ActivationId,
        name: value.Name,
        nameTextId: value.NameText.Id,
        cooldownTime: value.CooldownTime,
        context: value.Context,
        range: value.Range,
        type: value.Type,
        descriptionTextId: value.DescriptionText.Id,
        public: value.Public,
        coopOnly: value.CoopOnly,
        defaultUnlocked: value.DefaultUnlocked,
        goldenAssetId: value.GoldenAssetId,
        specialAbilityId: value.SpecialAbility != null ? value.SpecialAbility.Id : null,
      }));
      return values;
    });

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.SkillEffectDescriptor", schema.cachedRepositorySkillEffectDescriptor,
    { id: sql`${schema.cachedRepositorySkillEffectDescriptor.id}` }, (key: Array<any>) => {
      let values = key.map((value) => ({
        id: value.Id,
        type: value.Type,
        context: value.Context,
        mixedFormatString: value.MixedFormatString,
        durationFormatString: value.DurationFormatString,
        strengthFormatString: value.StrengthFormatString,
      }));
      return values;
    });

  await addKeyToDatabase(repository, "Muse.Goi2.Entity.DifficultyLevel", schema.cachedRepositoryDifficultyLevel,
    { id: sql`${schema.cachedRepositoryDifficultyLevel.id}` }, async (key: Array<any>) => {
      let toAddToModifiers: Array<any> = [];
      let values = key.map((value) => {
        toAddToModifiers.push(...value.HumanTeamModifiers.map((modifier: any) => ({
          team: "Human",
          difficultyLevelId: value.Id,
          id: modifier.Id,
          affectsUnits: modifier.AffectsUnits,
          effect: modifier.Effect,
          strength: modifier.Strength,
        })));
        toAddToModifiers.push(...value.AITeamModifiers.map((modifier: any) => ({
          team: "AI",
          difficultyLevelId: value.Id,
          id: modifier.Id,
          affectsUnits: modifier.AffectsUnits,
          effect: modifier.Effect,
          strength: modifier.Strength,
        })));
        return {
          id: value.Id,
          name: value.Name,
          public: value.Public,
          levelLowerBound: value.LevelLowerBound,
          levelUpperBound: value.LevelUpperBound,
          worldScoreModifier: value.WorldScoreModifier,
          enemyBudgetScale: value.EnemyBudgetScale,
        };
      });

      await db.insert(cachedRepositoryDifficultyLevelModifier)
        .values(toAddToModifiers)
        .onDuplicateKeyUpdate({ set: { id: sql`${cachedRepositoryDifficultyLevelModifier.id}` } })

      return values;
    });



  success = true;
  return json({ success, message: `Added items.` });
}

async function addKeyToDatabase(repository: any, keyName: string, schemaTable: MySqlTableWithColumns<any>, duplicateObject: any, processFunction: Function) {
  let success = Object.hasOwn(repository, keyName);
  if (!success) return json({ success, message: `No ${keyName}.` });
  let key: Array<any> = repository[keyName];
  let values = await processFunction(key);
  await db.insert(schemaTable).values(values).onDuplicateKeyUpdate({ set: duplicateObject });
}