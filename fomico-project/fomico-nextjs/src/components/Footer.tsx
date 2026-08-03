import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}/a-propos/`, label: tNav("about") },
    { href: `/${locale}/produits/`, label: tNav("products") },
    { href: `/${locale}/services/`, label: tNav("services") },
    { href: `/${locale}/secteurs/`, label: tNav("sectors") },
    { href: `/${locale}/realisations/`, label: tNav("projects") },
    { href: `/${locale}/actualites/`, label: tNav("news") },
    { href: `/${locale}/carrieres/`, label: tNav("careers") },
    { href: `/${locale}/contact/`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-fomico-navy text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-11 h-11 shrink-0">
                <Image src="/logo.png" alt="FOMICO Industries" fill sizes="44px" className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  <span className="text-fomico-orange">FOMICO</span>{" "}
                  {t("company").replace(/^FOMICO\s*/i, "")}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{t("tagline")}</p>
            <SocialLinks size="md" />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-fomico-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{tNav("contact")}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-fomico-orange shrink-0 mt-0.5" />
                <span>
                  {t("address")}
                  <br />
                  {t("address2")}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-fomico-orange shrink-0" />
                <a href="tel:+242064671313" className="hover:text-fomico-orange transition-colors">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-fomico-orange shrink-0" />
                <a
                  href="mailto:contact@fomico-industries.com"
                  className="hover:text-fomico-orange transition-colors"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-fomico-orange shrink-0" />
                <span>{t("hours")}</span>
              </li>
            </ul>
          </div>

          {/* Quote CTA */}
          <div>
            <h3 className="font-semibold mb-4">{t("services")}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {t("tagline")}
            </p>
            <Link href={`/${locale}/devis/`} className="btn-primary text-sm">
              {tNav("quote")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            &copy; {year} {t("company")}. {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/mentions-legales/`} className="hover:text-fomico-orange transition-colors">
              {t("legal")}
            </Link>
            <Link href={`/${locale}/confidentialite/`} className="hover:text-fomico-orange transition-colors">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
