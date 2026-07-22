"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactează-ne pe WhatsApp pentru RATE"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 flex h-14 items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 text-white shadow-[0_8px_24px_rgba(200,16,46,0.4)] transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-wider">
        RATE
      </span>
    </a>
  );
}
