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
  } catch {
    return Response.json(
      { error: "Kayıt başarısız veya e-posta zaten kayıtlı." },
      { status: 400 }
    );
  }
}
