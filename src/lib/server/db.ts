import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { DB_URL_PROD, DB_URL_DEV } from '$env/static/private';
import { clan, factionLeader, player, schema } from "./schema";
import { asc, count, desc, eq, or, inArray, like, sum, sql } from "drizzle-orm";
import { alias, MySqlColumn } from "drizzle-orm/mysql-core";
import { building, dev } from "$app/environment";

let drizzleDb: MySql2Database | null = null;
// if (!building) {
let connection = mysql.createPool(dev ? DB_URL_DEV : DB_URL_PROD);
drizzleDb = drizzle({ client: connection, casing: 'snake_case' });
// }
export const db = drizzleDb;

export const getCachedRepository = async () => {
    const result = await db?.select().from(schema.cachedRepository)
        .orderBy(desc(schema.cachedRepository.createdAt))
        .limit(1);
    return result;
}

export const getSkillConfig = async () => {
    const skillConfig = schema.cachedRepositorySkillConfig;
    const text = schema.cachedRepositoryText;
    const text2 = alias(text, "text2");
    const result = await db?.select({
        activationId: skillConfig.activationId,
        name: skillConfig.name,
        cooldownTime: skillConfig.cooldownTime,
        context: skillConfig.context,
        range: skillConfig.range,
        type: skillConfig.type,
        public: skillConfig.public,
        coopOnly: skillConfig.coopOnly,
        defaultUnlocked: skillConfig.defaultUnlocked,
        goldenAssetId: skillConfig.goldenAssetId,
        specialAbilityId: skillConfig.specialAbilityId,
        nameEn: text.en,
        descriptionEn: text2.en,
    })
        .from(skillConfig)
        .innerJoin(text, eq(skillConfig.nameTextId, text.id))
        .innerJoin(text2, eq(skillConfig.descriptionTextId, text2.id));
    return result;
}

export const getEffects = async (activationIdArray: Array<number>) => {
    const skillEffect = schema.cachedRepositorySkillEffect;
    const result = await db?.select({
        activationId: skillEffect.activationId,
        unlockLevel: skillEffect.unlockLevel,
        type: skillEffect.type,
        duration: skillEffect.duration,
        strength: skillEffect.strength,
        scale: skillEffect.scale,
    })
        .from(skillEffect)
        .where(inArray(skillEffect.activationId, activationIdArray))
        .orderBy(asc(skillEffect.type));
    return result;
};

export const getSpecialAbilities = async (activationIdArray: Array<number>) => {
    const specialAbility = schema.cachedRepositorySpecialAbility;
    const result = await db?.select({
        id: specialAbility.id,
        activationId: specialAbility.activationId,
        className: specialAbility.className,
        cooldownTime: specialAbility.cooldownTime,
        duration: specialAbility.duration,
        shipwideDisplay: specialAbility.shipwideDisplay,
    })
        .from(specialAbility)
        .where(inArray(specialAbility.activationId, activationIdArray))
    return result;
};

export const getSpecialAbilitiesParams = async () => {
    const specialAbilityParam = schema.cachedRepositorySpecialAbilityParam;
    const result = await db?.select({
        specialAbilityId: specialAbilityParam.specialAbilityId,
        key: specialAbilityParam.key,
        value: specialAbilityParam.value,
    })
        .from(specialAbilityParam)
    return result;
};

export const getFloatConstants = async () => {
    const floatConstant = schema.cachedRepositoryFloatConstant;
    const result = await db?.select({
        key: floatConstant.key,
        value: floatConstant.value,
    })
        .from(floatConstant)
        .orderBy(asc(floatConstant.key))
    return result;
};

export const getSystemConfiguration = async () => {
    const systemConfiguration = schema.cachedRepositorySystemConfiguration;
    const result = await db?.select({
        key: systemConfiguration.key,
        value: systemConfiguration.value,
    })
        .from(systemConfiguration)
        .orderBy(asc(systemConfiguration.key))
    return result;
};

export const getText = async () => {
    const text = schema.cachedRepositoryText;
    const result = await db?.select({
        id: text.id,
        key: text.key,
        en: text.en,
    })
        .from(text)
    return result;
};

export const getDifficultyLevels = async () => {
    const level = schema.cachedRepositoryDifficultyLevel;
    const result = await db?.select({
        id: level.id,
        name: level.name,
        public: level.public,
        levelLowerBound: level.levelLowerBound,
        levelUpperBound: level.levelUpperBound,
        worldScoreModifier: level.worldScoreModifier,
        enemyBudgetScale: level.enemyBudgetScale,
    })
        .from(level)
        .orderBy(asc(level.worldScoreModifier))
    return result;
};

export const getDifficultyLevelsModifiers = async () => {
    const modifier = schema.cachedRepositoryDifficultyLevelModifier;
    const result = await db?.select({
        difficultyLevelId: modifier.difficultyLevelId,
        id: modifier.id,
        team: modifier.team,
        affectsUnits: modifier.affectsUnits,
        effect: modifier.effect,
        strength: modifier.strength,
    })
        .from(modifier)
        .orderBy(desc(modifier.team), asc(modifier.affectsUnits), asc(modifier.effect))
    return result;
};

export const getClanList = async (page: number, search: string = '', sort: string = "commendations-desc") => {
    console.time("getClanList");
    const itemsPerPage = 25;
    if (isNaN(page)) { return { success: false, message: "Not a number!" } }

    // Sort logic
    const sortColumns: { [key: string]: MySqlColumn } = {
        commendations: clan.commendations,
        members: clan.memberCount,
        id: clan.id,
        tag: clan.tag,
        name: clan.name,
    }
    const sortColumn = sortColumns[sort.replace("-desc", "")] ?? clan.commendations;
    const sortObject = sort.includes("-desc") ? desc(sortColumn) : asc(sortColumn);

    // Execute request
    const tableRowCount = (await db.select({ count: count() })
        .from(clan))[0].count;

    let itemsQuery = db.select({ count: count() })
        .from(clan)
        .$dynamic();
    if (search.length > 0) {
        itemsQuery = itemsQuery.where(or(like(clan.name, `%${search}%`), like(clan.tag, `%${search}%`)));
    }
    const items = (await itemsQuery)[0].count;
    const pages = Math.ceil(items / itemsPerPage);

    let query = db
        .select({
            id: clan.id,
            name: clan.name,
            tag: clan.tag,
            commendations: clan.commendations,
            memberCount: clan.memberCount,
        })
        .from(clan)
        // Sort by ID if main sort object has multiple same values to keep order consistant.
        .orderBy(sortObject, asc(clan.id))
        .limit(itemsPerPage)
        .offset(itemsPerPage * (page - 1))
        .$dynamic();
    if (search.length > 0) {
        query = query.where(or(like(clan.name, `%${search}%`), like(clan.tag, `%${search}%`)))
    }
    const results = await query;

    console.timeEnd("getClanList");
    return { success: true, tableRowCount, itemsPerPage, items, pages, results };
};

export const getClan = async (id: number) => {
    console.time("getClan");
    let results = await db
        .select({
            id: clan.id,
            name: clan.name,
            tag: clan.tag,
            commendations: clan.commendations,
            memberCount: clan.memberCount,
            quote: clan.quote,
            message1: clan.message1,
            message2: clan.message2,
            updatedAt: clan.updatedAt,
        })
        .from(clan)
        .where(eq(clan.id, id));
    console.timeEnd("getClan");
    return { success: true, results };
};

export const getPlayerList = async (page: number, search: string = '', sort: string = 'id') => {
    console.time("getPlayerList");
    const itemsPerPage = 25;

    // Sort logic. Key name here is shown in the url.
    const sortColumns: { [key: string]: MySqlColumn | any } = {
        id: player.id,
        name: player.name,
        lastOnline: player.lastOnline,
        totalPlayTime: player.playedTimeTotal,
        totalLevels: player.ranksTotal,
    }
    const sortColumn = sortColumns[sort.replace("-desc", "")] ?? sortColumns[0];
    const sortObject = sort.includes("-desc") ? desc(sortColumn) : asc(sortColumn);

    // Build queries
    const tableRowCountQuery = db.select({ count: count() })
        .from(player);

    let itemsQuery = db.select({ count: count() })
        .from(player)
        .$dynamic();
    if (search.length > 0) {
        itemsQuery = itemsQuery.where(like(player.name, `%${search}%`));
    }

    let query = db.select(
        {
            id: player.id,
            name: player.name,
            lastOnline: player.lastOnline,
            ranks: player.ranks,
            ranksTotal: player.ranksTotal,
            factionId: player.factionId,
            playedTimeTotal: player.playedTimeTotal,
            clanTag: clan.tag,
        }
    )
        .from(player)
        .leftJoin(clan, eq(player.clanId, clan.id))
        .orderBy(sortObject, asc(player.id))
        .limit(itemsPerPage)
        .offset(itemsPerPage * (page - 1))
        .$dynamic();
    if (search.length > 0) {
        query = query.where(like(player.name, `%${search}%`))
    }

    // Execute queries
    const tableRowCount = (await tableRowCountQuery)[0].count;
    const items = (await itemsQuery)[0].count;
    const results = await query;

    const pages = Math.ceil(items / itemsPerPage);

    console.timeEnd("getPlayerList");
    return { success: true, tableRowCount, itemsPerPage, items, pages, results };
};

// export const getPlayerList = async (page: number, search: string = '', sort: string = 'id') => {
//     console.time("getPlayerList");
//     const itemsPerPage = 25;

//     // Sort logic. Key name here is shown in the url.
//     const sortColumns: { [key: string]: MySqlColumn | any } = {
//         id: player.id,
//         name: player.name,
//         lastOnline: player.lastOnline,
//         totalPlayTime: player.playedTimeTotal,
//         totalLevels: player.ranksTotal,
//     }
//     const sortColumn = sortColumns[sort.replace("-desc", "")] ?? sortColumns[0];
//     const sortObject = sort.includes("-desc") ? desc(sortColumn) : asc(sortColumn);

//     // Build queries
//     const tableRowCountQuery = db.select({ count: count() })
//         .from(player);

//     let itemsQuery = db.select({ count: count() })
//         .from(player)
//         .$dynamic();
//     if (search.length > 0) {
//         itemsQuery = itemsQuery.where(like(player.name, `%${search}%`));
//     }

//     let query = db.select(
//         {
//             ...getTableColumns(player),
//             clanName: clan.name,
//             clanTag: clan.tag,
//         }
//     )
//         .from(player)
//         .leftJoin(clan, eq(player.clanId, clan.id))
//         .orderBy(sortObject, asc(player.id))
//         .limit(itemsPerPage)
//         .offset(itemsPerPage * (page - 1))
//         .$dynamic();
//     if (search.length > 0) {
//         query = query.where(like(player.name, `%${search}%`))
//     }

//     // Execute queries
//     const tableRowCount = (await tableRowCountQuery)[0].count;
//     const items = (await itemsQuery)[0].count;
//     const results = await query;

//     const pages = Math.ceil(items / itemsPerPage);

//     console.timeEnd("getPlayerList");
//     return { success: true, tableRowCount, itemsPerPage, items, pages, results };
// };

export const getPlayer = async (id: number) => {
    console.time("getPlayer");
    const results = await db.select({
        id: player.id,
        name: player.name,
        title: player.title,
        description: player.description,
        joinDate: player.joinDate,
        lastOnline: player.lastOnline,
        updatedAt: player.updatedAt,
        ranks: player.ranks,
        ranksTotal: player.ranksTotal,
        factionId: player.factionId,
        skirmishMatches: player.skirmishMatches,
        allianceMatches: player.allianceMatches,
        playedTime: player.playedTime,
        playedTimeTotal: player.playedTimeTotal,
        clanId: clan.id,
        clanName: clan.name,
        clanTag: clan.tag,
        clanRole: player.clanRole,
    })
        .from(player)
        .leftJoin(clan, eq(player.clanId, clan.id))
        .where(eq(player.id, id));
    console.timeEnd("getPlayer");
    return { success: true, results };
};

export const getClanMembers = async (id: number) => {
    console.time("getClanMembers");
    const results = await db.select({
        id: player.id,
        name: player.name,
        clanRole: player.clanRole,
        lastOnline: player.lastOnline,
    })
        .from(player)
        .where(eq(player.clanId, id))
        .orderBy(desc(player.lastOnline));
    console.timeEnd("getClanMembers");
    return { success: true, results };
};

export const getFactionLeaderLastSubmissionId = async () => {
    console.time("getFactionLeaderLastSubmissionId");
    const results = await db.select({
        submissionId: factionLeader.submissionId
    })
        .from(factionLeader)
        .orderBy(desc(factionLeader.submissionId))
        .limit(1);
    console.timeEnd("getFactionLeaderLastSubmissionId");
    if (results.length === 0) {
        results.push({ submissionId: 0 });
    }
    return { success: true, results };
};

export const getFactionLeaders = async (submissionId: number) => {
    console.time("getFactionLeaders");
    const results = await db.select()
        .from(factionLeader)
        .where(eq(factionLeader.submissionId, submissionId))
        .orderBy(asc(factionLeader.factionId), asc(factionLeader.rank))
    console.timeEnd("getFactionLeaders");
    return { success: true, results };
};

export const getFactionLeaderSubmissions = async () => {
    console.time("getFactionLeaderSubmissions");
    // Sum efforts for each faction per submissionId.
    const factionEfforts = db.select({
        submissionId: factionLeader.submissionId,
        factionEfforts: sum(factionLeader.efforts).mapWith(Number).as('faction_efforts'),
        factionId: factionLeader.factionId,
    })
        .from(factionLeader)
        .groupBy(factionLeader.submissionId, factionLeader.factionId)
        .orderBy(desc(sql<number>`faction_efforts`))
        .as('sq');
    // Sum efforts for each submissionId.
    const submissionEfforts = db.select({
        submissionId: factionEfforts.submissionId,
        totalEfforts: sum(factionEfforts.factionEfforts).mapWith(Number).as('total_efforts'),
    })
        .from(factionEfforts)
        .groupBy(factionEfforts.submissionId)
        .as('sq2');
    // Main query.
    let query = db.select({
        submissionId: factionLeader.submissionId,
        updatedAt: factionLeader.updatedAt,
        totalEfforts: submissionEfforts.totalEfforts,
        topFactionEffortsId: factionEfforts.factionId,
        topFactionEfforts: factionEfforts.factionEfforts,
    })
        .from(factionLeader)
        .leftJoin(factionEfforts, eq(factionLeader.submissionId, factionEfforts.submissionId))
        .leftJoin(submissionEfforts, eq(factionLeader.submissionId, submissionEfforts.submissionId))
        .groupBy(factionLeader.submissionId)
        .orderBy(desc(factionLeader.submissionId))
        .$dynamic();
    const results = await query;
    console.timeEnd("getFactionLeaderSubmissions");
    return { success: true, results };
}

export const getTerritoryStateLastSubmissionId = async () => {
    console.time("getTerritoryStateLastSubmissionId");
    const results = await db.select({
        submissionId: schema.territoryState.submissionId,
    })
        .from(schema.territoryState)
        .orderBy(desc(schema.territoryState.submissionId))
        .limit(1);
    console.timeEnd("getTerritoryStateLastSubmissionId");
    if (results.length === 0) {
        results.push({ submissionId: 0 });
    }
    return { success: true, results };
};

export const getTerritoryStates = async (submissionId: number) => {
    console.time("getTerritoryStates");
    const results = await db.select()
        .from(schema.territoryState)
        .where(eq(schema.territoryState.submissionId, submissionId))
        .orderBy(asc(schema.territoryState.factionId), asc(schema.territoryState.territoryId))
    console.timeEnd("getTerritoryStates");
    return { success: true, results };
};

export const getTerritoryConflictLastSubmissionId = async () => {
    console.time("getTerritoryConflictLastSubmissionId");
    const results = await db.select({
        submissionId: schema.territoryConflict.submissionId,
    })
        .from(schema.territoryConflict)
        .orderBy(desc(schema.territoryConflict.submissionId))
        .limit(1);
    console.timeEnd("getTerritoryConflictLastSubmissionId");
    if (results.length === 0) {
        results.push({ submissionId: 0 });
    }
    return { success: true, results };
};

export const getTerritoryConflicts = async (submissionId: number) => {
    console.time("getTerritoryConflicts");
    const results = await db.select()
        .from(schema.territoryConflict)
        .where(eq(schema.territoryConflict.submissionId, submissionId))
        // orderBy is important for the isEqual check.
        .orderBy(asc(schema.territoryConflict.territoryId), asc(schema.territoryConflict.isDefender));
    console.timeEnd("getTerritoryConflicts");
    return { success: true, results };
};


export const query = {
    getCachedRepository,
    getSkillConfig,
    getEffects,
    getSpecialAbilities,
    getSpecialAbilitiesParams,
    getFloatConstants,
    getSystemConfiguration,
    getText,
    getDifficultyLevels,
    getDifficultyLevelsModifiers,
    getClanList,
    getClan,
    getPlayerList,
    getClanMembers,
    getFactionLeaderLastSubmissionId,
    getFactionLeaders,
    getFactionLeaderSubmissions,
    getTerritoryStateLastSubmissionId,
    getTerritoryStates,
    getTerritoryConflictLastSubmissionId,
    getTerritoryConflicts,
};