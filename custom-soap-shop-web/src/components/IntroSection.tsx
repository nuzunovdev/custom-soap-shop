"use client";

import { useEffect, useRef, useState } from "react";

export function IntroSection() {
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
          id="about"
          className={`bg-[#FFFDF8] py-16 transition-all duration-[1200ms] ease-out ${
              isSectionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7A6655]">
              What we offer
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Handmade soaps with a personal touch.
            </h2>
          </div>

          <div className="space-y-5 text-[#7A6655] md:col-span-2">
            <p>
              We create handmade soaps with carefully selected oils, aromas and
              simple customization options.
            </p>

            <p>
              You can choose a ready soap from our collection or create your own
              combination by selecting the soap type, aromas and custom initials.
            </p>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E7D8C4] bg-[#FAF4EA] p-5">
                <h3 className="font-semibold text-[#2F261F]">Handmade</h3>

                <p className="mt-2 text-sm">
                  Small batches made with attention to detail.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7D8C4] bg-[#FAF4EA] p-5">
                <h3 className="font-semibold text-[#2F261F]">Custom</h3>

                <p className="mt-2 text-sm">
                  Choose soap type, aroma blend and initials.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7D8C4] bg-[#FAF4EA] p-5">
                <h3 className="font-semibold text-[#2F261F]">Gift Ready</h3>

                <p className="mt-2 text-sm">
                  Perfect for personal gifts and small occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}