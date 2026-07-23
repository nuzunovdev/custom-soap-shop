"use client";

import { useState } from "react";
import type { SoapFragrance, SoapVariation } from "@/types/catalog";

type SoapConfiguratorSectionProps = {
    soapVariations: SoapVariation[];
    soapFragrances: SoapFragrance[];
};

export function SoapConfiguratorSection({
                                            soapVariations,
                                            soapFragrances,
                                        }: SoapConfiguratorSectionProps) {
    const [selectedSoapVariationId, setSelectedSoapVariationId] = useState("");
    const [selectedFragranceIds, setSelectedFragranceIds] = useState<number[]>([]);
    const [initials, setInitials] = useState("");

    const selectedSoapVariation = soapVariations.find(
        (variation) => variation.id === Number(selectedSoapVariationId),
    );

    const selectedFragrances = soapFragrances.filter((fragrance) =>
        selectedFragranceIds.includes(fragrance.id),
    );

    const canAddToCart =
        selectedSoapVariationId !== "" && selectedFragranceIds.length > 0;

    function toggleFragrance(fragranceId: number) {
        const isSelected = selectedFragranceIds.includes(fragranceId);

        if (isSelected) {
            setSelectedFragranceIds(
                selectedFragranceIds.filter((id) => id !== fragranceId),
            );
            return;
        }

        if (selectedFragranceIds.length >= 3) {
            return;
        }

        setSelectedFragranceIds([...selectedFragranceIds, fragranceId]);
    }

    function handleAddToCart() {
        if (!canAddToCart) {
            return;
        }

        alert(
            `Custom soap added:\nType: ${
                selectedSoapVariation?.name
            }\nAromas: ${selectedFragrances
                .map((fragrance) => fragrance.name)
                .join(" + ")}\nInitials: ${initials || "None"}`,
        );
    }

    return (
        <section id="create" className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-stone-500">
                    Create your own
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    Create your soap
                </h2>

                <p className="mt-2 text-stone-600">
                    Choose one soap type, combine up to two aromas, and add initials.
                </p>

                <div className="mt-8 grid gap-6 rounded-3xl border bg-stone-50 p-6 md:grid-cols-3">
                    <div>
                        <label className="text-sm font-semibold">Soap type</label>

                        <select
                            value={selectedSoapVariationId}
                            onChange={(event) =>
                                setSelectedSoapVariationId(event.target.value)
                            }
                            className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-stone-900"
                        >
                            <option value="">Choose type</option>

                            {soapVariations.map((variation) => (
                                <option key={variation.id} value={variation.id}>
                                    {variation.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold">
                            Aromas{" "}
                            <span className="font-normal text-stone-500">
                ({selectedFragranceIds.length}/3)
              </span>
                        </label>

                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {soapFragrances.map((fragrance) => {
                                const checked = selectedFragranceIds.includes(fragrance.id);
                                const disabled = !checked && selectedFragranceIds.length >= 3;

                                return (
                                    <label
                                        key={fragrance.id}
                                        className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm ${
                                            disabled
                                                ? "cursor-not-allowed opacity-40"
                                                : "cursor-pointer hover:border-stone-400"
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

                    <div>
                        <label className="text-sm font-semibold">Initials</label>

                        <input
                            type="text"
                            value={initials}
                            onChange={(event) => setInitials(event.target.value)}
                            placeholder="Н.У."
                            maxLength={5}
                            className="mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-stone-900"
                        />

                        <p className="mt-2 text-xs text-stone-500">
                            Max 5 characters. Example: Н.У. / NU / N.U.
                        </p>

                        <div className="mt-6 rounded-2xl bg-white p-4 text-sm">
                            <p className="font-semibold">Your soap</p>

                            <p className="mt-2 text-stone-600">
                                Type: {selectedSoapVariation?.name || "Not selected"}
                            </p>

                            <p className="text-stone-600">
                                Aromas:{" "}
                                {selectedFragrances.length > 0
                                    ? selectedFragrances
                                        .map((fragrance) => fragrance.name)
                                        .join(" + ")
                                    : "Not selected"}
                            </p>

                            <p className="text-stone-600">
                                Initials: {initials || "None"}
                            </p>
                        </div>

                        <button
                            disabled={!canAddToCart}
                            onClick={handleAddToCart}
                            className="mt-6 w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
                        >
                            Add custom soap to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}