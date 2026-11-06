// functions/api/admin/setup-db.ts
// Kényelmi végpont: inicializálja / frissíti a D1 adatbázis tábláit

interface Env {
  DB: D1Database;
  ADMIN_PIN?: string;
}

const DEFAULT_PIN = '2026';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const pin = request.headers.get('x-admin-pin');
  const validPin = env.ADMIN_PIN || DEFAULT_PIN;

  if (!pin || pin !== validPin) {
    return new Response(JSON.stringify({ error: 'Hibás admin PIN kód!' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const logs: string[] = [];

  // 1. users tábla létrehozása ha nem létezik
  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        pin TEXT,
        picture TEXT,
        stamps INTEGER DEFAULT 0,
        total_stamps INTEGER DEFAULT 0,
        rewards_redeemed INTEGER DEFAULT 0,
        qr_token TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    logs.push('users table ready');
  } catch (e: any) {
    logs.push(`users table error: ${e.message}`);
  }

  // 2. stamps_log tábla létrehozása ha nem létezik
  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS stamps_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        admin_name TEXT DEFAULT 'Réka',
        action TEXT NOT NULL,
        previous_stamps INTEGER NOT NULL,
        new_stamps INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    logs.push('stamps_log ready');
  } catch (e: any) {
    logs.push(`stamps_log error: ${e.message}`);
  }

  // 3. phone oszlop migráció
  try {
    await env.DB.prepare(`ALTER TABLE users ADD COLUMN phone TEXT`).run();
    logs.push('phone column added');
  } catch (e: any) {
    logs.push('phone column already exists or skipped');
  }

  // 4. pin oszlop migráció
  try {
    await env.DB.prepare(`ALTER TABLE users ADD COLUMN pin TEXT`).run();
    logs.push('pin column added');
  } catch (e: any) {
    logs.push('pin column already exists or skipped');
  }

  // 5. Indexek
  try {
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone)`).run();
    await env.DB.prepare(`CREATE INDEX IF NOT EXISTS idx_users_qr_token ON users(qr_token)`).run();
    logs.push('indexes ready');
  } catch (e: any) {
    logs.push(`index error: ${e.message}`);
  }

  return new Response(
    JSON.stringify({ success: true, message: 'D1 adatbázis sikeresen frissítve!', logs }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
