import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Galerie | FOMICO Industries",
  description: "Galerie photo des activités, sites et interventions de FOMICO Industries.",
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", caption: "Entrepôt logistique — Pointe-Noire" },
  { src: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=800&q=80", caption: "Zone de stockage industriel" },
  { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80", caption: "Intervention technique sur site" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80", caption: "Salon de l'Industrie 2024" },
  { src: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=800&q=80", caption: "Équipements de protection individuelle" },
  { src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80", caption: "Contrôle qualité en atelier" },
  { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80", caption: "Livraison de matériel industriel" },
  { src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80", caption: "Équipe technique FOMICO" },
];

export default function GaleriePage({ params: { locale } }: { params: { locale: string } }) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Galerie</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Un aperçu en images de nos activités, nos sites et nos interventions sur le terrain.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <Reveal key={img.src} delay={index * 50} className="break-inside-avoid">
              <div className="group relative rounded-xl overflow-hidden shadow-sm card-hover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
