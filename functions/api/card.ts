// functions/api/card.ts
// Kártyaadatok és aktuális pecsétek lekérése felhasználói azonosító vagy QR token alapján

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const qrToken = url.searchParams.get('token');

  if (!userId && !qrToken) {
    return new Response(JSON.stringify({ error: 'Hiányzó azonosító paraméter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let query = 'SELECT id, name, email, picture, stamps, total_stamps, rewards_redeemed, qr_token FROM users WHERE ';
    let param = '';

    if (userId) {
      query += 'id = ?';
      param = userId;
    } else if (qrToken && qrToken.includes('@')) {
      // Ha a beírt szöveg egy email cím
      query += 'LOWER(email) = LOWER(?)';
      param = qrToken.trim();
    } else {
      query += 'qr_token = ?';
      param = qrToken!;
    }

    const user = await env.DB.prepare(query).bind(param).first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'A felhasználó nem található' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
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
