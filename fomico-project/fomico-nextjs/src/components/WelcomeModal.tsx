"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { X, Droplets, Mountain, Factory, Zap, ArrowRight } from "lucide-react";

const SESSION_KEY = "fomico_welcome_shown";

const sectorIcons = [Droplets, Mountain, Factory, Zap];
const sectorKeys = ["oilgas", "mining", "industry", "energy"] as const;

export default function WelcomeModal() {
  const locale = useLocale();
  const tStats = useTranslations("stats");
  const tSectors = useTranslations("sectors");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Lock scroll while the modal is open.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const stats = [
    { value: "6+", label: tStats("experience") },
    { value: "10.000+", label: tStats("products") },
    { value: "2000+", label: tStats("clients") },
    { value: "République du Congo, pays d'Afrique et France", label: tStats("countries") },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 animate-fade-in"
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => setVisible(false)}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-4 h-4 text-fomico-navy" />
        </button>

        {/* Header */}
        <div className="bg-fomico-navy px-6 pt-10 pb-8 text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/logo.png" alt="FOMICO Industries" fill sizes="64px" className="object-contain" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Bienvenue chez <span className="text-fomico-orange">FOMICO</span> Industries
          </h2>
          <p className="text-sm text-gray-300 max-w-sm mx-auto">
            Votre partenaire industriel de confiance au Congo — fournitures et machines pour le pétrole, les mines et l&apos;industrie.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 px-6 py-5 border-b border-gray-100">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-bold text-fomico-orange">{stat.value}</div>
              <div className="text-[10px] text-fomico-gray-dark leading-tight mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sectors */}
        <div className="px-6 py-5">
          <p className="text-xs font-semibold text-fomico-gray-dark uppercase tracking-wide mb-3">
            Nos secteurs d&apos;activité
          </p>
          <div className="grid grid-cols-2 gap-2">
            {sectorKeys.map((key, i) => {
              const Icon = sectorIcons[i];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm text-fomico-navy"
                >
                  <Icon className="w-4 h-4 text-fomico-orange shrink-0" />
                  {tSectors(key)}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${locale}/a-propos/`}
            onClick={() => setVisible(false)}
            className="btn-primary flex-1 justify-center text-sm"
          >
            Découvrir FOMICO <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="btn-outline flex-1 justify-center text-sm"
          >
            Continuer sur le site
          </button>
        </div>
      </div>
    </div>
  );
}
