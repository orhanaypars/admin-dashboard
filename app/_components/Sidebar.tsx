"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const menuItems = [
    { label: "Yetkili Ekle", href: "/settings" },
    { label: "Departmanlar", href: "/departments" },
    { label: "Çalışan Ekle", href: "/addworker" },
    { label: "Ürün Ekle", href: "/addproduct" },
    { label: "Profilim", href: "/profile" },
  ];
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r min-h-0 md:min-h-screen py-2 md:py-8 px-1 md:px-4 flex-shrink-0">
      <div className="mb-2 md:mb-6 text-gray-500 font-semibold text-center md:text-left text-xs md:text-base">
        Ayarlar
      </div>
      <ul className="flex md:flex-col flex-row justify-center md:justify-start space-x-1 md:space-x-0 md:space-y-2">
        {menuItems.map((item, idx) => (
          <li key={item.href + "-" + idx}>
            <Link
              href={item.href}
              className={`block px-2 md:px-4 py-1.5 md:py-2 rounded cursor-pointer transition text-xs md:text-base ${
                pathname === item.href
                  ? "bg-white text-teal-600 font-semibold shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={{ minWidth: 70, textAlign: "center" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
