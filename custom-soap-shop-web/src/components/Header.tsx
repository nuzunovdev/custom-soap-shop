export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7D8C4] bg-[#FFFDF8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="text-xl font-bold tracking-tight">
          Custom Soap Shop
        </a>

        <nav className="hidden gap-6 text-sm font-medium text-[#7A6655] md:flex">
          <a href="/#about" className="transition hover:text-[#2F261F]">
            About
          </a>
          <a href="/#ready-soaps" className="transition hover:text-[#2F261F]">
            Ready Soaps
          </a>
          <a href="/#create" className="transition hover:text-[#2F261F]">
            Create
          </a>
          <a href="/#contact" className="transition hover:text-[#2F261F]">
            Contact
          </a>
        </nav>

        <a
          href="/cart"
          className="rounded-full border border-[#D6C3AA] px-4 py-2 text-sm font-semibold text-[#2F261F] transition hover:bg-[#F1E4D2]"
        >
          Cart
        </a>
      </div>
    </header>
  );
}
