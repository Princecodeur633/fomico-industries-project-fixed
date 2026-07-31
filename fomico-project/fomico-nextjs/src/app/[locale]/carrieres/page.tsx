import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, CheckCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { jobs } from "@/lib/jobs-data";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("careers")} | FOMICO Industries`,
    description: "Rejoignez FOMICO Industries. Découvrez nos offres d'emploi à Brazzaville et Pointe-Noire.",
  };
}

export default function CareersPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">
            Carrières
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms]">
            Rejoignez une équipe dynamique et contribuez au développement industriel de l&apos;Afrique centrale.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Why join */}
        <Reveal className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-fomico-navy mb-6 text-center">
            Pourquoi rejoindre FOMICO ?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Formation continue", desc: "Programmes de développement des compétences" },
              { title: "Évolution de carrière", desc: "Possibilités d'ascension interne" },
              { title: "Package attractif", desc: "Rémunération compétitive + avantages" },
              { title: "Impact concret", desc: "Contribuer au développement industriel" },
            ].map((item) => (
              <div key={item.title} className="p-4">
                <div className="w-12 h-12 bg-fomico-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-fomico-orange" />
                </div>
                <h3 className="font-semibold text-fomico-navy mb-1">{item.title}</h3>
                <p className="text-sm text-fomico-gray-dark">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Job listings */}
        <h2 className="text-2xl font-bold text-fomico-navy mb-6">
          Offres d&apos;emploi ({jobs.length})
        </h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Reveal key={job.id} delay={index * 80}>
              <div className="bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-fomico-navy">{job.title}</h3>
                      <span className="text-xs font-medium bg-fomico-orange/10 text-fomico-orange px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-fomico-gray-dark mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-fomico-gray-dark">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {job.department}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.requirements.map((req) => (
                        <span key={req} className="text-xs bg-gray-100 text-fomico-navy px-2 py-1 rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/carrieres/${job.id}/`}
                    className="btn-outline text-sm whitespace-nowrap transition-transform hover:-translate-y-0.5 active:scale-95"
                  >
                    Postuler <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Spontaneous application */}
        <Reveal className="mt-12 bg-fomico-navy rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous ne trouvez pas le poste idéal ?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Nous sommes toujours à la recherche de talents. Envoyez-nous votre candidature spontanée.
          </p>
          <Link
            href={`/${locale}/carrieres/spontanee/`}
            className="btn-secondary transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Candidature spontanée
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
