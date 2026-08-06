"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const slideKeys = ["oilgas", "mining", "industry", "energy", "agrifood", "maintenance", "telecom"] as const;

const slideImages: Record<(typeof slideKeys)[number], string> = {
  oilgas: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
  mining: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1920&q=80",
  industry: "https://images.unsplash.com/photo-1565514020176-db9e677f30d4?auto=format&fit=crop&w=1920&q=80",
  energy: "https://images.unsplash.com/photo-1473341304170-971dccb5ac71?auto=format&fit=crop&w=1920&q=80",
  agrifood: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d0201?auto=format&fit=crop&w=1920&q=80",
  maintenance: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
  telecom: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
};

export default function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideKeys.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slideKeys.length) % slideKeys.length);
  };

  const activeKey = slideKeys[currentSlide];

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {slideKeys.map((key, index) => (
          <div
            key={key}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slideImages[key]}')` }}
          />
        ))}
        <div className="absolute inset-0 gradient-overlay" />
      </div>

      {/* Carousel controls */}
      <button
        onClick={() => goToSlide(currentSlide - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => goToSlide(currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slideKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-fomico-orange" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={t(`slides.${key}.title`)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container-custom py-20">
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fomico-orange/20 rounded-full text-fomico-orange text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-fomico-orange rounded-full animate-pulse" />
            {t("badge")}
          </div>

          <div key={activeKey} className="animate-fade-in">
            <p className="text-fomico-orange font-semibold text-sm uppercase tracking-wider mb-2">
              {t(`slides.${activeKey}.title`)}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t(`slides.${activeKey}.spec`)}
              <span className="text-fomico-orange">.</span>
            </h1>
          </div>

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

          {/* Trust indicators with animated counters */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter end={6} suffix="+" locale={locale} />
              </div>
              <div className="text-sm text-gray-300">{tStats("experience")}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter end={500000} suffix="+" locale={locale} />
              </div>
              <div className="text-sm text-gray-300">{tStats("products")}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter end={15000} suffix="+" locale={locale} />
              </div>
              <div className="text-sm text-gray-300">{tStats("clients")}</div>
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
