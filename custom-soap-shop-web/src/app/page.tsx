import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { ReadySoapsSection } from "@/components/ReadySoapsSection";
import { SoapConfiguratorSection } from "@/components/SoapConfiguratorSection";
import type { Soap, SoapFragrance, SoapVariation } from "@/types/catalog";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function getJson<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}`);
    }

    return response.json();
}

export default async function Home() {
    const [soaps, soapVariations, soapFragrances] = await Promise.all([
        getJson<Soap[]>("/api/soaps"),
        getJson<SoapVariation[]>("/api/soap-variations"),
        getJson<SoapFragrance[]>("/api/soap-fragrances"),
    ]);

    const readySoaps = soaps.filter((soap) => !soap.custom);

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900">
            <Header />
            <HeroSection />
            <IntroSection />

            <ReadySoapsSection readySoaps={readySoaps} />

            <SoapConfiguratorSection
                soapVariations={soapVariations}
                soapFragrances={soapFragrances}
            />

            <Footer />
        </main>
    );
}