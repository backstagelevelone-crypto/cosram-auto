"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import {
  COOKIE_CONSENT_KEY,
  DEFAULT_CONSENT,
  type CookieConsent,
} from "@/lib/company";

function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

function saveConsent(consent: Omit<CookieConsent, "timestamp">) {
  const payload: CookieConsent = {
    ...consent,
    necessary: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload));
  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", { detail: payload })
  );
  return payload;
}

export function getStoredConsent(): CookieConsent | null {
  return readConsent();
}

export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setShowSettings(false);
  }, []);

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    close();
  };

  const rejectNonEssential = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    close();
  };

  const savePreferences = () => {
    saveConsent({ necessary: true, analytics, marketing });
    close();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-5 shadow-[0_-8px_40px_rgba(0,0,0,0.12)] sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F2F7] sm:flex">
            <Cookie className="h-5 w-5 text-[#C8102E]" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h2
                id="cookie-banner-title"
                className="font-[family-name:var(--font-syne)] text-base font-bold text-[#111111] sm:text-lg"
              >
                Preferințe cookies
              </h2>
              <button
                type="button"
                onClick={rejectNonEssential}
                aria-label="Închide și acceptă doar cookies necesare"
                className="shrink-0 rounded-lg p-1 text-[#6B6B6B] hover:bg-[#F7F7F7] hover:text-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p
              id="cookie-banner-desc"
              className="mt-2 font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-[#6B6B6B]"
            >
              Folosim cookies necesare pentru funcționarea site-ului. Cu acordul
              tău, folosim și cookies de analiză și marketing (inclusiv Meta Pixel
              pentru reclame). Poți accepta toate, refuza pe cele opționale sau
              personaliza. Detalii în{" "}
              <Link
                href="/politica-cookies"
                className="font-medium text-[#C8102E] underline-offset-2 hover:underline"
              >
                Politica de cookies
              </Link>{" "}
              și{" "}
              <Link
                href="/politica-de-confidentialitate"
                className="font-medium text-[#C8102E] underline-offset-2 hover:underline"
              >
                Politica de confidențialitate
              </Link>
              .
            </p>

            {showSettings && (
              <div className="mt-4 space-y-3 rounded-xl bg-[#F7F7F7] p-4">
                <label className="flex items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-outfit)] text-sm text-[#111111]">
                    <span className="font-semibold">Strict necesare</span>
                    <span className="mt-0.5 block text-xs text-[#6B6B6B]">
                      Obligatorii — nu pot fi dezactivate
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4 accent-[#C8102E]"
                  />
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-outfit)] text-sm text-[#111111]">
                    <span className="font-semibold">Analiză</span>
                    <span className="mt-0.5 block text-xs text-[#6B6B6B]">
                      Google Analytics — trafic anonimizat
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-4 w-4 accent-[#C8102E]"
                  />
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-outfit)] text-sm text-[#111111]">
                    <span className="font-semibold">Marketing</span>
                    <span className="mt-0.5 block text-xs text-[#6B6B6B]">
                      Meta Pixel — măsurare conversii reclame
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-4 w-4 accent-[#C8102E]"
                  />
                </label>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-[#C8102E] px-5 py-2.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-colors hover:bg-[#A50E26]"
              >
                Accept toate
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-[rgba(0,0,0,0.12)] bg-white px-5 py-2.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F7F7F7]"
              >
                Doar necesare
              </button>
              <button
                type="button"
                onClick={() =>
                  showSettings ? savePreferences() : setShowSettings(true)
                }
                className="rounded-full px-5 py-2.5 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#6B6B6B] transition-colors hover:text-[#111111]"
              >
                {showSettings ? "Salvează preferințele" : "Personalizează"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(DEFAULT_CONSENT);

  useEffect(() => {
    setConsent(readConsent());
    const handler = (e: Event) => {
      setConsent((e as CustomEvent<CookieConsent>).detail);
    };
    window.addEventListener("cookie-consent-updated", handler);
    return () => window.removeEventListener("cookie-consent-updated", handler);
  }, []);

  return consent;
}
