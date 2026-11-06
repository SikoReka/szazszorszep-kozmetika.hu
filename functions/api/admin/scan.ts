// functions/api/admin/scan.ts
// Réka beolvassa a vendég QR tokenjét vagy beírja a telefonszámát, ellenőrzi a PIN kódot és jóváír +1 pecsétet

interface Env {
  DB: D1Database;
  ADMIN_PIN?: string;
}

const DEFAULT_PIN = '2026';
const MAX_STAMPS = 10;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const pin = request.headers.get('x-admin-pin');
    const validPin = env.ADMIN_PIN || DEFAULT_PIN;

    if (!pin || pin !== validPin) {
      return new Response(JSON.stringify({ error: 'Hibás admin PIN kód!' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body: { qr_token?: string; admin_name?: string } = await request.json();
    const qrToken = body.qr_token;
    const adminName = body.admin_name || 'Réka';

    if (!qrToken) {
      return new Response(JSON.stringify({ error: 'Hiányzó azonosító vagy QR token!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const queryToken = qrToken.trim();

    // Felhasználó megkeresése: QR token, telefonszám vagy email alapján
    let user: any = null;
    if (queryToken.includes('@')) {
      user = await env.DB.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').bind(queryToken).first();
    } else if (/^\+?[0-9\s-]{8,16}$/.test(queryToken)) {
      const cleanPhone = queryToken.replace(/[^\d+]/g, '');
      user = await env.DB.prepare('SELECT * FROM users WHERE phone = ? OR REPLACE(phone, " ", "") = ?').bind(cleanPhone, cleanPhone).first();
    } else {
      user = await env.DB.prepare('SELECT * FROM users WHERE qr_token = ?').bind(queryToken).first();
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'Nem található vendég ezzel a QR kóddal vagy telefonszámmal!' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentStamps = user.stamps;
    const newStamps = currentStamps >= MAX_STAMPS ? MAX_STAMPS : currentStamps + 1;
    const newTotal = user.total_stamps + 1;

    // Frissítjük a felhasználót és naplózzuk
    await env.DB.prepare(
      'UPDATE users SET stamps = ?, total_stamps = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    )
      .bind(newStamps, newTotal, user.id)
      .run();

    await env.DB.prepare(
      'INSERT INTO stamps_log (user_id, admin_name, action, previous_stamps, new_stamps) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(user.id, adminName, 'add_stamp', currentStamps, newStamps)
      .run();

    const isRewardUnlocked = newStamps >= MAX_STAMPS;

    return new Response(
      JSON.stringify({
        success: true,
        message: isRewardUnlocked
          ? `🎉 Gratulálunk! ${user.name} elérte a 10. pecsétet! Jutalma készen áll!`
          : `+1 pecsét sikeresen jóváírva ${user.name} kártyáján! (Most: ${newStamps}/${MAX_STAMPS})`,
        user: {
          ...user,
          stamps: newStamps,
          total_stamps: newTotal,
        },
        reward_unlocked: isRewardUnlocked,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a pecsét jóváírásakor', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
