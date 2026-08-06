"use client";

import { useTranslations, useLocale } from "next-intl";
import AnimatedCounter from "./AnimatedCounter";

const counterStats = [
  { end: 6, suffix: "+", key: "experience" as const },
  { end: 500000, suffix: "+", key: "products" as const },
  { end: 15000, suffix: "+", key: "clients" as const },
];

export default function StatsBar() {
  const t = useTranslations("stats");
  const locale = useLocale();

  return (
    <section className="bg-fomico-navy-light py-10">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {counterStats.map((stat) => (
          <div key={stat.key}>
            <div className="text-2xl md:text-3xl font-bold text-fomico-orange">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} locale={locale} />
            </div>
            <div className="text-sm text-gray-300">{t(stat.key)}</div>
          </div>
        ))}
        <div>
          <div className="text-lg md:text-xl font-bold text-fomico-orange leading-tight">
            {t("countriesValue")}
          </div>
          <div className="text-sm text-gray-300">{t("countries")}</div>
        </div>
      </div>
    </section>
  );
}
