// functions/api/admin/scan.ts
// Réka beolvassa a vendég QR tokenjét, a rendszer ellenőrzi a PIN kódot és jóváír +1 pecsétet

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
      return new Response(JSON.stringify({ error: 'Hiányzó QR token!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Felhasználó megkeresése
    const user: any = await env.DB.prepare('SELECT * FROM users WHERE qr_token = ?')
      .bind(qrToken)
      .first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Nem található vendég ezzel a QR kóddal!' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentStamps = user.stamps;
    const newStamps = currentStamps >= MAX_STAMPS ? MAX_STAMPS : currentStamps + 1;
    const newTotal = user.total_stamps + 1;

    // Tranzakció / egymást követő futtatás: frissítjük a felhasználót és naplózzuk
    await env.DB.prepare(
      'UPDATE users SET stamps = ?, total_stamps = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    )
      .bind(newStamps, newTotal, user.id)
      .run();

    await env.DB.prepare(
      'INSERT INTO stamps_log (user_id, admin_name, action, previous_stamps, new_stamps) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(user.id, adminName, 'ADD_STAMP', currentStamps, newStamps)
      .run();

    const isRewardUnlocked = newStamps >= MAX_STAMPS;

    return new Response(
      JSON.stringify({
        success: true,
        message: isRewardUnlocked
          ? '🎉 Gratulálunk! A vendég összegyűjtötte a 10 pecsétet!'
          : `+1 Pecsét sikeresen hozzáadva (${newStamps}/${MAX_STAMPS})`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          stamps: newStamps,
          total_stamps: newTotal,
          rewards_redeemed: user.rewards_redeemed,
          isRewardUnlocked,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a pont jóváírásakor', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
