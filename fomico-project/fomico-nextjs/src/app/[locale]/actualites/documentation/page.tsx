import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Download, ShieldCheck, BookOpen, FileSpreadsheet } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Documentation | FOMICO Industries",
  description: "Catalogues, fiches techniques et certifications FOMICO Industries.",
};

const documents = [
  {
    title: "Catalogue général des produits",
    description: "Vue d'ensemble de notre gamme complète : vérins, flexibles, raccords, EPI et plus.",
    type: "Catalogue",
    icon: BookOpen,
  },
  {
    title: "Fiches techniques — Vérins hydrauliques",
    description: "Spécifications techniques détaillées, plages de pression et dimensions.",
    type: "Fiche technique",
    icon: FileSpreadsheet,
  },
  {
    title: "Certification ISO 9001",
    description: "Notre certificat qualité, garantissant la rigueur de nos processus internes.",
    type: "Certification",
    icon: ShieldCheck,
  },
  {
    title: "Fiches techniques — Flexibles haute pression",
    description: "Normes de conformité, pressions de service et tableaux de compatibilité.",
    type: "Fiche technique",
    icon: FileSpreadsheet,
  },
  {
    title: "Guide EPI — Équipements de protection",
    description: "Sélection et normes EN applicables à notre gamme d'équipements de protection.",
    type: "Guide",
    icon: FileText,
  },
  {
    title: "Rapport RSE",
    description: "Notre engagement environnemental, social et de gouvernance.",
    type: "Rapport",
    icon: FileText,
  },
];

export default function DocumentationPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom">
          <Link
            href={`/${locale}/actualites/`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux actualités
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Catalogues, fiches techniques et certifications — toute la documentation FOMICO Industries en un seul endroit.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <Reveal key={doc.title} delay={index * 60}>
                <div className="bg-white rounded-xl p-6 shadow-sm card-hover h-full flex flex-col border border-gray-100">
                  <div className="w-12 h-12 bg-fomico-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-fomico-orange" />
                  </div>
                  <span className="text-xs font-medium text-fomico-orange mb-2">{doc.type}</span>
                  <h3 className="font-bold text-fomico-navy mb-2">{doc.title}</h3>
                  <p className="text-sm text-fomico-gray-dark mb-4 flex-1">{doc.description}</p>
                  <button
                    disabled
                    title="Document à venir — contactez-nous pour l'obtenir directement"
                    className="inline-flex items-center gap-2 text-sm font-medium text-fomico-gray-dark cursor-not-allowed w-fit"
                  >
                    <Download className="w-4 h-4" /> Bientôt disponible
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 bg-fomico-navy rounded-2xl p-8 md:p-10 text-center" animation="scale-in">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Besoin d&apos;un document spécifique ?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Notre équipe peut vous envoyer directement la documentation technique dont vous avez besoin.
          </p>
          <Link href={`/${locale}/contact/`} className="btn-primary">
            Nous contacter
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
