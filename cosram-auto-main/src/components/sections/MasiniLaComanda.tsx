"use client";

import { motion } from "framer-motion";

export default function MasiniLaComanda() {
  return (
    <section
      id="masini-la-comanda"
      className="bg-[#FAFAFA] py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Import la comandă
          </p>

          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl">
            Nu găsești mașina dorită?
          </h2>

          <p className="mt-3 max-w-2xl text-[#6B6B6B]">
            Îți aducem autoturismul dorit din Europa, verificat și selectat
            conform cerințelor tale. Ne ocupăm de căutare, verificare,
            transport și documentație.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#ECECEC] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8102E] text-white font-bold">
              1
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#111111]">
              Ne spui ce cauți
            </h3>

            <p className="text-[#6B6B6B]">
              Marcă, model, motorizare, an, kilometri și buget.
            </p>
          </div>

          <div className="rounded-3xl border border-[#ECECEC] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8102E] text-white font-bold">
              2
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#111111]">
              Căutăm și verificăm
            </h3>

            <p className="text-[#6B6B6B]">
              Analizăm ofertele disponibile și verificăm istoricul
              autoturismului.Va vom face o oferta dupa care se achita avansul de 50% iar la achizitia masinii restul de 50%
            </p>
          </div>

          <div className="rounded-3xl border border-[#ECECEC] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C8102E] text-white font-bold">
              3
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#111111]">
              Livrăm în România
            </h3>

            <p className="text-[#6B6B6B]">
              Ne ocupăm de transport și documentele necesare până la predare.
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/40771165844?text=Bună%20ziua!%20Sunt%20interesat%20de%20o%20mașină%20la%20comandă."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#C8102E] px-8 py-4 text-sm font-semibold text-white transition hover:scale-105"
          >
            Solicită o ofertă
          </a>
        </div>
      </div>
    </section>
  );
}
