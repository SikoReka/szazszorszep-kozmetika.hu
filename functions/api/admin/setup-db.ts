// functions/api/admin/setup-db.ts
// Kényelmi végpont: inicializálja a D1 adatbázis tábláit, ha még nem léteznének

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

  try {
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          picture TEXT,
          stamps INTEGER DEFAULT 0,
          total_stamps INTEGER DEFAULT 0,
          rewards_redeemed INTEGER DEFAULT 0,
          qr_token TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS stamps_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          admin_name TEXT DEFAULT 'Réka',
          action TEXT NOT NULL,
          previous_stamps INTEGER NOT NULL,
          new_stamps INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_qr_token ON users(qr_token);
    `);

    return new Response(
      JSON.stringify({ success: true, message: 'D1 Táblák sikeresen létrehozva / ellenőrizve!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a táblák létrehozásakor', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
