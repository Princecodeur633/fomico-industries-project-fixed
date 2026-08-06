"use client";

import { useTranslations, useLocale } from "next-intl";
import AnimatedCounter from "./AnimatedCounter";

export default function AboutPartnersCounter() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <div className="bg-white/10 rounded-xl p-6 text-center">
      <div className="text-3xl font-bold text-fomico-orange mb-2">
        <AnimatedCounter end={50} suffix="+" locale={locale} />
      </div>
      <div className="text-sm text-gray-300">{t("majorPartners")}</div>
    </div>
  );
}
