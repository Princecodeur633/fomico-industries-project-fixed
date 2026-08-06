import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { 
  Droplets, Mountain, Factory, Zap, HardHat, Ship, Wheat, Antenna, Waves, ArrowRight, Wrench 
} from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("sectors")} | FOMICO Industries`,
    description: "FOMICO Industries dessert 9 secteurs industriels : Pétrole & Gaz, Mines, Énergie, Construction, Marine et plus.",
  };
}

const sectors = [
  {
    slug: "petrole-gaz",
    icon: Droplets,
    title: "Pétrole & Gaz",
    desc: "Raccorderie, robinetterie, levage offshore et équipements spéciaux adaptés aux normes API et aux spécificités du secteur pétrolier.",
    color: "from-blue-900 to-blue-700",
  },
  {
    slug: "mines",
    icon: Mountain,
    title: "Mines",
    desc: "Équipements de forage, concassage, manutention et protection pour l'exploitation minière en conditions extrêmes.",
    color: "from-amber-800 to-amber-600",
  },
  {
    slug: "industrie",
    icon: Factory,
    title: "Industrie",
    desc: "Solutions complètes pour l'industrie manufacturière : hydraulique, pneumatique, automatisation et maintenance.",
    color: "from-fomico-navy to-fomico-navy-light",
  },
  {
    slug: "energie",
    icon: Zap,
    title: "Énergie",
    desc: "Équipements pour centrales électriques, énergies renouvelables et réseaux de distribution d'énergie.",
    color: "from-yellow-600 to-orange-500",
  },
  {
    slug: "construction",
    icon: HardHat,
    title: "Construction",
    desc: "Matériel de chantier, outillage professionnel et équipements de sécurité pour le BTP.",
    color: "from-stone-700 to-stone-500",
  },
  {
    slug: "marine",
    icon: Ship,
    title: "Marine",
    desc: "Fournitures navales, équipements de pont, systèmes hydrauliques marins et pièces de rechange certifiées.",
    color: "from-cyan-800 to-cyan-600",
  },
  {
    slug: "agroalimentaire",
    icon: Wheat,
    title: "Agroalimentaire",
    desc: "Équipements conformes aux normes alimentaires, inox alimentaire et systèmes de traitement des fluides.",
    color: "from-green-700 to-green-500",
  },
  {
    slug: "maintenance-industrielle",
    icon: Wrench,
    title: "Maintenance industrielle",
    desc: "Maintenance préventive et curative, SAV, interventions rapides sur site et contrats de maintenance.",
    color: "from-orange-700 to-orange-500",
  },
  {
    slug: "telecommunications",
    icon: Antenna,
    title: "Télécommunications",
    desc: "Infrastructure technique, équipements de protection et solutions d'installation pour les réseaux.",
    color: "from-purple-800 to-purple-600",
  },
  {
    slug: "eau-assainissement",
    icon: Waves,
    title: "Eau & Assainissement",
    desc: "Pompes, vannes, tuyauteries et équipements de traitement d'eau pour stations d'épuration et réseaux.",
    color: "from-sky-700 to-sky-500",
  },
];

export default function SectorsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Secteurs d&apos;activité
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Des solutions industrielles adaptées aux enjeux spécifiques de chaque secteur d&apos;activité.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div 
                key={sector.slug}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${sector.color}`} />
                <div className="p-8">
                  <div className="w-14 h-14 bg-fomico-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-fomico-orange group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7 text-fomico-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-fomico-navy mb-3">{sector.title}</h3>
                  <p className="text-fomico-gray-dark leading-relaxed mb-6">{sector.desc}</p>
                  <Link 
                    href={`/${locale}/secteurs/${sector.slug}/`}
                    className="inline-flex items-center text-fomico-orange font-medium text-sm group-hover:gap-2 transition-all"
                  >
                    Découvrir les solutions <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
