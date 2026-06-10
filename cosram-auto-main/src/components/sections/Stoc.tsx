"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Car } from "@/types/car";
import CarCard from "@/components/ui/CarCard";

const bodyFilters = ["All", "SUV", "Sedan", "Hatchback", "Break"] as const;
type BodyFilter = (typeof bodyFilters)[number];

type StockTab = "all" | "available" | "sold";

const stockTabs: { id: StockTab; label: string }[] = [
  { id: "all", label: "Toate" },
  { id: "available", label: "Disponibile" },
  { id: "sold", label: "Vândute" },
];

const STATUS_ORDER: Record<Car["status"], number> = {
  disponibil: 0,
  rezervat: 1,
  vandut: 2,
};

function sortByStatus(cars: Car[]): Car[] {
  return [...cars].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  );
}

function filterByTab(cars: Car[], tab: StockTab): Car[] {
  switch (tab) {
    case "available":
      return cars.filter(
        (car) => car.status === "disponibil" || car.status === "rezervat"
      );
    case "sold":
      return cars.filter((car) => car.status === "vandut");
    default:
      return cars;
  }
}

function filterByBody(cars: Car[], body: BodyFilter): Car[] {
  if (body === "All") return cars;
  return cars.filter((car) => car.category === body);
}

interface StocProps {
  cars: Car[];
}

export default function Stoc({ cars }: StocProps) {
  const [stockTab, setStockTab] = useState<StockTab>("all");
  const [bodyFilter, setBodyFilter] = useState<BodyFilter>("All");

  const showBodyFilters = stockTab === "all" || stockTab === "available";

  const filtered = useMemo(() => {
    const byTab = filterByTab(cars, stockTab);
    const byBody = showBodyFilters
      ? filterByBody(byTab, bodyFilter)
      : byTab;
    return sortByStatus(byBody);
  }, [cars, stockTab, bodyFilter, showBodyFilters]);

  const handleStockTabChange = (tab: StockTab) => {
    setStockTab(tab);
    setBodyFilter("All");
  };

  const emptyMessage =
    stockTab === "sold"
      ? "Nu există mașini vândute momentan."
      : bodyFilter !== "All"
        ? "Nu există mașini în această categorie momentan."
        : stockTab === "available"
          ? "Nu există mașini disponibile momentan."
          : "Nu există mașini în stoc momentan.";

  return (
    <section id="stoc" className="bg-white py-24 px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
            Stocul Nostru
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-[#111111] md:text-4xl">
            Mașini verificate, gata de drum
          </h2>
          <p className="mt-3 max-w-xl text-[#6B6B6B]">
            Toate mașinile sunt verificate tehnic și au istoricul complet.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2.5">
            {stockTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleStockTabChange(tab.id)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-base font-semibold transition-all duration-300 ease-out",
                  stockTab === tab.id
                    ? "bg-[#C8102E] text-white shadow-[0_4px_12px_rgba(200,16,46,0.3)]"
                    : "bg-[#F7F7F7] text-[#6B6B6B] hover:bg-[#EFEFEF]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {showBodyFilters ? (
              <motion.div
                key="body-filters"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="-mx-1 mt-4 flex flex-wrap gap-x-3 gap-y-1"
              >
                {bodyFilters.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setBodyFilter(cat)}
                    className={cn(
                      "border-b-2 px-1 py-0.5 text-xs font-medium transition-colors duration-200 ease-out md:text-sm",
                      bodyFilter === cat
                        ? "border-[#C8102E] text-[#C8102E]"
                        : "border-transparent text-[#9A9A9A] hover:text-[#555555]"
                    )}
                  >
                    {cat === "All" ? "Toate" : cat}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[#6B6B6B]">{emptyMessage}</p>
        ) : null}
      </div>
    </section>
  );
}
