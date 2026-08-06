"use client";

import { motion } from "framer-motion";

export default function BuyBack() {
  return (
    <section
      id="buy-back"
      className="bg-white py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            BUY-BACK
          </p>

          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl">
            Ai deja o mașină?
          </h2>

          <p className="mt-4 text-lg text-[#6B6B6B]">
            O evaluăm gratuit și o poți folosi ca avans pentru
            achiziționarea unei mașini din stocul nostru.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-6">
              <div className="mb-3 text-3xl">🚗</div>
              <h3 className="font-semibold text-[#111111]">
                Evaluare rapidă
              </h3>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                Primești o ofertă corectă pentru autoturismul tău.
              </p>
            </div>

            <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-6">
              <div className="mb-3 text-3xl">💶</div>
              <h3 className="font-semibold text-[#111111]">
                Folosești mașina ca avans
              </h3>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                Valoarea autoturismului se scade din noua achiziție.
              </p>
            </div>

            <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-6">
              <div className="mb-3 text-3xl">📄</div>
              <h3 className="font-semibold text-[#111111]">
                Ne ocupăm de acte
              </h3>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                Tot procesul este simplu, rapid și fără bătăi de cap.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href={`https://wa.me/40773865488?text=${encodeURIComponent(
`Bună ziua!

Sunt interesat de programul Buy-Back și doresc o evaluare pentru autoturismul meu.

Marcă:
Model:
An fabricație:
Kilometri:
Preț dorit:

Aștept să fiu contactat.

Mulțumesc!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[#C8102E] px-8 py-4 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#A50E26]"
            >
              Solicită evaluarea pe WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
