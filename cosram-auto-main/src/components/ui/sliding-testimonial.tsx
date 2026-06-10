"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { reviews } from "@/data/reviews";

export interface Testimonial {
  name: string;
  profession: string;
  description: string;
  avatar: string;
  badge?: string;
}

const defaultTestimonials: Testimonial[] = reviews.map((review) => ({
  name: review.name,
  profession: review.car ?? "Client Cosram Auto",
  description: review.text,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=C8102E&color=fff&size=128&bold=true`,
  badge: "Google Reviews",
}));

interface SlidingTestimonialProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  googleRating?: string;
  className?: string;
}

export default function SlidingTestimonial({
  testimonials = defaultTestimonials,
  title = "Ce spun clienții noștri",
  subtitle = "Recenzii reale de la clienți mulțumiți — finanțare rapidă, mașini verificate și transparență totală.",
  googleRating = "4.9/5 pe Google",
  className,
}: SlidingTestimonialProps) {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="mb-10 text-center">
          <p className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Recenzii
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-outfit)] text-base leading-relaxed text-[#6B6B6B] md:text-lg">
            {subtitle}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#C8102E] text-[#C8102E]"
                  strokeWidth={1.75}
                />
              ))}
            </div>
            <span className="font-[family-name:var(--font-outfit)] font-medium text-[#111111]">
              {googleRating}
            </span>
          </div>
        </div>

        <div
          className="relative max-w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="animate-x-slider group/slider flex w-max gap-5 hover:[animation-play-state:paused]">
            {duplicatedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="flex h-full w-[min(600px,85vw)] shrink-0 grow-0 flex-col rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <p className="px-5 py-6 font-[family-name:var(--font-outfit)] text-lg font-light leading-relaxed tracking-tight text-[#111111] sm:px-6 sm:py-7 sm:text-xl md:text-2xl">
                  &ldquo;{testimonial.description}&rdquo;
                </p>
                <div className="mt-auto flex w-full overflow-hidden border-t border-[rgba(0,0,0,0.08)]">
                  <div className="flex w-3/4 items-center gap-3 px-4 py-4 sm:px-5">
                    <Image
                      src={testimonial.avatar}
                      alt=""
                      width={48}
                      height={48}
                      unoptimized
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-[family-name:var(--font-syne)] text-base font-semibold text-[#111111] md:text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="truncate font-[family-name:var(--font-outfit)] text-sm text-[#6B6B6B] md:text-base">
                        {testimonial.profession}
                      </p>
                    </div>
                  </div>
                  <div className="w-px bg-[rgba(0,0,0,0.08)]" />
                  <div className="flex max-w-[30%] flex-none items-center self-center px-4">
                    <span className="font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-wide text-[#6B6B6B] sm:text-sm">
                      {testimonial.badge ?? "Cosram Auto"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
