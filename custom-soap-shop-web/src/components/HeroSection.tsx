export function HeroSection() {
    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
            <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-stone-500">
                    Handmade custom soaps
                </p>

                <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                    Create your own handmade soap.
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                    Choose the soap type, combine your favorite aromas, and add custom
                    initials for the soap and box.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                        href="#create"
                        className="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-stone-700"
                    >
                        Create your soap
                    </a>

                    <a
                        href="#ready-soaps"
                        className="rounded-full border border-stone-300 px-6 py-3 text-center text-sm font-semibold hover:bg-white"
                    >
                        View ready soaps
                    </a>
                </div>
            </div>

            <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-3xl bg-stone-200 text-stone-500 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300" />

                <div className="relative text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest">
                        Promo image / video
                    </p>
                    <p className="mt-2 text-sm">
                        Later we will place real soap visuals here.
                    </p>
                </div>
            </div>
        </section>
    );
}