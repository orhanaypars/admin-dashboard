"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("E-posta ve şifre gerekli.");
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Giriş başarısız.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-2 sm:px-4 bg-teal-500">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg  p-4 sm:p-8 md:p-10 flex flex-col items-center">
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
          <Label className="text-2xl text-white">Giriş Yap</Label>
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
          <div>
            <Input
              id="email"
              type="email"
              placeholder="E-posta"
              className="w-full bg-teal-700 text-white outline-none border-0"
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
              className="w-full bg-teal-700 text-white outline-none border-0 pr-10"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/register"
              className="w-full sm:w-1/2 mt-2 flex items-center justify-center text-sm hover:underline rounded-md border-input py-2 text-teal-700"
              style={{ textAlign: "center" }}
            >
              Yeni hesap oluştur
            </Link>
            <Button
              type="submit"
              className="w-full sm:w-1/2 mt-2 bg-teal-700 text-white"
            >
              Giriş Yap
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
