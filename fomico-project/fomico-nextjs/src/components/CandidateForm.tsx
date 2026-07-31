"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createCandidate, ApiError } from "@/lib/api";

const candidateSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(6, "Numéro de téléphone invalide"),
  message: z.string().optional(),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

interface CandidateFormProps {
  /** Pre-filled job title, e.g. from a specific job listing. Omitted for spontaneous applications. */
  jobTitle?: string;
}

export default function CandidateForm({ jobTitle }: CandidateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError("Le fichier ne doit pas dépasser 10 Mo");
        return;
      }
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: CandidateFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createCandidate(
        { ...data, poste: jobTitle || "Candidature spontanée" },
        selectedFile
      );
      setIsSuccess(true);
      reset();
      setFileName(null);
      setSelectedFile(null);
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in [animation-delay:100ms]">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-fomico-navy mb-3">
          Candidature envoyée !
        </h2>
        <p className="text-fomico-gray-dark mb-6">
          Merci pour votre intérêt. Notre équipe RH examinera votre profil et vous recontactera si celui-ci correspond à nos besoins.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn-outline transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Envoyer une autre candidature
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
      {jobTitle && (
        <div className="bg-fomico-orange/10 text-fomico-navy text-sm font-medium px-4 py-3 rounded-lg">
          Candidature pour : <span className="font-bold">{jobTitle}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-fomico-navy mb-1.5">
            Nom complet *
          </label>
          <input
            id="nom"
            type="text"
            {...register("nom")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fomico-orange focus:border-transparent transition-all"
            placeholder="Votre nom complet"
          />
          {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-fomico-navy mb-1.5">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fomico-orange focus:border-transparent transition-all"
            placeholder="votre@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-fomico-navy mb-1.5">
          Téléphone *
        </label>
        <input
          id="telephone"
          type="tel"
          {...register("telephone")}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fomico-orange focus:border-transparent transition-all"
          placeholder="+242 XX XXX XXXX"
        />
        {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-fomico-navy mb-1.5">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fomico-orange focus:border-transparent transition-all resize-none"
          placeholder="Quelques mots sur votre motivation..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fomico-navy mb-1.5">CV (PDF, optionnel)</label>
        <label
          htmlFor="cv"
          className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg px-4 py-6 cursor-pointer hover:border-fomico-orange hover:bg-fomico-orange/5 transition-all"
        >
          <Upload className="w-5 h-5 text-fomico-gray-dark" />
          <span className="text-sm text-fomico-gray-dark">
            {fileName || "Cliquez pour joindre votre CV (max 10 Mo)"}
          </span>
        </label>
        <input id="cv" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
      </div>

      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2 animate-fade-in-up">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Envoyer ma candidature
          </>
        )}
      </button>
    </form>
  );
}
