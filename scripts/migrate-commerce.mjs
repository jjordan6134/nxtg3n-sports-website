import postgres from "postgres";
import { readFile } from "node:fs/promises";
if (process.env.COMMERCE_MIGRATION_REVIEWED !== "true") throw new Error("Review migrations/003_commerce.sql, then set COMMERCE_MIGRATION_REVIEWED=true");
const url = process.env.NXTG3N_DATABASE_URL || process.env.DATABASE_URL;
if (!url) throw new Error("Database URL required");
const sql = postgres(url, { ssl: "require", max: 1 });
try { await sql.unsafe(await readFile(new URL("../migrations/003_commerce.sql", import.meta.url), "utf8")); console.log("Commerce schema ready. Products remain inactive until configured privately."); }
catch { console.error("Commerce migration failed; inspect database privately."); process.exitCode = 1; }
finally { await sql.end(); }
