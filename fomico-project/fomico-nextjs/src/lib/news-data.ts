export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  image: string;
}

export const news: NewsItem[] = [
  {
    slug: "partenariat-gea-westfalia",
    title: "Nouveau partenariat avec GEA Westfalia",
    excerpt:
      "FOMICO Industries renforce son catalogue avec les solutions de séparation GEA Westfalia pour le secteur pétrolier.",
    content: [
      "FOMICO Industries est fière d'annoncer un nouveau partenariat stratégique avec GEA Westfalia, leader mondial des technologies de séparation industrielle.",
      "Ce partenariat nous permet d'élargir notre catalogue avec des solutions de séparation centrifuge de pointe, spécifiquement adaptées aux besoins du secteur pétrolier et gazier en Afrique centrale.",
      "Nos équipes techniques ont d'ores et déjà été formées aux dernières technologies GEA Westfalia, garantissant un accompagnement et un service après-vente de qualité pour nos clients.",
    ],
    date: "2024-06-15",
    category: "Partenariat",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "expansion-cemac",
    title: "Expansion logistique zone CEMAC",
    excerpt:
      "Nous renforçons notre capacité de livraison avec un nouvel entrepôt à Pointe-Noire pour servir toute la sous-région.",
    content: [
      "Dans le cadre de notre stratégie de développement régional, FOMICO Industries a inauguré un nouvel entrepôt logistique à Pointe-Noire.",
      "Cette nouvelle infrastructure de plus de 2000m² nous permet de réduire significativement nos délais de livraison sur l'ensemble de la zone CEMAC, tout en augmentant notre capacité de stockage pour mieux répondre aux besoins urgents de nos clients industriels.",
    ],
    date: "2024-05-22",
    category: "Entreprise",
    image: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "nouvelle-gamme-epi",
    title: "Nouvelle gamme EPI certifiée EU",
    excerpt:
      "Lancement d'une gamme complète d'équipements de protection individuelle conformes aux normes européennes EN.",
    content: [
      "La sécurité de nos clients et de leurs équipes est une priorité absolue. C'est pourquoi FOMICO Industries lance une nouvelle gamme complète d'équipements de protection individuelle (EPI), entièrement certifiée aux normes européennes EN.",
      "Cette gamme couvre l'ensemble des besoins de protection en environnement industriel : protection de la tête, des mains, des pieds, protection respiratoire et anti-chute.",
    ],
    date: "2024-04-10",
    category: "Produit",
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "maintenance-industrielle",
    title: "Service maintenance 24/7",
    excerpt:
      "FOMICO lance son service d'intervention d'urgence 24h/24 pour minimiser les temps d'arrêt de vos équipements.",
    content: [
      "Un arrêt de production peut coûter cher. C'est pourquoi FOMICO Industries lance son nouveau service de maintenance et d'intervention d'urgence disponible 24h/24 et 7j/7.",
      "Notre équipe de techniciens qualifiés est désormais mobilisable à tout moment pour intervenir sur vos installations hydrauliques, pneumatiques et mécaniques, partout en République du Congo.",
    ],
    date: "2024-03-05",
    category: "Service",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "salon-industrie-2024",
    title: "Participation au Salon de l'Industrie 2024",
    excerpt: "Retrouvez l'équipe FOMICO au Salon de l'Industrie de Brazzaville du 15 au 18 septembre 2024.",
    content: [
      "FOMICO Industries sera présent au Salon de l'Industrie de Brazzaville, du 15 au 18 septembre 2024.",
      "Venez rencontrer notre équipe commerciale et technique, découvrir nos dernières solutions et échanger sur vos projets industriels. Nous vous attendons nombreux sur notre stand !",
    ],
    date: "2024-02-20",
    category: "Événement",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "certification-iso",
    title: "Certification qualité ISO 9001",
    excerpt: "FOMICO Industries obtient la certification ISO 9001, garantissant la qualité de ses processus et services.",
    content: [
      "FOMICO Industries est heureuse d'annoncer l'obtention de la certification ISO 9001, reconnaissance internationale de la qualité de nos processus de gestion.",
      "Cette certification témoigne de notre engagement continu envers l'excellence opérationnelle et la satisfaction de nos clients, et vient renforcer la confiance que nous accordent nos partenaires depuis notre création.",
    ],
    date: "2024-01-15",
    category: "Entreprise",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((item) => item.slug === slug);
}

export function formatNewsDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
