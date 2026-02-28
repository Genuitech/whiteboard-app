import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  // Keep runtime explicit; app should fail fast if DB is not configured.
  console.warn("DATABASE_URL is not set. DB-backed routes will fail until configured.");
}

export const pool = new Pool({ connectionString });

export async function q<T = any>(text: string, params: any[] = []) {
  const res = await pool.query<T>(text, params);
  return res.rows;
}
