"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import {
  FB_PROMPT_MIN_TIME_MS,
  FB_PROMPT_SESSION_KEY,
  SITE,
} from "@/lib/constants";
import { getStoredConsent } from "@/components/CookieBanner";
import { FacebookIcon } from "@/components/icons/FacebookIcon";

const whatsappPromptLink = `${SITE.whatsapp}?text=${encodeURIComponent(
  "Salut! Am nevoie de mai multe detalii despre mașinile din stoc."
)}`;

function isDismissedThisSession(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(FB_PROMPT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissedThisSession() {
  try {
    sessionStorage.setItem(FB_PROMPT_SESSION_KEY, "1");
  } catch {
    /* ignore */
  }
}

export default function FacebookScrollPrompt() {
  const reducedMotion = useReducedMotion();
  const [timeElapsed, setTimeElapsed] = useState(false);
  const [pastServicii, setPastServicii] = useState(false);
  const [cookiesAnswered, setCookiesAnswered] = useState(false);
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    markDismissedThisSession();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (isDismissedThisSession()) return;

    const timer = window.setTimeout(() => setTimeElapsed(true), FB_PROMPT_MIN_TIME_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDismissedThisSession()) return;

    const stoc = document.getElementById("stoc");
    if (!stoc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPastServicii(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(stoc);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDismissedThisSession()) return;

    const syncConsent = () => setCookiesAnswered(getStoredConsent() !== null);
    syncConsent();

    window.addEventListener("cookie-consent-updated", syncConsent);
    return () => window.removeEventListener("cookie-consent-updated", syncConsent);
  }, []);

  useEffect(() => {
    if (
      isDismissedThisSession() ||
      !timeElapsed ||
      !pastServicii ||
      !cookiesAnswered
    ) {
      return;
    }
    setVisible(true);
  }, [timeElapsed, pastServicii, cookiesAnswered]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const handleCtaClick = () => {
    markDismissedThisSession();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Închide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            className="absolute inset-0 bg-[#111111]/50 backdrop-blur-[6px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-prompt-title"
            aria-describedby="contact-prompt-desc"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 12 }
            }
            animate={
              reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={
              reducedMotion
                ? { duration: 0.15 }
                : { type: "spring", damping: 28, stiffness: 320 }
            }
            className="contact-prompt-glass relative w-full max-w-[420px] rounded-3xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Închide dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-[#6B6B6B] transition-colors hover:bg-black/[0.05] hover:text-[#111111]"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              Cosram Auto
            </p>

            <h2
              id="contact-prompt-title"
              className="mt-3 pr-8 font-[family-name:var(--font-syne)] text-xl font-bold leading-snug text-[#111111] sm:text-2xl"
            >
              Ai nevoie de mai multe detalii?
            </h2>

            <p
              id="contact-prompt-desc"
              className="mt-3 font-[family-name:var(--font-outfit)] text-[15px] leading-relaxed text-[#2A2A2A] sm:text-base"
            >
              Suntem aici pentru tine — răspundem rapid pe WhatsApp sau Facebook
              cu informații despre stoc, rate și disponibilitate.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={whatsappPromptLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#C8102E] px-5 py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(200,16,46,0.35)] transition-colors hover:bg-[#A50E26]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                Scrie-ne pe WhatsApp
              </a>

              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1877F2] px-5 py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-colors hover:bg-[#166FE5]"
              >
                <FacebookIcon className="h-5 w-5 shrink-0" />
                Mesaj pe Facebook
              </a>
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="mt-4 w-full py-2 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#111111]"
            >
              Nu acum, mulțumesc
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
