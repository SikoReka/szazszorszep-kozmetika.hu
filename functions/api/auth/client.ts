// functions/api/auth/client.ts
// Vendég belépés és regisztráció Telefonszám + 4 jegyű PIN kód alapján

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body: any = await request.json();
    const { action, phone, pin, name } = body;

    if (!phone || typeof phone !== 'string') {
      return new Response(JSON.stringify({ error: 'Kérlek add meg a telefonszámodat!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!pin || typeof pin !== 'string' || !/^\d{4,6}$/.test(pin.trim())) {
      return new Response(JSON.stringify({ error: 'A PIN kódnak pontosan 4 számjegyből kell állnia!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Telefonszám normalizálása (szóközök, kötőjelek eltávolítása)
    const normalizedPhone = phone.replace(/[^\d+]/g, '').trim();
    const cleanPin = pin.trim();

    if (normalizedPhone.length < 8) {
      return new Response(JSON.stringify({ error: 'Kérlek valós telefonszámot adj meg (pl. 06 30 123 4567)!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. BEJELENTKEZÉS
    if (action === 'login') {
      const user = await env.DB.prepare(`
        SELECT id, name, email, phone, pin, picture, stamps, total_stamps, rewards_redeemed, qr_token
        FROM users
        WHERE phone = ? OR REPLACE(phone, ' ', '') = ?
      `).bind(normalizedPhone, normalizedPhone).first<any>();

      if (!user) {
        return new Response(
          JSON.stringify({ 
            error: 'Ezzel a telefonszámmal még nincs hűségkártyád. Válts át az „Új kártya létrehozása” fülre a regisztrációhoz!' 
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // PIN ellenőrzés (ha van beállított PIN)
      if (user.pin && user.pin !== cleanPin) {
        return new Response(
          JSON.stringify({ 
            error: 'Hibás 4 jegyű PIN kód! Ha elfelejtetted, kérd Rékát a szalonban az azonnali visszaállításra.' 
          }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Ha még nem volt PIN-je (régi regisztráció), most beállítjuk
      if (!user.pin) {
        await env.DB.prepare(`UPDATE users SET pin = ? WHERE id = ?`).bind(cleanPin, user.id).run();
        user.pin = cleanPin;
      }

      // Biztonság kedvéért a választ nem terheljük a PIN mezővel
      const { pin: _p, ...safeUser } = user;

      return new Response(JSON.stringify({ success: true, user: safeUser }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. REGISZTRÁCIÓ (ÚJ KÁRTYA)
    if (action === 'register') {
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return new Response(JSON.stringify({ error: 'Kérlek add meg a teljes nevedet a kártyához!' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const clientName = name.trim();

      // Ellenőrizzük, létezik-e már ezzel a telefonszámmal
      const existing = await env.DB.prepare(`
        SELECT id FROM users WHERE phone = ? OR REPLACE(phone, ' ', '') = ?
      `).bind(normalizedPhone, normalizedPhone).first();

      if (existing) {
        return new Response(
          JSON.stringify({ 
            error: 'Ezzel a telefonszámmal már van regisztrált hűségkártya! Kérlek válaszd a „Belépés” lehetőséget.' 
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Új azonosítók generálása
      const id = `client_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const qrToken = `szasz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
      const dummyEmail = `${normalizedPhone.replace('+', '')}@szazszorszep-vendeg.local`;

      await env.DB.prepare(`
        INSERT INTO users (id, name, email, phone, pin, stamps, total_stamps, rewards_redeemed, qr_token)
        VALUES (?, ?, ?, ?, ?, 0, 0, 0, ?)
      `).bind(id, clientName, dummyEmail, normalizedPhone, cleanPin, qrToken).run();

      const newUser = {
        id,
        name: clientName,
        phone: normalizedPhone,
        email: dummyEmail,
        stamps: 0,
        total_stamps: 0,
        rewards_redeemed: 0,
        qr_token: qrToken,
      };

      return new Response(JSON.stringify({ success: true, user: newUser, isNew: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Érvénytelen művelet (action: login vagy register szükséges)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a belépés során', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
