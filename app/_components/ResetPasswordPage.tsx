"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Şifreler eşleşmiyor,tekrar giriniz.");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 px-2 sm:px-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl  p-4 sm:p-8 md:p-10 flex flex-col items-center bg-white/10 backdrop-blur-md">
        <div className="mb-6 w-full flex items-center gap-5">
          <Label className="text-2xl text-white font-bold tracking-wide drop-shadow">
            Şifreyi Güncelle
          </Label>
          <Image src="/logo.png" width={50} height={50} alt="logo" />
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
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Yeni şifre"
              className="w-full bg-teal-700/90 text-white outline-none border-0 rounded-lg px-4 py-3 shadow pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
          <div className="relative">
            <Input
              type={showPassword2 ? "text" : "password"}
              placeholder="Yeni şifre (tekrar)"
              className="w-full bg-teal-700/90 text-white outline-none border-0 rounded-lg px-4 py-3 shadow pr-10"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="new-password"
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-white"
              onClick={() => setShowPassword2((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword2 ? "Şifreyi gizle" : "Şifreyi göster"}
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && (
            <div className="text-teal-800 text-sm text-left">{error}</div>
          )}
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-white text-teal-700 font-semibold rounded-lg py-3 shadow hover:bg-teal-100 transition"
            >
              Şifreyi Güncelle
            </Button>
            <Link href="/login">Geri dön</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
