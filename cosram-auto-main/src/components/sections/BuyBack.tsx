"use client";

import { motion } from "framer-motion";

export default function BuyBack() {
  return (
    <section
      id="buy-back"
      className="bg-white py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            BUY-BACK
          </p>

          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-5xl">
            Ai deja o mașină?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#6B6B6B]">
            O evaluăm gratuit și o poți folosi ca avans pentru achiziționarea
            unei mașini din stocul nostru. Rapid, simplu și fără bătăi de cap.
          </p>
        </motion.div>

        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10"
        >
          <video
  className="w-full"
  autoPlay
  muted
  loop
  playsInline
  controls
  preload="metadata"
>
  <source src="/video/buyback.mp4" type="video/mp4" />
  Browserul tău nu suportă redarea videoclipului.
</video>
        </motion.div>

        {/* BENEFICII */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-8 text-center">
            <div className="mb-4 text-5xl">🚗</div>

            <h3 className="text-xl font-semibold text-[#111111]">
              Evaluare rapidă
            </h3>

            <p className="mt-3 text-[#6B6B6B]">
              Primești o ofertă corectă pentru autoturismul tău.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-8 text-center">
            <div className="mb-4 text-5xl">💶</div>

            <h3 className="text-xl font-semibold text-[#111111]">
              Folosești mașina ca avans
            </h3>

            <p className="mt-3 text-[#6B6B6B]">
              Valoarea acesteia se scade din noua achiziție.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ECECEC] bg-[#FAFAFA] p-8 text-center">
            <div className="mb-4 text-5xl">📄</div>

            <h3 className="text-xl font-semibold text-[#111111]">
              Acte complete
            </h3>

            <p className="mt-3 text-[#6B6B6B]">
              Noi ne ocupăm de toate formalitățile.
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-14 flex justify-center">

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
            className="inline-flex items-center rounded-full bg-[#C8102E] px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#A50E26]"
          >
            Solicită evaluarea pe WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}
