"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { CarImageSlide } from "@/components/ui/CarImageSlide";

interface CarLightboxProps {
  images: string[];
  carName: string;
  initialIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function CarLightbox({
  images,
  carName,
  initialIndex,
  open,
  onClose,
  onIndexChange,
}: CarLightboxProps) {
  const safeImages = useMemo(
    () => (images?.length ? images : ["placeholder-1"]),
    [images]
  );
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const safeIndex = Math.min(
    Math.max(index, 0),
    safeImages.length - 1
  );

  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setDirection(0);
    }
  }, [open, initialIndex]);

  const paginate = useCallback(
    (newDirection: number) => {
      const next = index + newDirection;
      if (next < 0 || next >= safeImages.length) return;
      setDirection(newDirection);
      setIndex(next);
      onIndexChange?.(next);
    },
    [index, safeImages.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, paginate]);

  if (!open) return null;

  const variants = {
    enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie ${carName}`}
    >
      <div className="flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <span className="text-sm font-medium text-white/80">
          {safeIndex + 1} / {safeImages.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Închide galeria"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center overflow-hidden">
        <button
          type="button"
          onClick={() => paginate(-1)}
          disabled={safeIndex === 0}
          aria-label="Imaginea anterioară"
          className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white disabled:opacity-30 lg:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={safeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.x < -80 || velocity.x < -400) paginate(1);
              else if (offset.x > 80 || velocity.x > 400) paginate(-1);
            }}
            className="relative h-full w-full"
          >
            <CarImageSlide
              src={safeImages[safeIndex] ?? "placeholder-1"}
              alt={`${carName} — imagine ${safeIndex + 1}`}
              priority
              sizes="100vw"
              className="!object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => paginate(1)}
          disabled={safeIndex === safeImages.length - 1}
          aria-label="Imaginea următoare"
          className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white disabled:opacity-30 lg:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        {safeImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Imagine ${i + 1}`}
            onClick={() => {
              setDirection(i > safeIndex ? 1 : -1);
              setIndex(i);
              onIndexChange?.(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === safeIndex ? "w-6 bg-[#C8102E]" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
