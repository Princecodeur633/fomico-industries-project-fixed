import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CandidateForm from "@/components/CandidateForm";

export const metadata: Metadata = {
  title: "Candidature spontanée | FOMICO Industries",
  description: "Envoyez-nous votre candidature spontanée pour rejoindre l'équipe FOMICO Industries.",
};

export default function SpontaneousApplicationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Candidature spontanée
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Vous ne trouvez pas le poste idéal dans nos offres actuelles ? Parlez-nous de vous, nous gardons votre profil pour nos prochains recrutements.
          </p>
        </div>
      </div>

      <div className="container-custom section-padding max-w-2xl">
        <CandidateForm />
      </div>
    </div>
  );
}
