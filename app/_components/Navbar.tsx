"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const avatarUrl = "https://i.pravatar.cc/";

const navLinks = [
  { name: "Pano", href: "/dashboard" },
  { name: "İstekler", href: "/wishes" },
  { name: "Ayarlar", href: "/settings" },
];

type NavbarProps = {
  avatar?: string | null;
};

function Navbar({ avatar }: NavbarProps) {
  const [active, setActive] = useState("/pano");
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!avatar) {
      const userStr =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.avatar) setLocalAvatar(user.avatar);
        } catch {}
      }
    }
  }, [avatar]);

  return (
    <nav className="bg-teal-500 px-10 flex items-center justify-between">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            className={`px-2 py-1 rounded transition-colors ${
              active === link.href
                ? "text-white"
                : "text-teal-800 hover:text-white"
            }`}
          >
            {link.name}
          </a>
        ))}
        <Image
          width={32}
          height={32}
          src={avatar || localAvatar || avatarUrl}
          alt="Avatar"
          className="w-8 h-8 rounded-full border-2 border-white ml-2"
        />
      </div>
    </nav>
  );
}

export default Navbar;
