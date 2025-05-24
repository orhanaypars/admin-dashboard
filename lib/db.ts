import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "InternetProgDB.sqlite");

function tryCreateDatabase() {
  try {
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
    return db;
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      typeof (e as { code: unknown }).code === "string" &&
      (e as { code: string }).code === "SQLITE_CORRUPT"
    ) {
      throw new Error(
        "SQLite veritabanı bozuk. Lütfen InternetProgDB.sqlite dosyasını uygulamayı kapatarak manuel olarak silin ve tekrar başlatın."
      );
    }
    throw e;
  }
}

const db = tryCreateDatabase();

export function clearAllData() {
  db.exec(`
    DELETE FROM Kullanici;
    DELETE FROM Yetkililer;
  `);
}

export default db;
