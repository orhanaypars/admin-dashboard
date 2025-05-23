import db from "@/lib/db";

export async function GET() {
  const rows = db.prepare("SELECT AdSoyad, Eposta FROM Yetkililer").all();
  return Response.json(rows);
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  if (!name || !email) {
    return Response.json({ error: "Eksik bilgi" }, { status: 400 });
  }
  try {
    db.prepare("INSERT INTO Yetkililer (AdSoyad, Eposta) VALUES (?, ?)").run(
      name,
      email
    );
    return Response.json({ ok: true });
  } catch (e) {
    // Hatanın UNIQUE constraint violation olup olmadığını kontrol et
    if (
      e &&
      typeof (e as { code?: string }).code === "string" &&
      (e as { code: string }).code === "SQLITE_CONSTRAINT_PRIMARYKEY"
    ) {
      return Response.json(
        { error: "E-posta zaten kayıtlı." },
        { status: 400 }
      );
    }
    // Diğer hatalar için genel hata mesajı döndür
    return Response.json({ error: "Kayıt başarısız." }, { status: 400 });
  }
}
