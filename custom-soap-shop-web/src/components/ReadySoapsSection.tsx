"use client";

import { useRef } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Soap } from "@/types/catalog";

type ReadySoapsSectionProps = {
  readySoaps: Soap[];
};

export function ReadySoapsSection({ readySoaps }: ReadySoapsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    scrollContainerRef.current?.scrollBy({
      left: -340,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollContainerRef.current?.scrollBy({
      left: 340,
      behavior: "smooth",
    });
  }

  return (
    <section id="ready-soaps" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#7A6655]">
          Ready to order
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Ready soaps
        </h2>

        <p className="mt-2 text-[#7A6655]">
          Our configured soaps, ready to order.
        </p>
      </div>

      {readySoaps.length === 0 ? (
        <div className="rounded-3xl border border-[#E7D8C4] bg-[#FFFDF8] p-8 text-[#7A6655]">
          No ready soaps available yet.
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6C3AA] bg-[#FFFDF8]/95 text-3xl font-semibold text-[#5B3A29] shadow-lg transition hover:scale-105 hover:bg-[#F1E4D2]"
          >
            ‹
          </button>

          <div
            ref={scrollContainerRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-16 pb-8 pt-5"
          >
            {readySoaps.map((soap) => (
              <article
                key={soap.id}
                className="min-w-72 rounded-3xl border border-[#E7D8C4] bg-[#FFFDF8] p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {soap.imageUrl ? (
                  <img
                    src={soap.imageUrl}
                    alt={soap.name}
                    className="mb-5 h-48 w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-[#EFE2D1] text-[#8A6F5A]">
                    Soap image
                  </div>
                )}

                <div className="mb-3 inline-flex rounded-full bg-[#E8DCC3] px-3 py-1 text-xs font-semibold text-[#5B3A29]">
                  {soap.soapVariation.name}
                </div>

                <h3 className="text-xl font-semibold">{soap.name}</h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#7A6655]">
                  {soap.description}
                </p>

                <p className="mt-3 text-sm text-[#7A6655]">
                  Aromas:{" "}
                  {soap.fragrances.length > 0
                    ? soap.fragrances
                        .map((fragrance) => fragrance.name)
                        .join(" + ")
                    : "None"}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold">
                    {Number(soap.price).toFixed(2)} лв.
                  </span>

                  <AddToCartButton soap={soap} />
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6C3AA] bg-[#FFFDF8]/95 text-3xl font-semibold text-[#5B3A29] shadow-lg transition hover:scale-105 hover:bg-[#F1E4D2]"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
