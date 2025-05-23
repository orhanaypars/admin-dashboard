"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [approved, setApproved] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!approved) {
      setError("Kullanım şartlarını onaylamalısınız.");
      return;
    }
    if (!name || !email || !password) {
      setError("Tüm alanları doldurmalısınız.");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Kayıt sırasında hata oluştu.");
      }
    } catch {
      setError("Kayıt sırasında hata oluştu.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-2 sm:px-4 bg-teal-500">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg p-4 sm:p-8 md:p-10 flex flex-col items-center">
        <div>
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="logo"
            className="sm:w-[150px] sm:h-[150px] w-[150px] h-[150px]"
          />
        </div>
        <div className="mb-6 w-full text-start">
          <Label className="text-2xl text-white">Hesap Oluştur</Label>
        </div>
        <form
          className="w-full flex flex-col gap-4 text-white"
          onSubmit={handleSubmit}
        >
          <style jsx global>{`
            input::placeholder {
              color: #fff !important;
              opacity: 1;
            }
          `}</style>
          <Input
            id="name"
            type="text"
            placeholder="Ad soyad"
            className="max-w-full bg-teal-700 text-white outline-none border-0"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="E-posta"
              className="max-w-full bg-teal-700 text-white outline-none border-0 pr-10"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              className="max-w-full bg-teal-700 text-white outline-none border-0"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{ top: "50%", right: "0.75rem" }}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="approve"
              checked={approved}
              onChange={() => setApproved((v) => !v)}
              className="accent-teal-700"
            />
            <label
              htmlFor="approve"
              className="text-white text-sm cursor-pointer select-none"
            >
              Kullanım şartlarını onaylıyorum
            </label>
          </div>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          {success && <div className="text-green-300 text-sm">{success}</div>}
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="/login"
              className="w-full sm:w-1/2 mt-2 flex items-center justify-center text-sm hover:underline rounded-md border-input py-2 text-teal-700"
              style={{ textAlign: "center" }}
              type="button"
            >
              Giriş Yap
            </a>
            <Button
              type="submit"
              className="w-full sm:w-1/2 mt-2 bg-teal-700 text-white"
              disabled={!approved}
            >
              Kayıt Ol
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
