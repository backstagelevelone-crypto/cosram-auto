"use client";

import { MessageCircle, FileText } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Button 1: Butonul nou ALB cu contur alb care deschide un formular/mesaj */}
      <a
        href={`${SITE.whatsapp}?text=Buna%20ziua,%20doresc%20sa%20completez%20formularul%20pentru%20finantare.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Completează formularul de finanțare"
        className="flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white bg-white/10 px-5 text-white backdrop-blur-md shadow-[0_8px_24px_rgba(256,256,256,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/20"
      >
        <FileText className="h-5 w-5" />
        <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-wider">
          FORMULAR
        </span>
      </a>

      {/* Button 2: Butonul existent ROȘU pe care scrie RATE */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactează-ne pe WhatsApp pentru RATE"
        className="whatsapp-pulse flex h-14 items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 text-white shadow-[0_8px_24px_rgba(200,16,46,0.4)] transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-wider">
          RATE
        </span>
      </a>
    </div>
  );
}
