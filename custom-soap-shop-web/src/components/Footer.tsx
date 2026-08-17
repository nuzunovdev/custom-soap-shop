export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#3F281D] bg-[#2F261F] py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold">Custom Soap Shop</h2>

          <p className="mt-2 text-sm leading-6 text-white/70">
            Handmade soaps, ready and custom made.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            Contact
          </h3>

          <p className="mt-3 text-sm text-white/70">
            Email: hello@customsoapshop.com
          </p>

          <p className="mt-1 text-sm text-white/70">
            Location: Varna, Bulgaria
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
            MVP note
          </h3>

          <p className="mt-3 text-sm leading-6 text-white/70">
            Online payments and full admin logic will be added in the next
            development steps.
          </p>
        </div>
      </div>
    </footer>
  );
}
