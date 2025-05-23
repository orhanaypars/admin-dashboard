"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

function ForgetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 px-2 sm:px-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl  p-4 sm:p-8 md:p-10 flex flex-col items-center bg-white/10 backdrop-blur-md">
        <div className="mb-4">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            className="sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] "
          />
        </div>
        <div className="mb-6 w-full text-left">
          <Label className="text-2xl text-white font-bold tracking-wide drop-shadow">
            Parolamı Unuttum
          </Label>
        </div>
        <div className="w-full flex flex-col gap-4 text-white">
          <style jsx global>{`
            input::placeholder {
              color: #fff !important;
              opacity: 1;
            }
          `}</style>

          <div className="flex flex-col gap-4">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full bg-teal-700/90 text-white outline-none border-0 rounded-lg px-4 py-3 shadow"
                autoComplete="email"
              />
            </div>
            <div className="text-left max-w-xs mx-auto">
              <Label className="text-sm font-light text-teal-900">
                E-posta adresinize gönderilen şifre yenileme yönergeleri ile
                yeni şifrenizi oluşturabilirsiniz
              </Label>
            </div>
          </div>

          <div className="flex sm:flex-row gap-2 mt-4">
            <Link
              href="/login"
              className="w-full sm:w-1/2 flex items-center justify-center text-sm font-medium bg-white/80 text-teal-700 rounded-lg py-2   text-center hover:opacity-75 transition"
            >
              Giriş Yap
            </Link>
            <Link
              href="/resetpassword"
              className="w-full sm:w-1/2 flex items-center justify-center text-sm font-medium bg-teal-800 text-white rounded-lg py-2 text-center hover:opacity-75 transition"
            >
              Şifre Yenile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
