import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Droplets, Mountain, Factory, Zap, HardHat, Ship, Wheat, Antenna, Waves } from "lucide-react";

interface SectorPageProps {
  params: { locale: string; slug: string };
}

const sectorsData: Record<string, any> = {
  "petrole-gaz": {
    title: "Pétrole & Gaz",
    icon: Droplets,
    color: "blue",
    challenges: [
      "Environnements corrosifs et à haute pression",
      "Normes de sécurité très strictes (API, ASME)",
      "Besoin de traçabilité complète",
      "Logistique complexe (offshore, zones isolées)",
    ],
    solutions: [
      "Raccorderie et robinetterie conforme API 6D",
      "Flexibles haute pression certifiés",
      "Équipements de levage offshore",
      "Instrumentation de précision pour forage",
      "EPI spécialisés zone ATEX",
    ],
    products: ["verins-hydrauliques", "flexibles", "robinetterie", "instrumentation", "epi"],
    stats: { projects: 45, clients: 12, satisfaction: 98 },
  },
  "mines": {
    title: "Mines",
    icon: Mountain,
    color: "amber",
    challenges: [
      "Conditions extrêmes de poussière et chaleur",
      "Usure rapide des équipements",
      "Sécurité des personnels en zone dangereuse",
      "Maintenance difficile en site isolé",
    ],
    solutions: [
      "Équipements de forage et concassage",
      "Flexibles ultra-résistants à l'abrasion",
      "Hydraulique haute pression pour engins",
      "EPI anti-poussière et anti-chaleur",
      "Maintenance préventive sur site",
    ],
    products: ["verins-hydrauliques", "flexibles", "epi", "raccords"],
    stats: { projects: 32, clients: 8, satisfaction: 96 },
  },
  "industrie": {
    title: "Industrie",
    icon: Factory,
    color: "navy",
    challenges: [
      "Optimisation de la productivité",
      "Réduction des temps d'arrêt",
      "Conformité aux normes ISO",
      "Gestion des fluides industriels",
    ],
    solutions: [
      "Automatisation hydraulique et pneumatique",
      "Vannes de régulation précises",
      "Systèmes de filtration",
      "Instrumentation de process",
      "Maintenance préventive programmée",
    ],
    products: ["verins-hydrauliques", "robinetterie", "instrumentation", "flexibles", "raccords"],
    stats: { projects: 78, clients: 25, satisfaction: 99 },
  },
};

const productsData: Record<string, any> = {
  "verins-hydrauliques": { title: "Vérins hydrauliques", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" },
  "flexibles": { title: "Flexibles haute pression", image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=400&q=80" },
  "raccords": { title: "Raccords et accessoires", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80" },
  "epi": { title: "Équipements de protection", image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=400&q=80" },
  "robinetterie": { title: "Robinetterie industrielle", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80" },
  "instrumentation": { title: "Instrumentation", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" },
};

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const sector = sectorsData[params.slug];
  if (!sector) return { title: "Secteur non trouvé" };
  return {
    title: `${sector.title} | Solutions industrielles | FOMICO Industries`,
    description: `Solutions industrielles pour le secteur ${sector.title}. FOMICO Industries accompagne vos projets avec expertise.`,
  };
}

export default function SectorDetailPage({ params }: SectorPageProps) {
  const sector = sectorsData[params.slug];
  if (!sector) notFound();

  const Icon = sector.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-fomico-navy py-20">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/fr/secteurs/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Secteurs d'activité
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-fomico-orange/20 rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-fomico-orange" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{sector.title}</h1>
              <p className="text-gray-300">Solutions industrielles sur mesure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enjeux */}
          <div>
            <h2 className="text-2xl font-bold text-fomico-navy mb-6">Les enjeux du secteur</h2>
            <div className="space-y-4">
              {sector.challenges.map((challenge: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-fomico-gray-dark">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h2 className="text-2xl font-bold text-fomico-navy mb-6">Nos solutions</h2>
            <div className="space-y-4">
              {sector.solutions.map((solution: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-fomico-orange shrink-0 mt-0.5" />
                  <span className="text-fomico-gray-dark">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-fomico-navy rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-fomico-orange mb-2">{sector.stats.projects}</div>
              <div className="text-gray-300">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fomico-orange mb-2">{sector.stats.clients}</div>
              <div className="text-gray-300">Clients actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-fomico-orange mb-2">{sector.stats.satisfaction}%</div>
              <div className="text-gray-300">Satisfaction client</div>
            </div>
          </div>
        </div>

        {/* Produits adaptés */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-fomico-navy mb-8">Produits adaptés à ce secteur</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sector.products.map((slug: string) => {
              const product = productsData[slug];
              if (!product) return null;
              return (
                <Link 
                  key={slug}
                  href={`/fr/produits/${slug}/`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm card-hover"
                >
                  <div className="relative h-32 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-fomico-navy group-hover:text-fomico-orange transition-colors">
                      {product.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-fomico-navy mb-4">
            Projet dans le secteur {sector.title} ?
          </h2>
          <p className="text-fomico-gray-dark mb-6 max-w-xl mx-auto">
            Nos experts connaissent les spécificités de votre secteur et peuvent vous proposer des solutions optimales.
          </p>
          <Link href="/fr/devis/" className="btn-primary">
            Demander un devis sectoriel
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
