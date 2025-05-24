"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authorities, setauthorities] = useState<
    { name: string; email: string }[]
  >([]);
  const [error, setError] = useState("");
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);

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

  const handleSave = async () => {
    setError("");
    if (!name || !email) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    setauthorities([...authorities, { name, email }]);
    setName("");
    setEmail("");
  };

  const handleDelete = async (email: string, idx: number) => {
    setError("");
    setDeletingIdx(idx);
    try {
      const res = await fetch("/api/authorities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Silme işlemi başarısız.");
      }
      setauthorities((prev) => prev.filter((a) => a.email !== email));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bir hata oluştu.");
      }
    } finally {
      setDeletingIdx(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center px-1 sm:px-2 md:px-0">
        <div className="flex flex-col items-start w-full max-w-full md:max-w-4xl mt-4 md:mt-12">
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mb-3 md:mb-6">
            <input
              type="text"
              placeholder="Adı, Soyadı"
              className="border border-gray-200 rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full md:flex-1 text-xs md:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="e-Posta Adresi"
              className="border border-gray-200 rounded px-2 md:px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 w-full md:flex-1 text-xs md:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-teal-500 text-white px-4 md:px-8 py-2 rounded font-semibold hover:bg-teal-600 transition w-full md:w-auto text-xs md:text-base"
              onClick={handleSave}
              style={{ minWidth: 80 }}
            >
              Kaydet
            </button>
          </div>
          {error && (
            <div className="text-red-500 mb-2 md:mb-4 text-xs md:text-base">
              {error}
            </div>
          )}
          <div className="bg-white rounded-xl md:rounded-2xl p-0 w-full max-w-full md:max-w-3xl shadow-md border border-gray-100">
            <div className="flex px-2 md:px-8 pt-4 md:pt-8 pb-1 md:pb-2 text-gray-400 text-xs md:text-sm font-semibold">
              <div className="flex-1">Adı</div>
              <div className="flex-1">e-Posta Adresi</div>
              <div className="w-20"></div>
            </div>
            <div className="px-1 md:px-4 pb-2 md:pb-6">
              {authorities.map((user, idx) => (
                <div
                  key={user.email + idx}
                  className={`flex flex-col md:flex-row items-start md:items-center px-2 md:px-4 py-2 md:py-4 bg-white rounded-lg md:rounded-xl ${
                    idx < authorities.length - 1
                      ? "mb-1 md:mb-4 border-b border-gray-200"
                      : ""
                  } shadow-sm`}
                  style={{
                    marginBottom: idx < authorities.length - 1 ? undefined : 0,
                  }}
                >
                  <div className="flex-1 font-medium text-gray-700 break-words text-xs md:text-base">
                    {user.name}
                  </div>
                  <div className="flex-1 text-gray-400 break-words text-xs md:text-base">
                    {user.email}
                  </div>
                  <div className="w-20 flex justify-end mt-2 md:mt-0">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-sm hover:bg-red-600 transition disabled:opacity-60"
                      onClick={() => handleDelete(user.email, idx)}
                      disabled={deletingIdx === idx}
                    >
                      {deletingIdx === idx ? "Siliniyor..." : "Kaldır"}
                    </button>
                  </div>
                </div>
              ))}
              {authorities.length === 0 && (
                <div className="text-gray-300 text-center py-2 md:py-4 text-xs md:text-base">
                  Henüz kayıt yok.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
