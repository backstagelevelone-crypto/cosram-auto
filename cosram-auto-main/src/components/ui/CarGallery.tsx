"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Car as CarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { isRenderableImage, getPlaceholderGradient } from "@/lib/car-images";
import { CarImageSlide } from "@/components/ui/CarImageSlide";
import CarLightbox from "@/components/ui/CarLightbox";

interface CarGalleryProps {
  images: string[];
  carName: string;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  priority?: boolean;
  variant?: "modal" | "page";
}

export default function CarGallery({
  images,
  carName,
  activeIndex,
  onIndexChange,
  priority = false,
  variant = "modal",
}: CarGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const safeImages =
    images?.length ? images : (["placeholder-1"] as string[]);
  const safeIndex = Math.min(
    Math.max(activeIndex, 0),
    safeImages.length - 1
  );

  const prev = () =>
    onIndexChange(
      safeIndex === 0 ? safeImages.length - 1 : safeIndex - 1
    );
  const next = () =>
    onIndexChange(
      safeIndex === safeImages.length - 1 ? 0 : safeIndex + 1
    );

  return (
    <>
      <div
        className={cn(
          "group relative shrink-0 bg-[#111111]",
          variant === "modal" &&
            "lg:col-span-5 lg:sticky lg:top-0 lg:max-h-[94vh] lg:self-start",
          variant === "page" && "overflow-hidden rounded-2xl lg:rounded-3xl"
        )}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={(_, info) => setDragStart(info.point.x)}
          onDragEnd={(_, info) => {
            const delta = info.point.x - dragStart;
            if (delta < -50) next();
            else if (delta > 50) prev();
          }}
          className={cn(
            "relative w-full cursor-grab overflow-hidden active:cursor-grabbing",
            variant === "modal" &&
              "aspect-[4/3] max-h-[50dvh] lg:aspect-[16/10] lg:max-h-none lg:rounded-tl-3xl",
            variant === "page" && "aspect-[4/3] sm:aspect-[16/10]"
          )}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative h-full w-full"
            aria-label="Deschide galeria fullscreen"
          >
            <CarImageSlide
              src={safeImages[safeIndex] ?? "placeholder-1"}
              alt={`${carName} — imagine ${safeIndex + 1}`}
              priority={priority}
            />
          </button>

          <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {safeIndex + 1} / {safeImages.length}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Imaginea anterioară"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md transition-all hover:bg-white lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Imaginea următoare"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md transition-all hover:bg-white lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>

        {/* Mobile: dot indicators */}
        <div className="flex justify-center gap-2 py-3 lg:hidden">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Imagine ${i + 1}`}
              onClick={() => onIndexChange(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === safeIndex ? "w-6 bg-[#C8102E]" : "w-2 bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Desktop: thumbnail strip */}
        <div className="hidden gap-2 overflow-x-auto px-4 py-4 scrollbar-none lg:flex">
          {safeImages.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Imagine ${i + 1}`}
              aria-current={safeIndex === i}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all duration-200",
                safeIndex === i
                  ? "ring-2 ring-[#C8102E] ring-offset-2 ring-offset-[#111111]"
                  : "opacity-50 hover:opacity-80"
              )}
            >
              {isRenderableImage(img) ? (
                <CarImageSlide
                  src={img}
                  alt=""
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    getPlaceholderGradient(img)
                  )}
                >
                  <CarIcon className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white/30" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <CarLightbox
        images={safeImages}
        carName={carName}
        initialIndex={safeIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={onIndexChange}
      />
    </>
  );
}
