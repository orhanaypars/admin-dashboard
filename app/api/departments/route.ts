import { NextRequest, NextResponse } from "next/server";
import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

function validateConfig(cfg: typeof config) {
  if (
    !cfg.user ||
    !cfg.password ||
    !cfg.server ||
    !cfg.database ||
    typeof cfg.server !== "string"
  ) {
    throw new Error(
      "MSSQL config error: .env dosyanızda DB_USER, DB_PASS, DB_SERVER ve DB_NAME tanımlı ve string olmalı."
    );
  }
}

export async function GET() {
  try {
    validateConfig(config);
    const pool = await sql.connect(config);
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Departments' AND xtype='U')
      CREATE TABLE Departments (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT GETDATE()
      );
    `);
    const result = await pool
      .request()
      .query("SELECT id, name, createdAt FROM Departments ORDER BY id DESC");
    const departments = result.recordset ?? [];
    return NextResponse.json(departments);
  } catch (e) {
    console.error("GET /api/departments error:", e);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    validateConfig(config);
    const { name } = await req.json();
    if (!name || typeof name !== "string" || !name.trim())
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("name", sql.NVarChar(255), name.trim())
      .query("INSERT INTO Departments (name) VALUES (@name)");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/departments error:", e);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
