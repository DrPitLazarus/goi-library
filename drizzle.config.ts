import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL_DEV) throw new Error('DB_URL_DEV is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'mysql',
	dbCredentials: { url: process.env.DB_URL_DEV },
	verbose: true,
	strict: true,
	casing: 'snake_case',
});
