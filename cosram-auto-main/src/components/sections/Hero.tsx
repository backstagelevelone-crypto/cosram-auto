"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  Gauge,
  Clock,
  Calculator,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const whatsappHeroLink = `${SITE.whatsapp}?text=${encodeURIComponent(
  "Salut! Sunt interesat de o mașină rulate."
)}`;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallbackImage, setUseFallbackImage] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || useFallbackImage) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      void video.play().catch(() => setUseFallbackImage(true));
    };

    const onError = () => setUseFallbackImage(true);

    playVideo();
    video.addEventListener("canplay", playVideo);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("error", onError);
    };
  }, [useFallbackImage]);

  useGSAP(
    () => {
      const scope = heroRef.current;
      if (!scope) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-item]", { opacity: 1, y: 0, visibility: "visible" });
        gsap.set("[data-hero-content]", { pointerEvents: "auto" });
        gsap.set("[data-hero-overlay]", { opacity: 1 });
        gsap.set("[data-hero-media]", { scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-hero-item]", { opacity: 0, y: 36, visibility: "hidden" });
        gsap.set("[data-hero-content]", { pointerEvents: "none" });
        gsap.set("[data-hero-overlay]", { opacity: 0.55 });
        gsap.set("[data-hero-media]", { scale: 1.08 });

        gsap.to("[data-hero-media]", {
          scale: 1,
          duration: 3,
          ease: "power2.out",
        });

        let revealed = false;

        const revealText = () => {
          if (revealed) return;
          revealed = true;

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to("[data-hero-overlay]", { opacity: 1, duration: 0.8 }, 0)
            .to(
              "[data-hero-item]",
              {
                opacity: 1,
                y: 0,
                visibility: "visible",
                duration: 0.9,
                stagger: 0.1,
              },
              0
            )
            .set("[data-hero-content]", { pointerEvents: "auto" }, 0);
        };

        const onScroll = () => {
          if (window.scrollY > 20) revealText();
        };

        const onWheel = (event: WheelEvent) => {
          if (event.deltaY > 0) revealText();
        };

        let touchStartY = 0;
        const onTouchStart = (event: TouchEvent) => {
          touchStartY = event.touches[0]?.clientY ?? 0;
        };
        const onTouchMove = (event: TouchEvent) => {
          const y = event.touches[0]?.clientY ?? 0;
          if (touchStartY - y > 18) revealText();
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        ScrollTrigger.create({
          trigger: scope,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            if (self.scroll() > 24) revealText();
          },
        });

        return () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchmove", onTouchMove);
        };
      });

      return () => mm.revert();
    },
    { scope: heroRef, dependencies: [useFallbackImage] }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#080808]"
    >
      <div
        data-hero-media
        className="absolute inset-0 z-0 will-change-transform"
      >
        {useFallbackImage ? (
          <Image
            src="/hero-car.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-[52%_center]"
          />
        ) : (
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            className="h-full w-full object-cover object-[62%_center] sm:object-[58%_center] lg:object-[52%_center]"
          />
        )}
      </div>

      <div
        data-hero-overlay
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/88 via-[#080808]/45 to-transparent lg:from-[#080808]/82 lg:via-[#080808]/28 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-[#080808]/15 to-[#080808]/25" />
        <div className="hero-glow-left opacity-50" />
        <div className="hero-glow-right opacity-35" />
        <div className="hero-diagonal-grid absolute inset-0 opacity-20" />
        <div className="hero-grain absolute inset-0 opacity-80" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-6 pb-20 pt-[88px] md:px-12 lg:px-16 lg:pb-24 lg:pt-[96px]">
        <div data-hero-content className="w-full max-w-2xl">
          <p
            data-hero-item
            className="mb-5 font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.22em] text-[#C8102E] md:text-sm"
          >
            Rate auto în 15 minute · Buzău
          </p>

          <h1 data-hero-item className="max-w-[640px]">
            <span className="block font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,5.8vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white">
              Mașini doar de la proprietari.
            </span>
            <span className="mt-1 block font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,5.8vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-[#C8102E]">
              Prețuri mici, fără surprize.
            </span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-lg font-[family-name:var(--font-outfit)] text-base font-normal leading-relaxed text-[#9A9A9A] md:text-[17px] md:leading-[1.7]"
          >
            Mașini verificate, istoric transparent și finanțare online rapidă.
            Calculează rata, sună-ne sau scrie pe WhatsApp — te ajutăm imediat.
          </p>

          <div
            data-hero-item
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <a
              href="#rate"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-8 py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all duration-300 hover:bg-[#A50E26] hover:shadow-[0_8px_28px_rgba(200,16,46,0.4)] sm:w-auto"
            >
              <Calculator className="h-4 w-4" />
              Calculează rata
            </a>
            <a
              href="#stoc"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-white/90 px-8 py-3.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#111111] sm:w-auto"
            >
              Vezi stocul
            </a>
          </div>

          <p
            data-hero-item
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-outfit)] text-sm text-white/50"
          >
            <span>Sau contactează-ne:</span>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <Phone className="h-3.5 w-3.5 text-[#C8102E]" />
              Sună
            </a>
            <span aria-hidden className="text-white/25">
              ·
            </span>
            <a
              href={whatsappHeroLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#C8102E]" />
              WhatsApp
            </a>
          </p>

          <div
            data-hero-item
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {[
              { icon: Clock, label: "Rate în 15 min" },
              { icon: ShieldCheck, label: "Garanție 12 luni" },
              { icon: Gauge, label: "Km reali" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="hero-glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-[family-name:var(--font-outfit)] text-xs font-medium text-white/75 sm:text-sm sm:text-white/80"
              >
                <Icon className="h-3 w-3 text-[#C8102E]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
