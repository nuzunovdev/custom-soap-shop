import { CartPageContent } from "@/components/CartPageContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FAF4EA] text-[#2F261F]">
      <Header />
      <CartPageContent />
      <Footer />
    </main>
  );
}
