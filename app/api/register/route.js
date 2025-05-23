import db from "../../../lib/db";

export async function POST(request) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "Eksik bilgi" }), {
      status: 400,
    });
  }
  try {
    const stmt = db.prepare(
      "INSERT INTO Kullanici (KullaniciAdi, Eposta, Sifre, AdSoyad) VALUES (?, ?, ?, ?)"
    );
    stmt.run(email.split("@")[0], email, password, name);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(
      JSON.stringify({ error: "Kayıt başarısız veya e-posta zaten kayıtlı." }),
      { status: 400 }
    );
  }
}
