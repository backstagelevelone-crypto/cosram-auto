"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Fuel, Gauge } from "lucide-react";
import type { Car } from "@/types/car";
import { CarImageSlide } from "@/components/ui/CarImageSlide";
import {
  buildCarName,
  buildCarTitle,
  formatLocaleNumber,
  formatPrice,
  isCarClickable,
} from "@/lib/car-display";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  index: number;
}

function MaybeLink({
  href,
  disabled,
  className,
  children,
}: {
  href: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function CarCard({ car, index }: CarCardProps) {
  const isSold = car.status === "vandut";
  const clickable = isCarClickable(car);
  const href = car.slug ? `/masini/${car.slug}` : "#";
  const imageSrc = car.images?.[0] ?? "placeholder-1";
  const title = buildCarTitle(car);
  const displayName = buildCarName(car);
  const tags = [
    car.fuel,
    car.transmission,
    car.year != null ? String(car.year) : null,
  ].filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "group overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white transition-all duration-300 ease-out",
        isSold || !clickable
          ? "cursor-not-allowed opacity-75 saturate-[0.85]"
          : "hover:-translate-y-1 hover:border-l-4 hover:border-l-[#C8102E] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
      )}
    >
      <MaybeLink
        href={href}
        disabled={!clickable}
        className="relative block w-full"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#111111]">
          <CarImageSlide
            src={imageSrc}
            alt={displayName}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "transition-transform duration-500",
              clickable && "group-hover:scale-105"
            )}
          />
          {isSold ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              VÂNDUT
            </span>
          ) : car.status === "disponibil" || car.status === "rezervat" ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Disponibil
            </span>
          ) : null}
          {car.price != null ? (
            <span className="absolute right-3 top-3 z-10 rounded-full bg-[#C8102E] px-3 py-1 text-sm font-bold text-white">
              {formatPrice(car.price)}
            </span>
          ) : null}
        </div>
      </MaybeLink>

      <div className="p-4 md:p-5">
        {tags.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F7F7F7] px-2.5 py-0.5 text-xs text-[#6B6B6B]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <MaybeLink href={href} disabled={!clickable}>
          <h3 className="font-[family-name:var(--font-syne)] text-base font-bold text-[#111111] transition-colors group-hover:text-[#C8102E] md:text-lg">
            {title}
          </h3>
        </MaybeLink>

        {(car.year != null || car.engine || car.km != null) && (
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#6B6B6B] md:text-sm">
            {car.year != null ? (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
                {car.year}
              </span>
            ) : null}
            {car.engine ? (
              <span className="flex items-center gap-1.5">
                <Fuel className="h-3.5 w-3.5" strokeWidth={1.75} />
                {car.engine}
              </span>
            ) : null}
            {car.km != null ? (
              <span className="flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5" strokeWidth={1.75} />
                {formatLocaleNumber(car.km)} km
              </span>
            ) : null}
          </div>
        )}

        {isSold ? (
          <p className="mt-4 text-sm font-medium text-[#6B6B6B]">Indisponibil</p>
        ) : clickable ? (
          <MaybeLink
            href={href}
            className="mt-4 inline-block text-sm font-medium text-[#C8102E] transition-colors hover:underline"
          >
            Vezi detalii →
          </MaybeLink>
        ) : (
          <p className="mt-4 text-sm font-medium text-[#6B6B6B]">
            Detalii indisponibile
          </p>
        )}
      </div>
    </motion.article>
  );
}
