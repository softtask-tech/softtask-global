CREATE TABLE IF NOT EXISTS subscribers (
 email TEXT PRIMARY KEY,
 status TEXT NOT NULL CHECK(status IN ('pending','active')),
 topic TEXT NOT NULL,
 pending_topic TEXT NOT NULL,
 confirm_hash TEXT UNIQUE,
 confirm_expires INTEGER,
 unsubscribe_hash TEXT UNIQUE,
 created_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL
);
