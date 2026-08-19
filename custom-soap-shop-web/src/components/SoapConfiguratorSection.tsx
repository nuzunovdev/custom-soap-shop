"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { addCartItem } from "@/lib/cart";
import type { SoapFragrance, SoapVariation } from "@/types/catalog";

const CUSTOM_SOAP_PRICE = 16.99;
const CUSTOM_SOAP_IMAGE_URL = "/images/soaps/custom-soap.jpg";

type SoapConfiguratorSectionProps = {
  soapVariations: SoapVariation[];
  soapFragrances: SoapFragrance[];
};

export function SoapConfiguratorSection({
                                          soapVariations,
                                          soapFragrances,
                                        }: SoapConfiguratorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [selectedSoapVariationId, setSelectedSoapVariationId] = useState("");
  const [selectedFragranceIds, setSelectedFragranceIds] = useState<number[]>(
      [],
  );
  const [initials, setInitials] = useState("");
  const [showAromasColumn, setShowAromasColumn] = useState(false);
  const [showInitialsColumn, setShowInitialsColumn] = useState(false);
  const selectedSoapVariation = soapVariations.find(
      (variation) => variation.id === Number(selectedSoapVariationId),
  );

  const selectedFragrances = soapFragrances.filter((fragrance) =>
      selectedFragranceIds.includes(fragrance.id),
  );

  const hasSelectedSoapType = selectedSoapVariation !== undefined;
  const hasSelectedAromas = selectedFragranceIds.length > 0;

  const canAddToCart = hasSelectedSoapType && hasSelectedAromas;

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

  useEffect(() => {
    if (hasSelectedSoapType) {
      setShowAromasColumn(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowAromasColumn(false);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [hasSelectedSoapType]);

  useEffect(() => {
    if (hasSelectedSoapType && hasSelectedAromas) {
      setShowInitialsColumn(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowInitialsColumn(false);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [hasSelectedSoapType, hasSelectedAromas]);

  function toggleFragrance(fragranceId: number) {
    const isSelected = selectedFragranceIds.includes(fragranceId);

    if (isSelected) {
      setSelectedFragranceIds(
          selectedFragranceIds.filter((id) => id !== fragranceId),
      );
      return;
    }

    if (selectedFragranceIds.length >= 2) {
      return;
    }

    setSelectedFragranceIds([...selectedFragranceIds, fragranceId]);
  }

  function buildCustomSoapName(
      soapVariation: SoapVariation,
      fragrances: SoapFragrance[],
  ) {
    const fragranceNames = fragrances
        .map((fragrance) => fragrance.name)
        .sort()
        .join(" + ");

    return `${soapVariation.name} - ${fragranceNames}`;
  }

  function handleAddToCart() {
    if (!canAddToCart || !selectedSoapVariation) {
      return;
    }

    const normalizedInitials = initials.trim() || null;

    const fragranceKey = [...selectedFragranceIds]
        .sort((a, b) => a - b)
        .join("-");

    const soapName = buildCustomSoapName(
        selectedSoapVariation,
        selectedFragrances,
    );

    addCartItem({
      id: `custom-${selectedSoapVariation.id}-${fragranceKey}-${
          normalizedInitials ?? "no-initials"
      }`,
      type: "CUSTOM",
      name: soapName,
      description: "Custom handmade soap",
      soapVariation: selectedSoapVariation,
      fragrances: selectedFragrances,
      initials: normalizedInitials,
      unitPrice: CUSTOM_SOAP_PRICE,
      quantity: 1,
      imageUrl: CUSTOM_SOAP_IMAGE_URL,
    });

    toast.success("Custom soap added to cart", {
      description: `${selectedSoapVariation.name} • ${selectedFragrances
          .map((fragrance) => fragrance.name)
          .join(" + ")}`,
      action: {
        label: "View cart",
        onClick: () => {
          window.location.href = "/cart";
        },
      },
    });
  }

  return (
      <section
          ref={sectionRef}
          id="create"
          className={`bg-[#FFFDF8] py-16 transition-all duration-[1200ms] ease-out ${
              isSectionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7A6655]">
            Create your own
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Create your soap
          </h2>

          <p className="mt-2 text-[#7A6655]">
            Choose one soap type, combine up to two aromas, and add initials.
          </p>

          <div
              className={`mt-8 grid gap-6 rounded-3xl border border-[#E7D8C4] bg-[#FAF4EA] p-6 transition-all duration-1000 ease-in-out ${
                  showInitialsColumn
                      ? "md:grid-cols-3"
                      : showAromasColumn
                          ? "md:grid-cols-2"
                          : "md:grid-cols-1"
              }`}
          >
            {/* Soap type */}
            <div className="w-full transition-all duration-1000 ease-in-out">
              <label className="text-sm font-semibold">Soap type</label>

              <select
                  value={selectedSoapVariationId}
                  onChange={(event) =>
                      setSelectedSoapVariationId(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
              >
                <option value="">Choose type</option>

                {soapVariations.map((variation) => (
                    <option key={variation.id} value={variation.id}>
                      {variation.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Aromas */}
            <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                    hasSelectedSoapType
                        ? "max-h-[600px] translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none max-h-0 -translate-y-4 scale-[0.98] opacity-0"
                }`}
                aria-hidden={!hasSelectedSoapType}
            >
              <label className="text-sm font-semibold">
                Aromas{" "}
                <span className="font-normal text-[#7A6655]">
                ({selectedFragranceIds.length}/2)
              </span>
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {soapFragrances.map((fragrance) => {
                  const checked = selectedFragranceIds.includes(fragrance.id);

                  const disabled =
                      !checked && selectedFragranceIds.length >= 2;

                  return (
                      <label
                          key={fragrance.id}
                          className={`flex items-center gap-2 rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-3 py-2 text-sm transition ${
                              disabled
                                  ? "cursor-not-allowed opacity-40"
                                  : "cursor-pointer hover:border-[#5B3A29]"
                          }`}
                      >
                        <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => toggleFragrance(fragrance.id)}
                        />

                        {fragrance.name}
                      </label>
                  );
                })}
              </div>
            </div>

            {/* Initials, preview and cart button */}
            <div
                className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                    hasSelectedSoapType && hasSelectedAromas
                        ? "max-h-[700px] translate-y-0 scale-100 opacity-100 delay-200"
                        : "pointer-events-none max-h-0 -translate-y-4 scale-[0.98] opacity-0 delay-0"
                }`}
                aria-hidden={!(hasSelectedSoapType && hasSelectedAromas)}
            >
              <label className="text-sm font-semibold">Initials</label>

              <input
                  type="text"
                  value={initials}
                  onChange={(event) => setInitials(event.target.value)}
                  placeholder="Н.У."
                  maxLength={5}
                  className="mt-2 w-full rounded-xl border border-[#D6C3AA] bg-[#FFFDF8] px-4 py-3 outline-none focus:border-[#5B3A29]"
              />

              <p className="mt-2 text-xs text-[#7A6655]">
                Max 5 characters. Example: Н.У. / NU / N.U.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E7D8C4] bg-[#FFFDF8] p-4 text-sm">
                <p className="font-semibold">Your soap</p>

                <p className="mt-2 text-[#7A6655]">
                  Type: {selectedSoapVariation?.name || "Not selected"}
                </p>

                <p className="text-[#7A6655]">
                  Aromas:{" "}
                  {selectedFragrances.length > 0
                      ? selectedFragrances
                          .map((fragrance) => fragrance.name)
                          .join(" + ")
                      : "Not selected"}
                </p>

                <p className="text-[#7A6655]">
                  Initials: {initials || "None"}
                </p>

                <p className="mt-2 font-semibold">
                  Price: {CUSTOM_SOAP_PRICE.toFixed(2)} лв.
                </p>
              </div>

              <button
                  disabled={!canAddToCart}
                  onClick={handleAddToCart}
                  className="mt-6 w-full rounded-full bg-[#5B3A29] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3F281D] disabled:cursor-not-allowed disabled:bg-[#D6C3AA]"
              >
                Add custom soap to cart
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}