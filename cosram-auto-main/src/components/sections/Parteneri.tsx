"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DISPLAY_PARTNERS } from "@/lib/constants";

export default function Parteneri() {
  return (
    <section
      id="parteneri"
      className="border-b border-[rgba(0,0,0,0.06)] bg-[#F7F7F7] py-12 px-6 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]"
        >
          Partenerii noștri de încredere
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20"
        >
          {DISPLAY_PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label={partner.name}
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="h-10 w-auto max-w-[160px] object-contain md:h-12"
              />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
