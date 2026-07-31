import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Wrench,
  Truck,
  Settings,
  Package,
  ArrowRight,
  CheckCircle,
  Droplets,
  Mountain,
  Factory,
  Zap,
} from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const serviceIcons = [Package, Wrench, Truck, Settings];

const productKeys = [
  { slug: "verins-hydrauliques", key: "hydraulic" },
  { slug: "flexibles", key: "flexible" },
  { slug: "raccords", key: "fitting" },
  { slug: "epi", key: "epi" },
  { slug: "robinetterie", key: "valve" },
  { slug: "instrumentation", key: "instrument" },
];

const sectorIcons = [Droplets, Mountain, Factory, Zap];
const sectorKeys = ["oilgas", "mining", "industry", "energy"];

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const tServices = await getTranslations({ locale, namespace: "services" });
  const tProducts = await getTranslations({ locale, namespace: "products" });
  const tSectors = await getTranslations({ locale, namespace: "sectors" });
  const tStats = await getTranslations({ locale, namespace: "stats" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  const services = [
    { icon: serviceIcons[0], title: tServices("delivery.title"), desc: tServices("delivery.desc"), key: "delivery" },
    { icon: serviceIcons[1], title: tServices("maintenance.title"), desc: tServices("maintenance.desc"), key: "maintenance" },
    { icon: serviceIcons[2], title: tServices("consulting.title"), desc: tServices("consulting.desc"), key: "consulting" },
    { icon: serviceIcons[3], title: tServices("custom.title"), desc: tServices("custom.desc"), key: "custom" },
  ];

  const stats = [
    { value: "3+", label: tStats("experience") },
    { value: "1000+", label: tStats("products") },
    { value: "150+", label: tStats("clients") },
    { value: "6", label: tStats("countries") },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* Stats */}
      <section className="bg-fomico-navy-light py-10">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-fomico-orange">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fomico-navy mb-4">
              {tServices("title")}
            </h2>
            <p className="text-lg text-fomico-gray-dark max-w-2xl mx-auto">
              {tServices("subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.key} delay={index * 80}>
                  <div className="bg-white rounded-xl p-6 border border-gray-100 card-hover h-full">
                    <div className="w-12 h-12 bg-fomico-orange/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-fomico-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-fomico-navy mb-2">{service.title}</h3>
                    <p className="text-sm text-fomico-gray-dark leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fomico-navy mb-4">
              {tProducts("title")}
            </h2>
            <p className="text-lg text-fomico-gray-dark max-w-2xl mx-auto">
              {tProducts("subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productKeys.map((p, index) => (
              <Reveal key={p.slug} delay={index * 60}>
                <Link
                  href={`/${locale}/produits/${p.slug}/`}
                  className="group bg-white rounded-xl p-6 border border-gray-100 card-hover flex items-center justify-between"
                >
                  <span className="font-semibold text-fomico-navy group-hover:text-fomico-orange transition-colors">
                    {tProducts(p.key)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-fomico-orange group-hover:translate-x-1 transition-transform" />
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/produits/`} className="btn-primary">
              {tProducts("title")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fomico-navy mb-4">
              {tSectors("title")}
            </h2>
            <p className="text-lg text-fomico-gray-dark max-w-2xl mx-auto">
              {tSectors("subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectorKeys.map((key, i) => {
              const Icon = sectorIcons[i];
              return (
                <Reveal key={key} delay={i * 80}>
                  <div className="bg-fomico-navy rounded-xl p-6 text-white text-center card-hover h-full">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-fomico-orange" />
                    </div>
                    <h3 className="font-semibold">{tSectors(key)}</h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href={`/${locale}/secteurs/`} className="btn-outline">
              {tSectors("title")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-fomico-navy text-white text-center">
        <Reveal className="container-custom max-w-2xl" animation="scale-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{tCta("title")}</h2>
          <p className="text-lg text-gray-300 mb-8">{tCta("subtitle")}</p>
          <Link href={`/${locale}/devis/`} className="btn-primary">
            <CheckCircle className="w-4 h-4 mr-2" />
            {tCta("button")}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
