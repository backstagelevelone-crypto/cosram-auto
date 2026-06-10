"use client";

import Image from "next/image";
import { Car as CarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPlaceholderGradient,
  isLocalImage,
  isRemoteImage,
  imageSlideClassName,
} from "@/lib/car-images";

interface CarImageSlideProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function CarImageSlide({
  src,
  alt,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: CarImageSlideProps) {
  if (isLocalImage(src)) {
    const isSvg = src.endsWith(".svg");

    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={90}
        sizes={sizes}
        unoptimized={isSvg}
        className={imageSlideClassName(className)}
      />
    );
  }

  if (isRemoteImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={90}
        sizes={sizes}
        className={imageSlideClassName(className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        getPlaceholderGradient(src),
        className
      )}
    >
      <CarIcon className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-white/15" />
    </div>
  );
}
