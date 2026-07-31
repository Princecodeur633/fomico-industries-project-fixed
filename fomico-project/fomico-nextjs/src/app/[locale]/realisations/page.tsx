import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("projects")} | FOMICO Industries`,
    description: "Découvrez les projets réalisés par FOMICO Industries : études de cas, solutions techniques et résultats obtenus.",
  };
}

const projects = [
  {
    id: 1,
    title: "Modernisation hydraulique plateforme offshore",
    client: "Société Pétrolière du Congo",
    location: "Pointe-Noire",
    date: "2024",
    sector: "Pétrole & Gaz",
    context: "Remplacement complet du système hydraulique de levage d'une plateforme offshore vieillissante. Défi majeur : respecter les normes API tout en minimisant le temps d'arrêt.",
    solution: "Fourniture et installation de 12 vérins hydrauliques double effet 500 bar, flexibles haute pression certifiés API, et robinetterie de sécurité. Coordination avec arrêt technique de 72h.",
    results: [
      "Temps d'arrêt réduit de 30%",
      "Conformité API 6D validée",
      "Gain de productivité : 15%",
      "Zero incident sécurité",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Approvisionnement pièces de rechange mine",
    client: "Société Minière du Congo",
    location: "Brazzaville",
    date: "2023",
    sector: "Mines",
    context: "Approvisionnement urgent de 500+ références de pièces de rechange pour engins de forage et concassage. Délai critique : 3 semaines.",
    solution: "Sourcing international (USA, UE), consolidation logistique, dédouanement express et livraison directe sur site avec inventaire complet.",
    results: [
      "Livraison en 18 jours (vs 3 semaines demandées)",
      "100% des références trouvées",
      "Économie de 12% sur le budget",
      "Contrat cadre signé pour 3 ans",
    ],
    image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Instrumentation centrale électrique",
    client: "Société d'Énergie du Congo",
    location: "Brazzaville",
    date: "2023",
    sector: "Énergie",
    context: "Installation d'un système de monitoring complet pour une centrale thermique. Besoin de fiabilité et précision des mesures.",
    solution: "Fourniture et calibration de 45 manomètres, 28 transmetteurs de pression, 12 débitmètres électromagnétiques et système d'acquisition de données.",
    results: [
      "Précision des mesures : ±0.1%",
      "Disponibilité centrale : +8%",
      "Maintenance prédictive activée",
      "ROI atteint en 14 mois",
    ],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nos réalisations
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Découvrez comment FOMICO Industries accompagne ses clients sur le terrain avec des solutions concrètes et mesurables.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`bg-white rounded-2xl overflow-hidden shadow-sm ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex`}
            >
              <div className="lg:w-2/5 relative h-64 lg:h-auto">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-fomico-orange text-white text-xs font-medium px-3 py-1 rounded-full">
                    {project.sector}
                  </span>
                </div>
              </div>
              <div className="lg:w-3/5 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-4 text-sm text-fomico-gray-dark mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {project.date}</span>
                </div>

                <h2 className="text-2xl font-bold text-fomico-navy mb-2">{project.title}</h2>
                <p className="text-sm text-fomico-orange font-medium mb-6">Client : {project.client}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-fomico-navy mb-1">Contexte</h3>
                    <p className="text-sm text-fomico-gray-dark leading-relaxed">{project.context}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy mb-1">Solution apportée</h3>
                    <p className="text-sm text-fomico-gray-dark leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-fomico-navy mb-3">Résultats obtenus</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {project.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-fomico-orange shrink-0 mt-0.5" />
                        <span className="text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
