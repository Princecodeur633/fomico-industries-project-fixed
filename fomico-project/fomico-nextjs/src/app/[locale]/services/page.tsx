import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Wrench, Lightbulb, Truck, Settings, FileSearch, Globe, Package, ClipboardCheck } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("services")} | FOMICO Industries`,
    description: "Services industriels complets : approvisionnement, maintenance, conseil technique, logistique CEMAC et solutions sur mesure.",
  };
}

const services = [
  {
    icon: Package,
    title: "Approvisionnement industriel",
    desc: "Sourcing et approvisionnement de pièces industrielles essentielles auprès de fournisseurs réputés aux USA et en UE. Nous simplifions votre chaîne d'approvisionnement.",
    features: ["100 000+ références", "Fournisseurs certifiés", "Traçabilité complète"],
  },
  {
    icon: Wrench,
    title: "Fourniture d'équipements",
    desc: "Fourniture de machines et équipements industriels neufs et reconditionnés, adaptés à vos spécifications techniques.",
    features: ["Équipements neufs & reconditionnés", "Garantie constructeur", "Installation incluse"],
  },
  {
    icon: Settings,
    title: "Assistance technique",
    desc: "Support technique sur site et à distance pour le diagnostic, la réparation et l'optimisation de vos équipements.",
    features: ["Intervention 24/7", "Diagnostic avancé", "Rapport technique"],
  },
  {
    icon: Lightbulb,
    title: "Conseil & ingénierie",
    desc: "Accompagnement personnalisé par nos ingénieurs pour concevoir des solutions optimales et réduire vos coûts d'exploitation.",
    features: ["Étude de faisabilité", "Optimisation process", "ROI garanti"],
  },
  {
    icon: ClipboardCheck,
    title: "Maintenance préventive",
    desc: "Programmes de maintenance préventive et curative pour maximiser la disponibilité de vos équipements critiques.",
    features: ["Planning personnalisé", "Pièces de rechange", "Rapport d'intervention"],
  },
  {
    icon: Globe,
    title: "Import-export & logistique",
    desc: "Gestion complète de l'import-export avec dédouanement inclus. Livraison dans toute la zone CEMAC.",
    features: ["Dédouanement inclus", "Transport multimodal", "Suivi en temps réel"],
  },
  {
    icon: FileSearch,
    title: "Gestion documentaire",
    desc: "Organisation et archivage de vos documents techniques, certificats de conformité et fiches de sécurité.",
    features: ["Archivage numérique", "Certificats conformité", "Accès sécurisé"],
  },
  {
    icon: Truck,
    title: "Recherche de produits spécifiques",
    desc: "Service de recherche dédié pour trouver les produits les plus spécifiques ou obsolètes sur le marché mondial.",
    features: ["Réseau mondial", "Produits obsolètes", "Délai express"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nos services
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Une expertise complète pour vous accompagner de l'étude à la maintenance, 
            en passant par la logistique internationale.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm card-hover border border-gray-100">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-fomico-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-fomico-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-fomico-navy mb-3">{service.title}</h3>
                    <p className="text-fomico-gray-dark leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span 
                          key={feature}
                          className="text-xs font-medium bg-gray-100 text-fomico-navy px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-fomico-navy mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-fomico-gray-dark mb-6 max-w-xl mx-auto">
            Nos équipes peuvent concevoir des solutions sur mesure adaptées à vos contraintes spécifiques.
          </p>
          <Link href="/fr/devis/" className="btn-primary">
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
