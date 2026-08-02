"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { icon: "📊", title: "Dashboard", href: "/crm" },
    { icon: "👥", title: "Lead-uri", href: "/crm/leads" },
    { icon: "🚘", title: "Mașini", href: "#" },
    { icon: "📢", title: "Reclame", href: "#" },
    { icon: "💰", title: "Finanțări", href: "#" },
    { icon: "📅", title: "Calendar", href: "#" },
    { icon: "💬", title: "WhatsApp", href: "#" },
    { icon: "⚙️", title: "Setări", href: "#" },
  ];

  return (
    <>
      {/* Buton mobil */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-lg p-3 shadow"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-[260px]
          bg-white
          border-r
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >

        <div className="p-6 flex flex-col h-full">

          <div className="mb-10">
            <div className="text-3xl font-extrabold text-red-600">
              COSRAM
            </div>

            <div className="text-gray-500 text-sm">
              AUTO CRM
            </div>
          </div>


          <div className="flex flex-col gap-2">

            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  font-semibold

                  ${
                    item.title === "Lead-uri"
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                {item.title}

              </Link>
            ))}

          </div>


          <div className="mt-auto pt-6 border-t">

            <div className="font-bold text-gray-900">
              Cosram Auto
            </div>

            <div className="text-gray-500 text-sm">
              CRM v1.5.9
            </div>

          </div>

        </div>

      </aside>
    </>
  );
}
