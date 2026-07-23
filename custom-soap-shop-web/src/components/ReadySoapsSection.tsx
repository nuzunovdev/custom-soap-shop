import type { Soap } from "@/types/catalog";

type ReadySoapsSectionProps = {
    readySoaps: Soap[];
};

export function ReadySoapsSection({ readySoaps }: ReadySoapsSectionProps) {
    return (
        <section id="ready-soaps" className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-stone-500">
                        Ready to order
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight">
                        Ready soaps
                    </h2>

                    <p className="mt-2 text-stone-600">
                        Our configured soaps, ready to order.
                    </p>
                </div>

                <p className="text-sm text-stone-500">
                    Slide horizontally to view more.
                </p>
            </div>

            {readySoaps.length === 0 ? (
                <div className="rounded-3xl border bg-white p-8 text-stone-600">
                    No ready soaps available yet.
                </div>
            ) : (
                <div className="flex gap-6 overflow-x-auto pb-4">
                    {readySoaps.map((soap) => (
                        <article
                            key={soap.id}
                            className="min-w-72 rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-stone-200 text-stone-500">
                                Soap image
                            </div>

                            <div className="mb-3 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                                {soap.soapVariation.name}
                            </div>

                            <h3 className="text-xl font-semibold">{soap.name}</h3>

                            <p className="mt-2 min-h-12 text-sm leading-6 text-stone-600">
                                {soap.description}
                            </p>

                            <p className="mt-3 text-sm text-stone-500">
                                Aromas:{" "}
                                {soap.fragrances.length > 0
                                    ? soap.fragrances.map((fragrance) => fragrance.name).join(" + ")
                                    : "None"}
                            </p>

                            <div className="mt-5 flex items-center justify-between">
                <span className="font-bold">
                  {Number(soap.price).toFixed(2)} лв.
                </span>

                                <button className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700">
                                    Add to cart
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}