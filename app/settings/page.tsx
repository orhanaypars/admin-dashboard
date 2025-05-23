"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_components/Navbar";

type Authority = { name: string; email: string };
// Add a type for the API response
type AuthorityApiResponse = { AdSoyad: string; Eposta: string };

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [error, setError] = useState("");

  const fetchAuthorities = async () => {
    const res = await fetch("/api/authorities");
    const data: AuthorityApiResponse[] = await res.json();
    setAuthorities(data.map((y) => ({ name: y.AdSoyad, email: y.Eposta })));
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

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
      fetchAuthorities();
    } else {
      const data = await res.json();
      setError(data.error || "Kayıt başarısız.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center w-full">
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
      </div>
    </div>
  );
}
