import db from "../../../lib/db";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Eksik bilgi" }), {
      status: 400,
    });
  }
  const user = db
    .prepare("SELECT * FROM Kullanici WHERE Eposta = ? AND Sifre = ?")
    .get(email, password);
  if (user) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } else {
    return new Response(
      JSON.stringify({ error: "E-posta veya şifre hatalı" }),
      { status: 401 }
    );
  }
}
