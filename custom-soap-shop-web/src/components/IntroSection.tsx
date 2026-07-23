export function IntroSection() {
    return (
        <section id="about" className="bg-white py-16">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <p className="text-sm font-semibold uppercase tracking-widest text-stone-500">
                        What we offer
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight">
                        Handmade soaps with a personal touch.
                    </h2>
                </div>

                <div className="space-y-5 text-stone-600 md:col-span-2">
                    <p>
                        We create handmade soaps with carefully selected oils, aromas and
                        simple customization options.
                    </p>

                    <p>
                        You can choose a ready soap from our collection or create your own
                        combination by selecting the soap type, aromas and custom initials.
                    </p>

                    <div className="grid gap-4 pt-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-stone-50 p-5">
                            <h3 className="font-semibold text-stone-900">Handmade</h3>
                            <p className="mt-2 text-sm">
                                Small batches made with attention to detail.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-stone-50 p-5">
                            <h3 className="font-semibold text-stone-900">Custom</h3>
                            <p className="mt-2 text-sm">
                                Choose soap type, aroma blend and initials.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-stone-50 p-5">
                            <h3 className="font-semibold text-stone-900">Gift Ready</h3>
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