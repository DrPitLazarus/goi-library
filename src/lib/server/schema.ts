import { SQL, sql } from "drizzle-orm";
import { int, text, mysqlTable, json, timestamp, double, varchar, index, boolean, float, primaryKey, foreignKey } from "drizzle-orm/mysql-core";


export const timestampColumns = {
  createdAt: timestamp().notNull().default(sql`(utc_timestamp())`),
  updatedAt: timestamp().notNull().default(sql`(utc_timestamp())`),
}


export const cachedRepository = mysqlTable("cached_repository", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey().autoincrement(),
  json: json("json").default({}),
}, (table) => {
  return {
    createdAtIndex: index("created_at_index").on(table.createdAt)
  }
});

export const cachedRepositoryFloatConstant = mysqlTable("cached_repository_float_constant", {
  createdAt: timestampColumns.createdAt,
  key: varchar("key", { length: 255 }).primaryKey(),
  value: double("value").notNull(),
});

export const cachedRepositorySystemConfiguration = mysqlTable("cached_repository_system_configuration", {
  createdAt: timestampColumns.createdAt,
  key: varchar("key", { length: 255 }).primaryKey(),
  value: text("value").notNull(),
});

// Not very much in here, but noticed NameText, DescriptionText, TitleText, Description, 
// FullDescriptionText have the same 3 fields. Reminder: Going to dump those entries in here.
export const cachedRepositoryText = mysqlTable("cached_repository_text", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull(),
  en: text("en").notNull(),
});

export const cachedRepositorySkillConfig = mysqlTable("cached_repository_skill_config", {
  createdAt: timestampColumns.createdAt,
  activationId: int("activation_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameTextId: int("name_text_id").notNull(),
  cooldownTime: double("cooldown_time").notNull(),
  context: varchar("context", { length: 255 }).notNull(),
  range: varchar("range", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  descriptionTextId: int("description_text_id").notNull(),
  public: boolean("public").notNull(),
  coopOnly: boolean("coop_only").notNull(),
  defaultUnlocked: boolean("default_unlocked").notNull(),
  goldenAssetId: int("golden_asset_id").notNull(),
  specialAbilityId: int("special_ability_id"),
}
  // , (table => {
  //   return {
  //     nameTextFk: foreignKey({
  //       name: "skill_config_name_text_fk",
  //       columns: [table.nameText],
  //       foreignColumns: [cachedRepositoryText.id]
  //     }),
  //     descriptionTextFk: foreignKey({
  //       name: "skill_config_description_text_fk",
  //       columns: [table.descriptionText],
  //       foreignColumns: [cachedRepositoryText.id]
  //     }),
  //     specialAbilityFk: foreignKey({
  //       name: "skill_config_special_ability_fk",
  //       columns: [table.specialAbility],
  //       foreignColumns: [cachedRepositorySpecialAbility.id]
  //     }),
  //   }
  // })
);
export type SkillConfig = typeof cachedRepositorySkillConfig.$inferSelect;

// Made Effects its own table. Created because of skillConfig table.
export const cachedRepositorySkillEffect = mysqlTable("cached_repository_skill_effect", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
  activationId: int("activation_id").notNull(),
  unlockLevel: int("unlock_level").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  duration: double("duration").notNull(),
  strength: double("strength").notNull(),
  scale: double("scale").notNull(),
}
  // , table => {
  //   return {
  //     activationIdFk: foreignKey({
  //       name: "skill_effect_activation_id_fk",
  //       columns: [table.activationId],
  //       foreignColumns: [cachedRepositorySkillConfig.activationId]
  //     }),
  //   }
  // }
);

export const cachedRepositorySkillEffectDescriptor = mysqlTable("cached_repository_skill_effect_descriptor", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
  type: varchar("type", { length: 255 }).notNull(),
  context: text("context").notNull(),
  mixedFormatString: text("mixed_format_string").notNull(),
  durationFormatString: text("duration_format_string").notNull(),
  strengthFormatString: text("strength_format_string").notNull(),
});

export const cachedRepositorySpecialAbility = mysqlTable("cached_repository_special_ability", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
  activationId: int("activation_id").notNull(),
  className: varchar("class_name", { length: 255 }).notNull(),
  cooldownTime: int("cooldown_time").notNull(),
  duration: int("duration").notNull(),
  shipwideDisplay: boolean("shipwide_display").notNull(),
}
  // , table => {
  // return {
  //   activationIdFk: foreignKey({
  //     name: "special_ability_activation_id_fk",
  //     columns: [table.activationId],
  //     foreignColumns: [cachedRepositorySkillConfig.activationId]
  //   }),
  // }
  // }
);

// Reminder: Convert the object to an array!
export const cachedRepositorySpecialAbilityParam = mysqlTable("cached_repository_special_ability_param", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey().autoincrement(),
  specialAbilityId: int("special_ability_id").notNull(),
  key: varchar("key", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
}
  // , table => {
  //   return {
  //     specialAbilityIdFk: foreignKey({
  //       name: "special_ability_param_special_ability_id_fk",
  //       columns: [table.specialAbilityId],
  //       foreignColumns: [cachedRepositorySpecialAbility.id]
  //     }),
  //   }
  // }
);

export const cachedRepositoryItem = mysqlTable("cached_repository_item", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
});

export const cachedRepositoryDifficultyLevel = mysqlTable("cached_repository_difficulty_level", {
  createdAt: timestampColumns.createdAt,
  id: int("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  public: boolean("public").notNull(),
  levelLowerBound: int("level_lower_bound").notNull(),
  levelUpperBound: int("level_upper_bound").notNull(),
  worldScoreModifier: double("world_score_modifier").notNull(),
  enemyBudgetScale: double("enemy_budge_scale").notNull(),
});

export const cachedRepositoryDifficultyLevelModifier = mysqlTable("cached_repository_difficulty_level_modifier", {
  createdAt: timestampColumns.createdAt,
  difficultyLevelId: int("difficulty_level_id").notNull(),
  id: int("id").primaryKey(),
  team: varchar("team", { length: 25 }).notNull(),
  affectsUnits: varchar("affects_units", { length: 255 }).notNull(),
  effect: varchar("effect", { length: 255 }).notNull(),
  strength: double("strength").notNull(),
});



export const clan = mysqlTable("clan", {
  ...timestampColumns,
  id: int("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  tag: varchar("tag", { length: 4 }).notNull(),
  quote: text("quote"),
  message1: text("message1"),
  message2: text("message2"),
  message3: text("message3"),
  xp: int("xp").notNull(),
  commendations: int("commendations").notNull(),
  memberCount: int("member_count").notNull(),
  submitterId: int(),
});

export const player = mysqlTable("player", {
  ...timestampColumns,
  id: int("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  lastOnline: timestamp('last_online').notNull(),
  lastKnownClass: int('last_known_class').notNull(),
  clanRole: int('clan_role').notNull(),
  profilePicture: int('profile_picture').notNull(),
  clanId: int('clan_id').notNull(),
  titleId: int('title_id').notNull(),
  title: varchar('title', { length: 32 }).notNull(),
  description: varchar('description', { length: 64 }),
  joinDate: timestamp('join_date').notNull(),
  skirmishMatches: int('skirmish_matches').notNull(),
  allianceMatches: int('alliance_matches').notNull(),
  matchCompletionRate: float('match_completion_rate').notNull(),
  factionId: int('faction_id').notNull(),
  ranks: json('ranks').notNull(),
  ranksTotal: int('ranks_total').generatedAlwaysAs(
    (): SQL => sql`${player.ranks}->>'$.Pilot' + ${player.ranks}->>'$.Gunner' + ${player.ranks}->>'$.Engineer'`,
    { mode: 'stored' })
    .notNull(),
  playedTime: json('played_time').notNull(),
  playedTimeTotal: int('played_time_total')
    .generatedAlwaysAs(
      (): SQL => sql`${player.playedTime}->>'$.Pilot' + ${player.playedTime}->>'$.Gunner' + ${player.playedTime}->>'$.Engineer'`,
      { mode: 'stored' })
    .notNull(),
  badges: json('badges').notNull(),
  achievements: json('achievements').notNull(),
  appearance: json('appearance').notNull(),
  submitterId: int(),
},
  (table) => {
    return {
      nameIndex: index('nameIndex').on(table.name),
      clanIndex: index('clanIndex').on(table.clanId),
      // lastOnlineIndex: index('lastOnlineIndex').on(table.lastOnline),
      // ranksTotalIndex: index('ranksTotalIndex').on(table.ranksTotal),
      // playedTimeTotalIndex: index('playedTimeTotalIndex').on(table.playedTimeTotal),
      // CREATE INDEX playedTimeTotalIndex ON player (played_time_total DESC);
      // CREATE INDEX ranksTotalIndex ON player (ranks_total DESC);
      // CREATE INDEX lastOnlineIndex ON player (last_online DESC);
    };
  }
);

export const factionLeader = mysqlTable("faction_leader", {
  ...timestampColumns,
  id: int("id").primaryKey().autoincrement(),
  submissionId: int("submission_id").notNull(),
  factionId: int("faction_id").notNull(),
  rank: int("rank").notNull(),
  userId: int("user_id").notNull(),
  userName: varchar("user_name", { length: 32 }).notNull(),
  efforts: int("efforts").notNull(),
  submitterId: int(),
},
  (table) => {
    return {
      // submissionIdIndex: index('submissionIdIndex').on(table.submissionId),
      // CREATE INDEX submissionIdIndex ON faction_leader (submission_id DESC)
    };
  }
);

export const territoryState = mysqlTable("territory_state", {
  ...timestampColumns,
  id: int().primaryKey().autoincrement(),
  submissionId: int().notNull(),
  territoryId: int().notNull(),
  factionId: int().notNull(),
  allianceId: int().notNull(),
  submitterId: int(),
});

export const territoryConflict = mysqlTable("territory_conflict", {
  ...timestampColumns,
  id: int().primaryKey().autoincrement(),
  submissionId: int().notNull(),
  territoryId: int().notNull(),
  factionId: int().notNull(),
  isDefender: boolean().notNull(),
  efforts: int().notNull(),
  goal: int().notNull(),
  additionalGoal: int().notNull(),
  wall: int().notNull(),
  leadersDeployedCount: int().notNull(),
  submitterId: int(),
});

export const territoryConflictModifier = mysqlTable("territory_conflict_modifier", {
  ...timestampColumns,
  id: int().primaryKey().autoincrement(),
  modifier: varchar({ length: 64 }).notNull(),
  amount: float().notNull(),
  additionalInfo: varchar({ length: 64 }),
  submitterId: int(),
});

export const territoryConflictModifierPair = mysqlTable("territory_conflict_modifier_pair", {
  conflictId: int(),
  modifierId: int(),
}, table => [
  primaryKey({ columns: [table.conflictId, table.modifierId] }),
  foreignKey({ columns: [table.conflictId], foreignColumns: [territoryConflict.id], name: "conflict_id_fk" }),
  foreignKey({ columns: [table.modifierId], foreignColumns: [territoryConflictModifier.id], name: "conflict_modifier_id_fk" }),
]);

export const schema = {
  cachedRepository,
  cachedRepositoryFloatConstant,
  cachedRepositoryItem,
  cachedRepositorySkillConfig,
  cachedRepositorySkillEffect,
  cachedRepositorySkillEffectDescriptor,
  cachedRepositorySpecialAbility,
  cachedRepositorySpecialAbilityParam,
  cachedRepositorySystemConfiguration,
  cachedRepositoryText,
  cachedRepositoryDifficultyLevel,
  cachedRepositoryDifficultyLevelModifier,
  clan,
  player,
  factionLeader,
  territoryState,
  territoryConflict,
  territoryConflictModifier,
  territoryConflictModifierPair,
};