import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "InternetProgDB.sqlite");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS Kullanici (
    KullaniciAdi TEXT,
    Eposta TEXT PRIMARY KEY,
    Sifre TEXT,
    AdSoyad TEXT
  );
  CREATE TABLE IF NOT EXISTS Yetkililer (
    AdSoyad TEXT,
    Eposta TEXT PRIMARY KEY
  );
`);

export default db;
