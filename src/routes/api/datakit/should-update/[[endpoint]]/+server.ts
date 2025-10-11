import { db } from '$lib/server/db';
import { schema } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.endpoint) {
		return json(null);
	}
	if (params.endpoint === 'cached-repository') {
		const dbQuery = await db
			.select({ createdAt: schema.cachedRepository.createdAt })
			.from(schema.cachedRepository)
			.orderBy(desc(schema.cachedRepository.id))
			.limit(1);
		if (dbQuery.length === 0) {
			return json(true);
		}
		const lastCreatedAt = dbQuery[0].createdAt;
		const cooldown = 12 * 60 * 60 * 1000; // 12 hours.
		const isOffCooldown = Date.now() - lastCreatedAt.getTime() >= cooldown;
		return json(isOffCooldown);
	}
	if (params.endpoint === 'territory-states') {
		const dbQuery = await db
			.select({ createdAt: schema.territoryState.createdAt })
			.from(schema.territoryState)
			.orderBy(desc(schema.territoryState.id))
			.limit(1);
		if (dbQuery.length === 0) {
			return json(true);
		}
		const lastCreatedAt = dbQuery[0].createdAt;
		const cooldown = 60 * 1000; // 1 minute.
		const isOffCooldown = Date.now() - lastCreatedAt.getTime() >= cooldown;
		return json(isOffCooldown);
	}
	if (params.endpoint === 'territory-conflicts') {
		const dbQuery = await db
			.select({ createdAt: schema.territoryConflict.createdAt })
			.from(schema.territoryConflict)
			.orderBy(desc(schema.territoryConflict.id))
			.limit(1);
		if (dbQuery.length === 0) {
			return json(true);
		}
		const lastCreatedAt = dbQuery[0].createdAt;
		const cooldown = 60 * 1000; // 1 minute.
		const isOffCooldown = Date.now() - lastCreatedAt.getTime() >= cooldown;
		return json(isOffCooldown);
	}
	return json(false);
};
