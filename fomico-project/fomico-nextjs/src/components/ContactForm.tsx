"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createContactMessage, ApiError } from "@/lib/api";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  sujet: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const sujets = [
  "Demande d'information",
  "Demande de devis",
  "Support technique",
  "Partenariat",
  "Recrutement",
  "Autre",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createContactMessage(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
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
      <div className="bg-white rounded-xl p-8 md:p-12 text-center shadow-sm animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in [animation-delay:100ms]">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-fomico-navy mb-3">
          Message envoyé !
        </h2>
        <p className="text-fomico-gray-dark">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-bold text-fomico-navy mb-6">
        Envoyez-nous un message
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-fomico-navy mb-2">
              Nom complet <span className="text-fomico-orange">*</span>
            </label>
            <input
              {...register("nom")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
              placeholder="Votre nom"
            />
            {errors.nom && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.nom.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-fomico-navy mb-2">
              Email <span className="text-fomico-orange">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-fomico-navy mb-2">
            Sujet <span className="text-fomico-orange">*</span>
          </label>
          <select
            {...register("sujet")}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all bg-white"
          >
            <option value="">Sélectionnez un sujet...</option>
            {sujets.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.sujet && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.sujet.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-fomico-navy mb-2">
            Message <span className="text-fomico-orange">*</span>
          </label>
          <textarea
            {...register("message")}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all resize-none"
            placeholder="Décrivez votre demande en détail..."
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
            </p>
          )}
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
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi...</>
          ) : (
            <><Send className="w-4 h-4 mr-2" /> Envoyer le message</>
          )}
        </button>
      </form>
    </div>
  );
}
