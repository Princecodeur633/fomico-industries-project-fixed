"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative container-custom py-20">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fomico-orange/20 rounded-full text-fomico-orange text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-fomico-orange rounded-full animate-pulse" />
            Fournitures & Machines Industrielles
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t("title")}
            <span className="text-fomico-orange">.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/produits/`} className="btn-primary group">
              {t("cta1")}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={`/${locale}/devis/`} className="btn-secondary">
              {t("cta2")}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">3+</div>
              <div className="text-sm text-gray-300">Années d&apos;expérience</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-300">Références produits</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">6</div>
              <div className="text-sm text-gray-300">Pays CEMAC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
