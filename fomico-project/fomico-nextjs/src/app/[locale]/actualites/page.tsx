import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Tag, FileText, Images } from "lucide-react";
import Reveal from "@/components/Reveal";
import { news, formatNewsDate } from "@/lib/news-data";

export const metadata: Metadata = {
  title: "Actualités | FOMICO Industries",
  description: "Actualités FOMICO Industries : nouveautés produits, partenariats, événements et articles techniques.",
};

export default function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Actualités
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms]">
            Retrouvez l&apos;historique de nos activités, nos nouveautés, partenariats et événements.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Quick links to Documentation & Galerie */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <Link
            href={`/${locale}/actualites/documentation/`}
            className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm card-hover border border-gray-100"
          >
            <div className="w-11 h-11 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-fomico-orange" />
            </div>
            <div>
              <h2 className="font-bold text-fomico-navy">Documentation</h2>
              <p className="text-sm text-fomico-gray-dark">Fiches techniques, catalogues et certifications</p>
            </div>
          </Link>
          <Link
            href={`/${locale}/actualites/galerie/`}
            className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm card-hover border border-gray-100"
          >
            <div className="w-11 h-11 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
              <Images className="w-5 h-5 text-fomico-orange" />
            </div>
            <div>
              <h2 className="font-bold text-fomico-navy">Galerie</h2>
              <p className="text-sm text-fomico-gray-dark">Photos de nos activités, sites et interventions</p>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Reveal key={item.slug} delay={index * 60}>
              <article className="bg-white rounded-xl overflow-hidden shadow-sm card-hover h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-fomico-orange/10 text-fomico-orange px-2 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                    <span className="text-xs text-fomico-gray-dark flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatNewsDate(item.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-fomico-navy mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-fomico-gray-dark mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
                  <Link
                    href={`/${locale}/actualites/${item.slug}/`}
                    className="inline-flex items-center text-fomico-orange font-medium text-sm link-underline w-fit"
                  >
                    Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
