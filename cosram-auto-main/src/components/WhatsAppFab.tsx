"use client";

import { MessageCircle, FileText } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Butonul ALB simplu: Trimite către formular */}
      <a
        href="/formular" // Înlocuiește cu linkul tău exact dacă ai un Google Forms sau pagină specială
        className="flex h-14 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 text-black shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105"
      >
        <FileText className="h-5 w-5 text-neutral-700" />
        <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-wider">
          FORMULAR
        </span>
      </a>

      {/* Butonul ROȘU simplu: Pe care scrie RATE */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 text-white shadow-[0_4px_12px_rgba(200,16,46,0.3)] transition-transform duration-300 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-wider">
          RATE
        </span>
      </a>
    </div>
  );
}
