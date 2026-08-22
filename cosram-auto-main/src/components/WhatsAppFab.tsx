"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppFab() {
  const whatsappLink = SITE.whatsapp;

  const trackContactClick = (tipContact: string) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        contact_type: tipContact,
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("WhatsApp")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
