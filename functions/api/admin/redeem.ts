// functions/api/admin/redeem.ts
// Ajándék / Kedvezmény beváltása: pecsétek nullázása, jutalom naplózása

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

    const user: any = await env.DB.prepare('SELECT * FROM users WHERE qr_token = ?')
      .bind(qrToken)
      .first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Nem található vendég ezzel a QR kóddal!' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (user.stamps < MAX_STAMPS) {
      return new Response(
        JSON.stringify({ error: `A vendégnek még csak ${user.stamps}/${MAX_STAMPS} pecsétje van, még nem váltható be a jutalom!` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const currentStamps = user.stamps;
    const newRedeemed = user.rewards_redeemed + 1;

    // Pecsétek nullázása az új körre
    await env.DB.prepare(
      'UPDATE users SET stamps = 0, rewards_redeemed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    )
      .bind(newRedeemed, user.id)
      .run();

    await env.DB.prepare(
      'INSERT INTO stamps_log (user_id, admin_name, action, previous_stamps, new_stamps) VALUES (?, ?, ?, ?, 0)'
    )
      .bind(user.id, adminName, 'REDEEM_REWARD', currentStamps)
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: '🎁 A jutalom sikeresen beváltva! A kártya újraindult 0 pecséttel az új körhöz.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          stamps: 0,
          total_stamps: user.total_stamps,
          rewards_redeemed: newRedeemed,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a jutalom beváltásakor', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
