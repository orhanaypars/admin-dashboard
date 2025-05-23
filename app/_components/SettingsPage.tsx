"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Yetkili Ekle", href: "/setting" },
  { label: "Departmanlar", href: "/departmants" },
  { label: "Çalışan Ekle", href: "/addworker" },
  { label: "Ürün Ekle", href: "/addproduct" },
  { label: "Profilim", href: "/profile" },
];

function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authorities, setauthorities] = useState<
    { name: string; email: string }[]
  >([]);
  const [error, setError] = useState("");
  const pathname = usePathname();

  // authoritiesi çek
  const fetchauthorities = async () => {
    const res = await fetch("/api/authorities");
    const data: { AdSoyad: string; Eposta: string }[] = await res.json();
    setauthorities(
      data.map((y) => ({
        name: y.AdSoyad,
        email: y.Eposta,
      }))
    );
  };

  useEffect(() => {
    fetchauthorities();
  }, []);

  // Kaydet
  const handleSave = async () => {
    setError("");
    if (!name || !email) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    const res = await fetch("/api/authorities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      fetchauthorities();
    } else {
      const data = await res.json();
      setError(data.error || "Kayıt başarısız.");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 border-r min-h-screen py-8 px-4">
        <div className="mb-6 text-gray-500 font-semibold">Ayarlar</div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded cursor-pointer transition ${
                  pathname === item.href
                    ? "bg-white text-teal-600 font-semibold shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Sağ içerik */}
      <main className="flex-1 flex flex-col items-center justify-start pt-10">
        <div className="flex w-[600px] mb-6 gap-4">
          <input
            type="text"
            placeholder="Adı, Soyadı"
            className="border border-gray-200 rounded px-4 py-2 flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="e-Posta Adresi"
            className="border border-gray-200 rounded px-4 py-2 flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-teal-500 text-white px-8 py-2 rounded font-semibold hover:bg-teal-600 transition"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="bg-white rounded-2xl p-8 w-[600px] shadow-none border border-gray-100">
          <div className="flex px-2 pb-2 text-gray-400 text-sm font-semibold">
            <div className="flex-1">Adı</div>
            <div className="flex-1">e-Posta Adresi</div>
          </div>
          <div>
            {authorities.map((user, idx) => (
              <div
                key={user.email}
                className={`flex items-center px-2 py-4 bg-white ${
                  idx < authorities.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex-1 font-medium text-gray-700">
                  {user.name}
                </div>
                <div className="flex-1 text-gray-400">{user.email}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
