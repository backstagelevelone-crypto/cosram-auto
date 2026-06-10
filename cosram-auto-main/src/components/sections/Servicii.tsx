"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import {
  Car,
  Shield,
  CreditCard,
  Gauge,
  Sparkles,
  FileCheck,
  Truck,
  Award,
  type LucideIcon,
} from "lucide-react";

const services: { icon: LucideIcon; title: string; description: string }[] =
  [
    {
      icon: Car,
      title: "Numere Roșii Incluse",
      description:
        "Primești mașina cu numere roșii incluse, gata de drum imediat.",
    },
    {
      icon: Shield,
      title: "Garanție 12 Luni",
      description:
        "Garanție completă 12 luni pentru liniștea ta deplină.",
    },
    {
      icon: CreditCard,
      title: "Finanțare Flexibilă",
      description:
        "Rate personalizate, aprobare rapidă în 15 minute.",
    },
    {
      icon: Gauge,
      title: "Km Reali & Verificați",
      description:
        "Kilometraj verificat și documentat, fără modificări.",
    },
    {
      icon: Sparkles,
      title: "Detailing Profesional",
      description:
        "Fiecare mașină este curățată și pregătită profesional.",
    },
    {
      icon: FileCheck,
      title: "Transparență Totală",
      description:
        "Istoric complet, raport tehnic și VIN disponibil.",
    },
    {
      icon: Truck,
      title: "Livrare Imediată",
      description:
        "Livrare rapidă în toată România, direct la ușa ta.",
    },
    {
      icon: Award,
      title: "Selecție Premium",
      description:
        "Doar mașini atent selectate, verificate riguros.",
    },
  ];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Servicii() {
  return (
    <section id="servicii" className="bg-[#F7F7F7] py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Servicii
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl">
            Servicii complete,{" "}
            <span className="text-[#C8102E]">incluse în preț.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={card}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-5 transition-all duration-300 ease-out hover:border-[#C8102E]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] md:p-6"
            >
              <service.icon className="mb-4 h-6 w-6 text-[#C8102E]" />
              <h3 className="font-[family-name:var(--font-syne)] text-sm font-bold text-[#111111] md:text-base">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6B6B6B] md:text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={SITE.whatsapp}
            className="inline-block rounded-full bg-[#C8102E] px-10 py-3.5 text-sm font-medium text-white transition-all duration-300 ease-out hover:-translate-y-px hover:bg-[#A50E26] hover:shadow-[0_8px_24px_rgba(200,16,46,0.35)]"
          >
            PROGRAMEAZĂ O VIZIONARE
          </a>
        </motion.div>
      </div>
    </section>
  );
}
