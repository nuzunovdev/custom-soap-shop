"use client";

import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSectionVisible(entry.isIntersecting);
        },
        {
          threshold: 0.3,
        },
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
      observer.disconnect();
    };
  }, []);

  return (
      <section
          ref={sectionRef}
          className={`mx-auto grid max-w-6xl gap-10 px-6 py-20 transition-all duration-[1200ms] ease-out md:grid-cols-2 md:items-center ${
              isSectionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
          }`}
      >
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#7A6655]">
            Handmade custom soaps
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Create your own handmade soap.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#7A6655]">
            Choose the soap type, combine your favorite aromas, and add custom
            initials for the soap and box.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
                href="#create"
                className="rounded-full bg-[#5B3A29] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#3F281D]"
            >
              Create your soap
            </a>

            <a
                href="#ready-soaps"
                className="rounded-full border border-[#D6C3AA] px-6 py-3 text-center text-sm font-semibold transition hover:bg-[#F1E4D2]"
            >
              View ready soaps
            </a>
          </div>
        </div>

        <div className="relative h-80 overflow-hidden rounded-3xl border border-[#E7D8C4] bg-[#EFE2D1] shadow-xl">
          <video
              src="/videos/soap-promo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2F261F]/35 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-widest">
              Handmade process
            </p>

            <p className="mt-1 text-sm text-white/85">
              Crafted in small batches with care.
            </p>
          </div>
        </div>
      </section>
  );
}