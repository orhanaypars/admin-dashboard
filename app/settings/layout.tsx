import React from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <aside className="w-64 bg-gray-50 border-r min-h-screen py-8 px-4">
        <div className="mb-6 text-gray-500 font-semibold">Ayarlar</div>
        <ul className="space-y-2">
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 rounded cursor-pointer transition text-gray-600 hover:bg-gray-100"
            >
              Yetkililer
            </a>
          </li>
          {/* Diğer ayar menüleri buraya eklenebilir */}
        </ul>
      </aside>
      <main className="flex-1 flex flex-col items-center justify-start pt-10">
        {children}
      </main>
    </div>
  );
}
