import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import QuoteForm from "@/components/QuoteForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("quote")} | FOMICO Industries`,
    description: "Demandez un devis personnalisé pour vos besoins industriels. Réponse sous 24h.",
  };
}

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Demande de devis
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Décrivez votre besoin et recevez une proposition personnalisée sous 24 heures ouvrées.
          </p>
        </div>
      </div>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
