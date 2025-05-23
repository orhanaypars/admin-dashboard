"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import Sidebar from "./Sidebar";

function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    if (!name.trim() || !email.trim()) {
      setError("Ad Soyad ve e-posta zorunlu.");
      return;
    }
    if (password && password !== passwordRepeat) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password: password || undefined,
        avatar,
      }),
    });
    if (res.ok) {
      setSuccess("Profil güncellendi.");
      setPassword("");
      setPasswordRepeat("");
    } else {
      setError("Profil güncellenemedi.");
    }
  };

  useEffect(() => {
    const userStr =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setName(user.name || "");
        setEmail(user.email || "");
        if (user.avatar) setAvatar(user.avatar);
      } catch {}
    } else {
      fetch("/api/profile", { method: "GET" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            setName(data.name || "");
            setEmail(data.email || "");
            if (data.avatar) setAvatar(data.avatar);
          }
        });
    }
  }, []);

  return (
    <div className="flex w-full bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="relative mb-2 flex flex-col items-center">
            <Image
              width={112}
              height={112}
              src={avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border border-gray-200"
            />
            <button
              type="button"
              className="mt-2 bg-white rounded-full p-2 shadow hover:bg-gray-100 border border-teal-500"
              onClick={handleAvatarClick}
              title="Avatar değiştir"
            >
              <FiCamera size={24} className="text-teal-500" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex flex-col items-center w-full max-w-xs gap-1 mb-8">
            <div className="w-full text-left font-semibold text-gray-700 mb-2 mt-4 text-base">
              Profil Bilgileri
            </div>
            <input
              type="text"
              placeholder="Ad Soyad"
              className="border border-teal-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-posta"
              className="border border-gray-200 rounded px-4 py-2 w-full bg-gray-50 text-gray-400 cursor-not-allowed select-none"
              value={email}
              readOnly
              tabIndex={-1}
            />
          </div>
          <div className="flex flex-col items-center w-full max-w-xs gap-1 mb-8">
            <div className="w-full text-left font-semibold text-gray-700 mb-2 text-base">
              Şifre
            </div>
            <input
              type="password"
              placeholder="Yeni Şifre"
              className="border border-gray-200 rounded px-4 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Yeni Şifre Tekrarı"
              className="border border-gray-200 rounded px-4 py-2 w-full"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          <button
            className="bg-teal-500 text-white px-8 py-2 rounded font-semibold hover:bg-teal-600 transition w-full max-w-xs"
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
