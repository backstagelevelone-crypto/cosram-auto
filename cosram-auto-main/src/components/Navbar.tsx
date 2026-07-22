"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { BrandWordmark } from "@/components/BrandWordmark";

function LogoBadge({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-[0_2px:14px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.06]",
        className
      )}
    >
      <div className="relative h-8 w-9 overflow-hidden md:h-9 md:w-10">
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          width={160}
          height={64}
          className="h-full w-auto max-w-none object-contain object-left"
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navTone = scrolled ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textClass =
    navTone === "dark"
      ? "text-[#111111] hover:text-[#C8102E]"
      : "text-white/90 hover:text-white";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-out",
          scrolled
            ? "nav-glass border-transparent"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="relative mx-auto flex max-w-7xl flex-col px-6 py-3 md:px-12 lg:px-16">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">

            <div className="flex flex-col gap-1 justify-self-start">
              <Link
                href="/"
                className="flex items-center gap-2.5 sm:gap-3"
                aria-label="Cosram Auto — Acasă"
              >
                <LogoBadge priority />

                <BrandWordmark
                  variant={navTone === "dark" ? "on-light" : "on-dark"}
                  size="sm"
                />
              </Link>

              <div className="flex items-center gap-2.5 md:hidden mt-1 px-1">
                <a href="https://btdirect.ro" target="_blank" rel="noopener noreferrer" className="block">
                  <img src="/partners/bt-direct.svg" alt="BT Direct" className="h-4.5 w-auto object-contain" />
                </a>

                <a href="https://tbibank.ro" target="_blank" rel="noopener noreferrer" className="block">
                  <img src="/partners/tbi-bank.svg" alt="TBI Bank" className="h-3.5 w-auto object-contain" />
                </a>

                <a href="https://mogo.ro" target="_blank" rel="noopener noreferrer" className="block">
                  <img src="/partners/mogo.svg" alt="Mogo" className="h-3.5 w-auto object-contain" />
                </a>
              </div>
            </div>

            <nav className="hidden items-center gap-8 justify-self-center lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300",
                    textClass
                  )}
                >
                  {link.label}

                  {link.label === "Stoc" && (
                    <span className="absolute -top-3 -right-6 rounded-full bg-[#C8102E] px-2 py-0.5 text-[10px] font-bold uppercase leading-none text-white shadow-sm">
                      Nou
                    </span>
                  )}
                </a>
              ))}
            </nav>
                        <div className="flex items-center gap-3 justify-self-end">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className={cn(
                  "hidden items-center gap-2 text-sm font-medium transition-colors duration-300 xl:flex",
                  textClass
                )}
              >
                <Phone className="h-4 w-4 text-[#C8102E]" />
                {SITE.phone}
              </a>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-[#C8102E] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#A50E26] hover:shadow-[0_6px_20px_rgba(200,16,46,0.3)] sm:inline-flex"
              >
                Contactează-ne
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                aria-label="Deschide meniul"
                onClick={() => setMobileOpen(true)}
                className={cn(
                  "rounded-lg p-2 transition-colors duration-300 lg:hidden",
                  navTone === "dark" ? "text-[#111111]" : "text-white"
                )}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="mt-3 hidden w-full justify-end items-center gap-6 pr-2 md:flex">
            <a href="https://btdirect.ro" target="_blank" rel="noopener noreferrer" className="relative h-9 w-40 block opacity-95 transition-opacity hover:opacity-100">
              <img src="/partners/bt-direct.svg" alt="Partener BT Direct" className="h-9 w-auto object-contain" />
            </a>

            <a href="https://tbibank.ro" target="_blank" rel="noopener noreferrer" className="relative h-8 w-20 block opacity-95 transition-opacity hover:opacity-100">
              <img src="/partners/tbi-bank.svg" alt="Partener TBI Bank" className="h-8 w-auto object-contain" />
            </a>

            <a href="https://mogo.ro" target="_blank" rel="noopener noreferrer" className="relative h-8 w-16 block opacity-95 transition-opacity hover:opacity-100">
              <img src="/partners/mogo.svg" alt="Partener Mogo" className="h-8 w-auto object-contain" />
            </a>
          </div>
        </div>
      </motion.header>


      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="nav-glass fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="flex h-full flex-col bg-white/80 px-8 py-8 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <LogoBadge />
                  <BrandWordmark variant="on-light" size="sm" />
                </div>

                <button
                  type="button"
                  aria-label="Închide meniul"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-[#111111]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>


              <nav className="mt-16 flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111]"
                  >
                    {link.label}

                    {link.label === "Stoc" && (
                      <span className="ml-3 inline-flex rounded-full bg-[#C8102E] px-2 py-1 align-middle text-[10px] font-bold uppercase text-white">
                        Nou
                      </span>
                    )}
                  </motion.a>
                ))}
              </nav>


              <div className="mt-auto space-y-6">
                <div className="space-y-4">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="flex items-center gap-2 font-medium text-[#111111]"
                  >
                    <Phone className="h-5 w-5 text-[#C8102E]" />
                    {SITE.phone}
                  </a>

                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] py-4 font-medium text-white"
                  >
                    Contactează-ne
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
