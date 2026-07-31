import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Factory } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("products")} | FOMICO Industries`,
    description: "Catalogue complet de fournitures industrielles : vérins hydrauliques, flexibles, raccords, EPI, robinetterie, instrumentation.",
  };
}

const categories = [
  {
    slug: "verins-hydrauliques",
    title: "Vérins hydrauliques",
    desc: "Vérins simple et double effet, télescopiques, pour applications industrielles et mobiles.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    count: 45,
  },
  {
    slug: "flexibles",
    title: "Flexibles haute pression",
    desc: "Tuyaux hydrauliques, industriels et spéciaux pour fluides, gaz et produits chimiques.",
    image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=600&q=80",
    count: 120,
  },
  {
    slug: "raccords",
    title: "Raccords et accessoires",
    desc: "Raccords hydrauliques, pneumatiques et industriels en acier, inox et laiton.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
    count: 200,
  },
  {
    slug: "epi",
    title: "Équipements de protection",
    desc: "Casques, gants, lunettes, chaussures de sécurité et équipements de protection respiratoire.",
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=600&q=80",
    count: 85,
  },
  {
    slug: "robinetterie",
    title: "Robinetterie industrielle",
    desc: "Vannes, robinets, vannes à boisseau sphérique et clapets pour fluides industriels.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
    count: 60,
  },
  {
    slug: "instrumentation",
    title: "Instrumentation",
    desc: "Manomètres, thermomètres, débitmètres, capteurs et instruments de mesure.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    count: 75,
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nos produits
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Une gamme complète de fournitures industrielles de qualité, provenant des meilleurs fournisseurs américains et européens.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug} className="bg-white rounded-xl overflow-hidden shadow-sm card-hover group">
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fomico-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-fomico-orange bg-white/20 px-2 py-1 rounded">
                    {cat.count} références
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-fomico-navy mb-2">{cat.title}</h3>
                <p className="text-sm text-fomico-gray-dark mb-4 leading-relaxed">{cat.desc}</p>
                <Link 
                  href={`/fr/produits/${cat.slug}/`}
                  className="inline-flex items-center text-fomico-orange font-medium text-sm group-hover:gap-2 transition-all"
                >
                  Voir les produits <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
