"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  zh: "中文",
  it: "IT",
  es: "ES",
};

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-3.5 h-3.5 text-fomico-gray-dark shrink-0" />
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className="text-sm font-medium bg-transparent border-none cursor-pointer hover:text-fomico-orange transition-colors focus:outline-none focus:ring-0 uppercase"
        aria-label="Changer de langue"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabels[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
