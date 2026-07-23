export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                <a href="#" className="text-xl font-bold tracking-tight">
                    Custom Soap Shop
                </a>

                <nav className="hidden gap-6 text-sm font-medium text-stone-700 md:flex">
                    <a href="#about" className="hover:text-stone-950">
                        About
                    </a>
                    <a href="#ready-soaps" className="hover:text-stone-950">
                        Ready Soaps
                    </a>
                    <a href="#create" className="hover:text-stone-950">
                        Create
                    </a>
                    <a href="#contact" className="hover:text-stone-950">
                        Contact
                    </a>
                </nav>

                <button className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold hover:bg-stone-100">
                    Cart
                </button>
            </div>
        </header>
    );
}