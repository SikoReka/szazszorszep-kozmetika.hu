// functions/api/auth/google.ts
// Google OAuth ID Token hitelesítése és felhasználó mentése / lekérése a Cloudflare D1-ből

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body: { credential?: string } = await request.json();
    const token = body.credential;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Hiányzó Google token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Google Token validáció a hivatalos Google tokeninfo végponton
    const googleVerifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    if (!googleVerifyRes.ok) {
      return new Response(JSON.stringify({ error: 'Érvénytelen Google token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload: any = await googleVerifyRes.json();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || 'Vendég';
    const picture = payload.picture || '';

    // Megnézzük, létezik-e már a felhasználó a D1 adatbázisban
    const existingUser = await env.DB.prepare('SELECT * FROM users WHERE id = ? OR email = ?')
      .bind(googleId, email)
      .first();

    let user;

    if (existingUser) {
      // Felhasználó már regisztrált, frissítjük a profilképet és nevet ha változott
      await env.DB.prepare(
        'UPDATE users SET name = ?, picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      )
        .bind(name, picture, existingUser.id)
        .run();

      user = {
        ...existingUser,
        name,
        picture,
      };
    } else {
      // Új felhasználó: generálunk egy egyedi, biztonságos QR tokent
      const qrToken = 'szsz_' + crypto.randomUUID().replace(/-/g, '');

      await env.DB.prepare(
        `INSERT INTO users (id, name, email, picture, stamps, total_stamps, rewards_redeemed, qr_token) 
         VALUES (?, ?, ?, ?, 0, 0, 0, ?)`
      )
        .bind(googleId, name, email, picture, qrToken)
        .run();

      user = {
        id: googleId,
        name,
        email,
        picture,
        stamps: 0,
        total_stamps: 0,
        rewards_redeemed: 0,
        qr_token: qrToken,
      };
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
      JSON.stringify({ error: 'Szerverhiba történt', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
