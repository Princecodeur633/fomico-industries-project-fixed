import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("news")} | FOMICO Industries`,
    description: "Actualités FOMICO Industries : nouveautés produits, partenariats, événements et articles techniques.",
  };
}

const news = [
  {
    slug: "partenariat-gea-westfalia",
    title: "Nouveau partenariat avec GEA Westfalia",
    excerpt: "FOMICO Industries renforce son catalogue avec les solutions de séparation GEA Westfalia pour le secteur pétrolier.",
    date: "2024-06-15",
    category: "Partenariat",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "expansion-cemac",
    title: "Expansion logistique zone CEMAC",
    excerpt: "Nous renforçons notre capacité de livraison avec un nouvel entrepôt à Pointe-Noire pour servir toute la sous-région.",
    date: "2024-05-22",
    category: "Entreprise",
    image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "nouvelle-gamme-epi",
    title: "Nouvelle gamme EPI certifiée EU",
    excerpt: "Lancement d'une gamme complète d'équipements de protection individuelle conformes aux normes européennes EN.",
    date: "2024-04-10",
    category: "Produit",
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "maintenance-industrielle",
    title: "Service maintenance 24/7",
    excerpt: "FOMICO lance son service d'intervention d'urgence 24h/24 pour minimiser les temps d'arrêt de vos équipements.",
    date: "2024-03-05",
    category: "Service",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "salon-industrie-2024",
    title: "Participation au Salon de l'Industrie 2024",
    excerpt: "Retrouvez l'équipe FOMICO au Salon de l'Industrie de Brazzaville du 15 au 18 septembre 2024.",
    date: "2024-02-20",
    category: "Événement",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "certification-iso",
    title: "Certification qualité ISO 9001",
    excerpt: "FOMICO Industries obtient la certification ISO 9001, garantissant la qualité de ses processus et services.",
    date: "2024-01-15",
    category: "Entreprise",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Actualités
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Restez informé de nos nouveautés, partenariats et événements.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article key={item.slug} className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium bg-fomico-orange/10 text-fomico-orange px-2 py-1 rounded-full">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <span className="text-xs text-fomico-gray-dark flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.date)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-fomico-navy mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-fomico-gray-dark mb-4 line-clamp-3">{item.excerpt}</p>
                <Link 
                  href={`/fr/actualites/${item.slug}/`}
                  className="inline-flex items-center text-fomico-orange font-medium text-sm"
                >
                  Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
