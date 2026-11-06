// functions/api/admin/client-pin.ts
// Réka megtekintheti vagy visszaállíthatja a vendég 4 jegyű PIN kódját

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
    const body: { user_id?: string; phone?: string; new_pin?: string } = await request.json();
    const { user_id, phone, new_pin } = body;

    let user: any = null;
    if (user_id) {
      user = await env.DB.prepare('SELECT id, name, phone, pin FROM users WHERE id = ?').bind(user_id).first();
    } else if (phone) {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      user = await env.DB.prepare('SELECT id, name, phone, pin FROM users WHERE phone = ? OR REPLACE(phone, " ", "") = ?').bind(cleanPhone, cleanPhone).first();
    }

    if (!user) {
      return new Response(JSON.stringify({ error: 'A vendég nem található!' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ha új PIN-t állít be Réka:
    if (new_pin && /^\d{4,6}$/.test(new_pin.trim())) {
      const cleanNewPin = new_pin.trim();
      await env.DB.prepare('UPDATE users SET pin = ? WHERE id = ?').bind(cleanNewPin, user.id).run();
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `${user.name} új PIN kódja sikeresen beállítva: ${cleanNewPin}`,
          pin: cleanNewPin 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Ha csak lekérdezi az aktuális PIN-t:
    return new Response(
      JSON.stringify({ 
        success: true, 
        name: user.name,
        phone: user.phone,
        current_pin: user.pin || 'Még nincs beállítva' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Hiba a PIN kezelésekor', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
