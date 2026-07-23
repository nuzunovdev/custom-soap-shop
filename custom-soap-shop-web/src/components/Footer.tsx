export function Footer() {
    return (
        <footer id="contact" className="border-t bg-stone-900 py-10 text-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
                <div>
                    <h2 className="text-xl font-bold">Custom Soap Shop</h2>

                    <p className="mt-2 text-sm leading-6 text-stone-300">
                        Handmade soaps, ready and custom made.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                        Contact
                    </h3>

                    <p className="mt-3 text-sm text-stone-300">
                        Email: hello@customsoapshop.com
                    </p>

                    <p className="mt-1 text-sm text-stone-300">
                        Location: Varna, Bulgaria
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-400">
                        MVP note
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-stone-300">
                        Online payments and full cart logic will be added in the next
                        development steps.
                    </p>
                </div>
            </div>
        </footer>
    );
}