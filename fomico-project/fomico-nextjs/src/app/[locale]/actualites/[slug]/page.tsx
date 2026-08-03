import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getNewsBySlug, news, formatNewsDate } from "@/lib/news-data";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const item = getNewsBySlug(slug);
  return {
    title: item ? `${item.title} | Actualités FOMICO Industries` : "Actualité | FOMICO Industries",
    description: item?.excerpt,
  };
}

export default function NewsDetailPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.image}')` }}
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative container-custom h-full flex flex-col justify-end pb-10">
          <Link
            href={`/${locale}/actualites/`}
            className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors mb-4 text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux actualités
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-fomico-orange text-white px-2 py-1 rounded-full">
              <Tag className="w-3 h-3" /> {item.category}
            </span>
            <span className="text-xs text-gray-200 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formatNewsDate(item.date)}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white max-w-3xl">{item.title}</h1>
        </div>
      </div>

      <div className="container-custom section-padding grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {item.content.map((paragraph, i) => (
            <p key={i} className="text-fomico-gray-dark leading-relaxed mb-5 last:mb-0">
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="space-y-4">
          <h2 className="font-bold text-fomico-navy mb-2">Autres actualités</h2>
          {related.map((n) => (
            <Link
              key={n.slug}
              href={`/${locale}/actualites/${n.slug}/`}
              className="flex gap-3 bg-white rounded-xl p-3 shadow-sm card-hover"
            >
              <div
                className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url('${n.image}')` }}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fomico-navy line-clamp-2">{n.title}</p>
                <p className="text-xs text-fomico-gray-dark mt-1">{formatNewsDate(n.date)}</p>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
