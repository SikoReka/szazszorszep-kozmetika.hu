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

  try {
    await env.DB.exec(`
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

    // Migráció: phone és pin oszlopok hozzáadása, ha még nem léteznek
    try {
      await env.DB.exec(`ALTER TABLE users ADD COLUMN phone TEXT;`);
    } catch (e) {
      // Oszlop már létezik
    }

    try {
      await env.DB.exec(`ALTER TABLE users ADD COLUMN pin TEXT;`);
    } catch (e) {
      // Oszlop már létezik
    }

    try {
      await env.DB.exec(`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);`);
    } catch (e) {
      // Index már létezik
    }

    return new Response(
      JSON.stringify({ success: true, message: 'D1 Táblák és migrációk (phone, pin) sikeresen lefutottak!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Adatbázis hiba', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
