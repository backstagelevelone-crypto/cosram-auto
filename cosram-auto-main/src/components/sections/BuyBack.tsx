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

          <h2 className="mt-3 text-4xl font-bold text-[#111111]">
            Ai deja o mașină?
          </h2>

          <p className="mt-4 text-lg text-[#6B6B6B]">
            O evaluăm gratuit și o poți folosi ca avans pentru
            achiziționarea unei mașini din stocul nostru.
          </p>

          <div className="mt-10">
            <a
              href="https://wa.me/40773865488?text=Bună%20ziua!%20Doresc%20o%20evaluare%20Buy-Back."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#C8102E] px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Solicită evaluarea
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
