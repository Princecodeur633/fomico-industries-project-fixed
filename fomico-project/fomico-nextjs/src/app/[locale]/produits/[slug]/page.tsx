import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, ArrowRight, Phone } from "lucide-react";

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Données statiques (à remplacer par API Strapi)
const productsData: Record<string, any> = {
  "verins-hydrauliques": {
    title: "Vérins hydrauliques",
    category: "Hydraulique",
    description: "Vérins hydrauliques simple et double effet, télescopiques et spéciaux pour applications industrielles et mobiles.",
    longDescription: `Les vérins hydrauliques FOMICO sont conçus pour résister aux conditions les plus exigeantes des industries pétrolière, minière et manufacturière.

Nous proposons une gamme complète allant des vérins standard aux solutions entièrement sur mesure, avec des courses allant de 50mm à 10m et des pressions jusqu'à 700 bar.`,
    features: [
      "Simple et double effet",
      "Télescopiques (2 à 5 étages)",
      "Pression jusqu'à 700 bar",
      "Course de 50mm à 10m",
      "Matériaux : acier, inox, aluminium",
      "Joints haute performance (NBR, Viton, PTFE)",
      "Options : capteurs de position, amortissement, fixation spéciale",
    ],
    specs: [
      { label: "Pression max", value: "700 bar" },
      { label: "Course max", value: "10 000 mm" },
      { label: "Alésage", value: "20 - 500 mm" },
      { label: "Température", value: "-40°C à +200°C" },
      { label: "Normes", value: "ISO 6020, ISO 6022, DIN 24333" },
      { label: "Garantie", value: "24 mois" },
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    docs: ["Fiche technique vérins standard", "Guide de sélection", "Manuel d'installation"],
    related: ["flexibles", "raccords", "instrumentation"],
  },
  "flexibles": {
    title: "Flexibles haute pression",
    category: "Hydraulique",
    description: "Tuyaux hydrauliques, industriels et spéciaux pour fluides, gaz et produits chimiques.",
    longDescription: `Nos flexibles haute pression sont fabriqués selon les normes internationales les plus strictes. Ils assurent la sécurité et la fiabilité de vos installations hydrauliques dans les environnements les plus hostiles.`,
    features: [
      "Pression jusqu'à 4200 bar",
      "Température -60°C à +300°C",
      "Résistance aux produits chimiques",
      "Gaines de protection disponibles",
      "Certifications API, ISO, DIN",
      "Montage sur site possible",
    ],
    specs: [
      { label: "Pression max", value: "4200 bar" },
      { label: "Diamètre", value: "3 - 76 mm (1/8\" - 3\")" },
      { label: "Longueur", value: "Sur mesure" },
      { label: "Température", value: "-60°C à +300°C" },
      { label: "Normes", value: "EN 853, EN 856, SAE 100" },
      { label: "Garantie", value: "12 mois" },
    ],
    image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=1200&q=80",
    docs: ["Catalogue flexibles 2024", "Guide de montage", "Tableau de compatibilité fluides"],
    related: ["verins-hydrauliques", "raccords", "robinetterie"],
  },
  "raccords": {
    title: "Raccords et accessoires",
    category: "Hydraulique",
    description: "Raccords hydrauliques, pneumatiques et industriels en acier, inox et laiton.",
    longDescription: `Gamme complète de raccords pour tous types de fluides et applications. Disponibles en acier carbone, inox 316L, laiton et matériaux spéciaux.`,
    features: [
      "Filetés, à sertir, à souder, à clamp",
      "Acier, inox 316L, laiton, titane",
      "Joints toriques inclus",
      "Normes BSP, NPT, JIC, ORFS, métriques",
      "Fabrication sur plan",
    ],
    specs: [
      { label: "Pression max", value: "1000 bar" },
      { label: "Filetages", value: "BSP, NPT, JIC, ORFS, M" },
      { label: "Matériaux", value: "Acier, Inox, Laiton, Titane" },
      { label: "Normes", value: "ISO 8434, ISO 12151" },
      { label: "Garantie", value: "24 mois" },
    ],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
    docs: ["Catalogue raccords complet", "Guide des filetages"],
    related: ["flexibles", "verins-hydrauliques", "instrumentation"],
  },
  "epi": {
    title: "Équipements de protection individuelle",
    category: "Sécurité",
    description: "Casques, gants, lunettes, chaussures de sécurité et équipements de protection respiratoire.",
    longDescription: `Gamme complète d'EPI certifiés selon les normes européennes EN et américaines ANSI. Protection tête, corps, mains, pieds, yeux, voies respiratoires.`,
    features: [
      "Casques de chantier EN 397",
      "Gants anti-coupure, chimique, thermique",
      "Lunettes de protection EN 166",
      "Chaussures de sécurité S1P, S3",
      "Masques respiratoires FFP2/FFP3",
      "Harnais antichute EN 361",
    ],
    specs: [
      { label: "Normes", value: "EN 397, EN 166, EN 20345" },
      { label: "Certifications", value: "CE, ANSI, ISO" },
      { label: "Garantie", value: "Selon fabricant" },
    ],
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80",
    docs: ["Catalogue EPI 2024", "Guide de choix EPI"],
    related: ["robinetterie", "instrumentation"],
  },
  "robinetterie": {
    title: "Robinetterie industrielle",
    category: "Vannes",
    description: "Vannes, robinets, vannes à boisseau sphérique et clapets pour fluides industriels.",
    longDescription: `Robinetterie industrielle haute performance pour le contrôle des fluides. Vannes manuelles, motorisées et automatiques.`,
    features: [
      "Vannes à boisseau sphérique",
      "Vannes papillon",
      "Vannes à membrane",
      "Clapets anti-retour",
      "Robinet à pointeau",
      "Actionnement manuel, électrique, pneumatique",
    ],
    specs: [
      { label: "Pression max", value: "PN 400" },
      { label: "Diamètre", value: "DN 15 - DN 1200" },
      { label: "Matériaux", value: "Fonte, Acier, Inox, Bronze" },
      { label: "Normes", value: "EN 558, API 6D, ASME B16.34" },
      { label: "Garantie", value: "24 mois" },
    ],
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    docs: ["Catalogue robinetterie", "Guide de sélection vannes"],
    related: ["flexibles", "raccords", "instrumentation"],
  },
  "instrumentation": {
    title: "Instrumentation",
    category: "Mesure",
    description: "Manomètres, thermomètres, débitmètres, capteurs et instruments de mesure.",
    longDescription: `Instruments de mesure de précision pour la surveillance et le contrôle de vos processus industriels.`,
    features: [
      "Manomètres analogiques et digitaux",
      "Transmetteurs de pression",
      "Thermomètres et sondes PT100",
      "Débitmètres électromagnétiques",
      "Niveaux et indicateurs",
      "Enregistreurs et régulateurs",
    ],
    specs: [
      { label: "Précision", value: "±0.1% à ±1%" },
      { label: "Sorties", value: "4-20mA, 0-10V, HART, Modbus" },
      { label: "Normes", value: "EN 837, IEC 60584" },
      { label: "Garantie", value: "24 mois" },
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    docs: ["Catalogue instrumentation", "Guide d'installation capteurs"],
    related: ["robinetterie", "flexibles"],
  },
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = productsData[params.slug];
  if (!product) return { title: "Produit non trouvé" };

  return {
    title: `${product.title} | FOMICO Industries`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = productsData[params.slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-fomico-gray-dark">
            <Link href="/fr/" className="hover:text-fomico-orange transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/fr/produits/" className="hover:text-fomico-orange transition-colors">Produits</Link>
            <span>/</span>
            <span className="text-fomico-navy font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero produit */}
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-medium text-fomico-orange bg-fomico-orange/10 px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-fomico-navy mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-fomico-gray-dark leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/fr/devis/" className="btn-primary">
                  Demander un devis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a href="tel:+242064671313" className="btn-outline flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +242 06 467 1313
                </a>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description détaillée */}
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-fomico-navy mb-6">Description</h2>
            <div className="prose prose-lg max-w-none text-fomico-gray-dark leading-relaxed whitespace-pre-line">
              {product.longDescription}
            </div>

            <h2 className="text-2xl font-bold text-fomico-navy mb-6 mt-12">Caractéristiques</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-fomico-orange shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spécifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-fomico-navy mb-4">Spécifications techniques</h3>
              <div className="space-y-3">
                {product.specs.map((spec: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-fomico-gray-dark">{spec.label}</span>
                    <span className="text-sm font-semibold text-fomico-navy">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-fomico-navy mb-4">Documentation</h3>
              <div className="space-y-2">
                {product.docs.map((doc: string, i: number) => (
                  <a 
                    key={i}
                    href="#"
                    className="flex items-center gap-2 text-sm text-fomico-gray-dark hover:text-fomico-orange transition-colors py-2"
                  >
                    <FileText className="w-4 h-4 text-fomico-orange" />
                    {doc}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-fomico-navy rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Nos ingénieurs sont disponibles pour vous conseiller sur le choix de vos équipements.
              </p>
              <a href="https://wa.me/242064671313" className="btn-secondary w-full text-center text-sm">
                Contacter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Produits associés */}
      <div className="bg-white section-padding">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-fomico-navy mb-8">Produits associés</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.related.map((slug: string) => {
              const related = productsData[slug];
              if (!related) return null;
              return (
                <Link 
                  key={slug}
                  href={`/fr/produits/${slug}/`}
                  className="group bg-gray-50 rounded-xl overflow-hidden card-hover"
                >
                  <div className="relative h-40 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${related.image}')` }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-fomico-navy group-hover:text-fomico-orange transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
