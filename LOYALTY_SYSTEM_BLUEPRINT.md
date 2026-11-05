# 💎 Borbás Webdesign - Moduláris Digitális Hűségprogram & Kártya Blueprint

> **0 Ft havidíjas, felhőalapú törzsvendég- és hűségkártya rendszer szalonoknak és szolgáltatóknak.**  
> *Stack: React / TypeScript + Cloudflare Pages Functions + Cloudflare D1 (SQLite) + Google OAuth 2.0 + PWA (Progressive Web App).*

---

## 🏛️ 1. Rendszer-architektúra áttekintés

```
[ VENDÉG (ÜGYFÉL) ]                                  [ SZALON (MUNKATÁRS) ]
        │                                                     │
 1. Főoldal: /#loyalty szekció                         1. Footer link: /szalon-admin
 2. Kártya oldal: /kartya                              2. Biztonsági 4 jegyű PIN kód
 3. 1 Kattintásos Google Bejelentkezés                 3. Beépített kamerás QR szkenner
 4. Digitális Kártya (1-10 pecsét) + QR kód            4. "+1 Pecsét" jóváírás / Beváltás
        │                                                     │
        └───────────────────────┬─────────────────────────────┘
                                │
                 [ Cloudflare Pages Functions API ]
                   - /api/auth/google
                   - /api/card
                   - /api/admin/scan
                   - /api/admin/redeem
                   - /api/admin/setup-db
                                │
                 [ Cloudflare D1 SQL Adatbázis ]
                   - users (vendég profilok & pecsétek)
                   - stamps_log (biztonsági tranzakciós napló)
```

---

## 🚀 2. Hogyan adaptáld ezt egy ÚJ ügyfélprojektbe 15 perc alatt?

### A. Google Cloud Console beállítása
1. Hozz létre egy új projektet a [console.cloud.google.com](https://console.cloud.google.com/) felületen.
2. **OAuth Consent Screen:**
   - User type: **External**
   - App name: `[Ügyfél Neve] Klub`
   - User Support & Developer email: saját címed.
3. **Credentials -> OAuth client ID:**
   - Type: **Web application**
   - **Authorized JavaScript origins:**
     - `http://localhost:5173`
     - `https://[ugyfel-domain.hu]`
     - `https://[preview-branch].[ugyfel-projekt].pages.dev`
4. Másold ki a kapott **Client ID**-t a kódba (`GOOGLE_CLIENT_ID`).

---

### B. Cloudflare D1 Adatbázis és Pages Binding
1. **D1 Adatbázis létrehozása:**
   - [dash.cloudflare.com](https://dash.cloudflare.com/) -> **Storage & databases** -> **D1 SQL Database**.
   - Név: `[ugyfel]-db`.
2. **Pages Összekötése (Mindkét környezetre!):**
   - Menj a Pages projektre -> **Settings** -> **Functions** -> **D1 Database Bindings**.
   - **FONTOS:** Mind a **Production**, mind a **Preview** környezethez add hozzá:
     - Variable name: `DB`
     - D1 database: `[ugyfel]-db`
3. **Táblák létrehozása:**
   - A D1 konzolon futtasd le a `schema.sql` tartalmát:
     ```sql
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
         admin_name TEXT DEFAULT 'Kezelő',
         action TEXT NOT NULL,
         previous_stamps INTEGER NOT NULL,
         new_stamps INTEGER NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     );
     ```

---

### C. Kódstruktúra és komponensek másolása

| Fájl | Funkció |
| :--- | :--- |
| `functions/api/auth/google.ts` | Google ID Token hitelesítés, vendég mentése a D1-be, egyedi QR-token generálás |
| `functions/api/card.ts` | Kártyaadatok lekérése felhasználói azonosító, email cím vagy QR-token alapján |
| `functions/api/admin/scan.ts` | PIN-kóddal védett admin csippantás, +1 pecsét jóváírása és naplózása |
| `functions/api/admin/redeem.ts` | 10 pecsét összegyűjtésekor ajándék beváltása és pecsétek nullázása az új körre |
| `src/components/LoyaltySection.tsx` | Főoldali bemutató szekció (3 luxus lépés + Hűségkártyám megnyitása gomb) |
| `src/components/LoyaltyCard.tsx` | A vendég digitális kártyája (arany pecsétek, QR kód, automatikus valós idejű szinkronizáció) |
| `src/components/SalonAdmin.tsx` | A szalon csippantó felülete (PIN belépés, élő kamerás QR-szkenner, kézi email kereső) |
| `src/components/InstallAppModal.tsx` | Kezdőképernyőhöz adási segédablak iPhone és Android készülékekhez |
| `public/manifest.json` & `admin-manifest.json` | Web App Manifestek a böngészősáv nélküli natív app élményhez |
| `public/_redirects` | Cloudflare Pages SPA Routing szabály (`/* /index.html 200`) |

---

## 💡 3. Üzleti előnyök és eladás az ügyfeleknek (Sales Pitch)

1. **Nulla fenntartási költség:** Nincs havonta 30–50 dolláros külső szoftverdíj (mint a Stampme, Loopy Loyalty vagy PassKit esetén).
2. **100%-ban a vállalkozás tulajdona:** Az összes vendégadat, email cím és látogatási statisztika a saját adatbázisukban van.
3. **Kényelem:**
   - A vendégnek sosem kell műanyag kártyát keresgélnie a táskájában.
   - A szalonnak nem kell semmit papíron vezetnie: 2 másodperc alatt lecsippantják a kezelés végén.
4. **Vésztartalék:** Ha a vendég telefonja lemerült, a kozmetikus egyszerűen beírja a vendég email címét és azonnal jóváírja a pontot.

---
*Készítette: Borbás Webdesign (2026)*
