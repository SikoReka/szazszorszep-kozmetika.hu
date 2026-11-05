-- Százszorszép Kozmetika Hűségprogram Adatbázis Séma (Cloudflare D1)

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,               -- Google User ID (sub) vagy UUID
    name TEXT NOT NULL,                -- Vendég neve
    email TEXT NOT NULL UNIQUE,        -- Vendég email címe
    picture TEXT,                      -- Google profilkép URL
    stamps INTEGER DEFAULT 0,          -- Aktuális gyűjtött pecsétek száma (0 - 10)
    total_stamps INTEGER DEFAULT 0,    -- Összesen életében megszerzett pecsétek
    rewards_redeemed INTEGER DEFAULT 0,-- Beváltott jutalmak száma
    qr_token TEXT NOT NULL UNIQUE,     -- Titkosított token a vendég QR-kódjához
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stamps_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    admin_name TEXT DEFAULT 'Réka',
    action TEXT NOT NULL,              -- 'ADD_STAMP' vagy 'REDEEM_REWARD'
    previous_stamps INTEGER NOT NULL,
    new_stamps INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_qr_token ON users(qr_token);
