// functions/api/card.ts
// Kártyaadatok és pecsétek lekérése felhasználói azonosító, QR token vagy telefonszám alapján

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const qrToken = url.searchParams.get('token');
  const phone = url.searchParams.get('phone');

  if (!userId && !qrToken && !phone) {
    return new Response(JSON.stringify({ error: 'Hiányzó azonosító paraméter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let query = 'SELECT id, name, email, phone, picture, stamps, total_stamps, rewards_redeemed, qr_token FROM users WHERE ';
    let param = '';

    if (userId) {
      query += 'id = ?';
      param = userId;
    } else if (phone) {
      const cleanPhone = phone.replace(/[^\d+]/g, '').trim();
      query += 'phone = ? OR REPLACE(phone, " ", "") = ?';
      param = cleanPhone;
    } else if (qrToken && qrToken.includes('@')) {
      query += 'LOWER(email) = LOWER(?)';
      param = qrToken.trim();
    } else if (qrToken && /^\+?[0-9\s-]{8,16}$/.test(qrToken.trim())) {
      const cleanPhone = qrToken.replace(/[^\d+]/g, '').trim();
      query += 'phone = ? OR REPLACE(phone, " ", "") = ?';
      param = cleanPhone;
    } else {
      query += 'qr_token = ?';
      param = qrToken!;
    }

    const user = await env.DB.prepare(query).bind(param).first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'A hűségkártya nem található' }), {
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
