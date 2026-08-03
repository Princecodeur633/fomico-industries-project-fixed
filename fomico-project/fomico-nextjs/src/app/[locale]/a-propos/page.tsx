import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle, Target, Eye, Award, Users, Shield, Globe, TrendingUp } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("about")} | FOMICO Industries`,
    description: "Découvrez FOMICO Industries, fondée en 2021 à Brazzaville. Expertise en fournitures industrielles, hydraulique et solutions sur mesure pour le Congo et la CEMAC.",
  };
}

const valeurs = [
  {
    icon: Shield,
    title: "Qualité",
    desc: "Nous ne compromettons jamais sur la qualité. Tous nos produits respectent les normes internationales les plus strictes.",
  },
  {
    icon: Target,
    title: "Précision",
    desc: "Chaque commande est traitée avec minutie pour garantir la conformité exacte aux spécifications de nos clients.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    desc: "Nous intégrons les dernières avancées technologiques pour proposer des solutions toujours plus performantes.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Notre équipe qualifiée assure un service client exceptionnel avec des conseils techniques personnalisés.",
  },
];

const partenaires = [
  "Groupe Martin Belayoud",
  "Fluides Service",
  "ETT",
  "GEA Westfalia",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-fomico-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Qui sommes-nous ?
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              FOMICO Industries excelle dans la fabrication de fournitures et machines industrielles de pointe. 
              Fondée en 2021 à Brazzaville, nous sommes devenus un partenaire de confiance pour les industries 
              les plus exigeantes du Congo et de la zone CEMAC.
            </p>
          </div>
        </div>
      </div>

      {/* Histoire */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-fomico-navy mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-fomico-gray-dark leading-relaxed">
                <p>
                  FOMICO Industries a été fondée en avril 2021 avec une vision claire : devenir 
                  le fournisseur industriel de référence en République du Congo. À partir de Brazzaville, 
                  puis Pointe-Noire, nous avons rapidement établi notre présence sur tout le territoire national.
                </p>
                <p>
                  En tant que centrale d&apos;achat, nous simplifions l&apos;approvisionnement en pièces 
                  industrielles essentielles grâce à notre vaste catalogue de produits provenant de 
                  fournisseurs réputés aux États-Unis et en Union Européenne.
                </p>
                <p>
                  Aujourd&apos;hui, nous desservons la zone CEMAC entière (Cameroun, Gabon, Tchad, 
                  RCA, Guinée équatoriale et Congo) avec des solutions adaptées aux normes les plus strictes 
                  de qualité, sécurité et traçabilité.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-fomico-orange text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">2021</div>
                <div className="text-sm opacity-90">Année de création</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-fomico-orange/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-fomico-orange" />
              </div>
              <h3 className="text-2xl font-bold text-fomico-navy mb-4">Notre mission</h3>
              <p className="text-fomico-gray-dark leading-relaxed">
                Fournir des solutions industrielles robustes et sur mesure qui permettent à nos clients 
                d&apos;optimiser leurs opérations, de réduire leurs temps d&apos;arrêt et d&apos;améliorer 
                leur productivité dans les environnements les plus exigeants.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-fomico-orange/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-fomico-orange" />
              </div>
              <h3 className="text-2xl font-bold text-fomico-navy mb-4">Notre vision</h3>
              <p className="text-fomico-gray-dark leading-relaxed">
                Devenir le leader de la distribution industrielle en Afrique centrale, reconnu pour 
                notre expertise technique, notre réactivité et notre capacité à livrer des solutions 
                complexes dans des délais record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fomico-navy mb-4">
              Nos valeurs
            </h2>
            <p className="text-lg text-fomico-gray-dark max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions au quotidien.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((valeur, index) => {
              const Icon = valeur.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-fomico-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-fomico-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-fomico-navy mb-2">{valeur.title}</h3>
                  <p className="text-sm text-fomico-gray-dark leading-relaxed">{valeur.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Atouts concurrentiels */}
      <section className="section-padding bg-fomico-navy text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir FOMICO ?
              </h2>
              <div className="space-y-4">
                {[
                  "Produits provenant des USA et UE, normes strictes de qualité",
                  "Livraison dans toute la zone CEMAC avec dédouanement inclus",
                  "Partenariats avec des leaders mondiaux (Martin Belayoud, GEA...)",
                  "Équipe technique qualifiée et créative",
                  "Service client réactif avec conseils personnalisés",
                  "Solutions sur mesure pour les besoins les plus complexes",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-fomico-orange shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-fomico-orange mb-2">24h</div>
                <div className="text-sm text-gray-300">Délai de réponse</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-fomico-orange mb-2">100%</div>
                <div className="text-sm text-gray-300">Produits certifiés</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-fomico-orange mb-2">République du Congo, pays d'Afrique et France</div>
                <div className="text-sm text-gray-300">Pays desservis</div>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-fomico-orange mb-2">4+</div>
                <div className="text-sm text-gray-300">Partenaires majeurs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-fomico-navy mb-4">
            Nos partenaires stratégiques
          </h2>
          <p className="text-lg text-fomico-gray-dark max-w-2xl mx-auto mb-12">
            Des collaborations solides avec des leaders mondiaux pour vous garantir 
            expertise et qualité de service exceptionnelles.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {partenaires.map((partenaire) => (
              <div 
                key={partenaire}
                className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-100 font-semibold text-fomico-navy hover:border-fomico-orange transition-colors"
              >
                {partenaire}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
