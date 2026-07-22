"use client";

import { MessageCircle, FileText } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppFab() {
  // Mesaj extins cu intrebari despre biroul de credit si alte rate active
  const whatsappFormLink = `${SITE.whatsapp}?text=Bună%20ziua!%20Doresc%20să%20aplic%20pentru%20finanțare.%0A%0A✍️%20*FORMULAR%20SOLICITARE*:%0A•%20Nume%20și%20Prenume:%20%0A•%20Telefon:%20%0A•%20Venit%20lunar%20net:%20%0A•%20Marcă%20/%20Model%20mașină%20dorită:%20%0A•%20Mai%20aveți%20și%20alte%20rate%20active?%20(Da/Nu):%20%0A•%20Sunteți%20înscris%20în%20Biroul%20de%20Credit?%20(Da/Nu):%20`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Butonul ALB simplu: Desfășoară formularul complet de text pe WhatsApp */}
      <a
        href={whatsappFormLink}
        target="_blank"
        rel="noopener noreferrer"
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
