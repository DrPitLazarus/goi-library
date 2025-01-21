import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./src/lib/server/schema.ts",
  out: "./drizzle",
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DB_URL as string,
  }
});