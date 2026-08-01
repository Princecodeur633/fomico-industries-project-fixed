"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/`, label: t("home") },
    { href: `/${locale}/a-propos/`, label: t("about") },
    {
      href: `/${locale}/produits/`,
      label: t("products"),
      children: [
        { href: `/${locale}/produits/verins-hydrauliques/`, label: "Vérins hydrauliques" },
        { href: `/${locale}/produits/flexibles/`, label: "Flexibles haute pression" },
        { href: `/${locale}/produits/raccords/`, label: "Raccords et accessoires" },
        { href: `/${locale}/produits/epi/`, label: "Équipements de protection" },
        { href: `/${locale}/produits/robinetterie/`, label: "Robinetterie industrielle" },
        { href: `/${locale}/produits/instrumentation/`, label: "Instrumentation" },
      ],
    },
    { href: `/${locale}/services/`, label: t("services") },
    { href: `/${locale}/secteurs/`, label: t("sectors") },
    { href: `/${locale}/realisations/`, label: t("projects") },
    { href: `/${locale}/actualites/`, label: t("news") },
    { href: `/${locale}/contact/`, label: t("contact") },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-fomico-navy text-white text-sm">
        <div className="container-custom py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:+242064671313" className="flex items-center gap-1 hover:text-fomico-orange transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+242 06 467 1313</span>
            </a>
            <a href="mailto:contact@fomico-industries.com" className="flex items-center gap-1 hover:text-fomico-orange transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">contact@fomico-industries.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}/`} className="flex items-center gap-2.5 group">
            <div className="relative w-11 h-11 shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="FOMICO Industries"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-fomico-orange leading-tight">FOMICO</span>
              <span className="text-xs text-fomico-gray-dark leading-tight">
                par Fourniture Machine industrielle du Congo
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setDropdownOpen(link.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-fomico-orange bg-fomico-orange/5"
                      : "text-fomico-navy hover:text-fomico-orange hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {link.children && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-fomico-navy hover:text-fomico-orange hover:bg-gray-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href={`/${locale}/devis/`} className="btn-primary text-sm">
              {t("quote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-fomico-navy hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="inline-block transition-transform duration-200" style={{ transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-up">
          <div className="container-custom py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-fomico-orange bg-fomico-orange/5"
                      : "text-fomico-navy hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-fomico-gray-dark hover:text-fomico-orange transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href={`/${locale}/devis/`}
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("quote")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
