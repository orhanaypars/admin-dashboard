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
    return Response.json({ error: "Kayıt başarısız." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ error: "E-posta gerekli." }, { status: 400 });
    }
    const result = db
      .prepare("DELETE FROM Yetkililer WHERE Eposta = ?")
      .run(email);
    if (result.changes === 0) {
      return Response.json({ error: "Kayıt bulunamadı." }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Silme işlemi başarısız." }, { status: 400 });
  }
}
