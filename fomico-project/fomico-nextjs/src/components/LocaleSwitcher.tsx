"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-3.5 h-3.5 text-fomico-gray-dark" />
      <button
        onClick={() => switchLocale(locale === "fr" ? "en" : "fr")}
        className="text-sm font-medium hover:text-fomico-orange transition-colors uppercase"
        aria-label={`Switch to ${locale === "fr" ? "English" : "Français"}`}
      >
        {locale === "fr" ? "EN" : "FR"}
      </button>
    </div>
  );
}
