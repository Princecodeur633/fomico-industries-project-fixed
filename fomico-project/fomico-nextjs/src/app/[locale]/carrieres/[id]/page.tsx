import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, Clock } from "lucide-react";
import CandidateForm from "@/components/CandidateForm";
import { getJobById, jobs } from "@/lib/jobs-data";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: String(job.id) }));
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string; locale: string };
}): Promise<Metadata> {
  const job = getJobById(Number(id));
  return {
    title: job ? `${job.title} | Carrières FOMICO Industries` : "Offre d'emploi | FOMICO Industries",
    description: job?.description,
  };
}

export default function JobDetailPage({
  params: { id, locale },
}: {
  params: { id: string; locale: string };
}) {
  const job = getJobById(Number(id));

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-fomico-navy py-16">
        <div className="container-custom">
          <Link
            href={`/${locale}/carrieres/`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux offres d&apos;emploi
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{job.title}</h1>
            <span className="text-xs font-medium bg-fomico-orange/10 text-fomico-orange px-2 py-1 rounded-full whitespace-nowrap">
              {job.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-gray-300 text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> {job.department}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding grid lg:grid-cols-5 gap-10">
        {/* Job details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-fomico-navy mb-3">Description du poste</h2>
            <p className="text-sm text-fomico-gray-dark leading-relaxed">{job.description}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-fomico-navy mb-3">Profil recherché</h2>
            <ul className="space-y-2">
              {job.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-fomico-gray-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-fomico-orange mt-1.5 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application form */}
        <div className="lg:col-span-3">
          <CandidateForm jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
}
