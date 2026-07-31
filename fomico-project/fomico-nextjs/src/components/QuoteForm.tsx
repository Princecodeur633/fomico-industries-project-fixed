"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createQuoteRequest, ApiError } from "@/lib/api";

const quoteSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  societe: z.string().min(2, "Le nom de la société est requis"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  produit: z.string().min(1, "Veuillez sélectionner un type de produit"),
  quantite: z.string().min(1, "La quantité est requise"),
  message: z.string().min(10, "Veuillez décrire votre besoin en au moins 10 caractères"),
  fichier: z.any().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const produits = [
  "Vérins hydrauliques",
  "Flexibles haute pression",
  "Raccords et accessoires",
  "Équipements de protection (EPI)",
  "Robinetterie industrielle",
  "Instrumentation",
  "Tuyauterie",
  "Hydraulique / Pneumatique",
  "Produits pétroliers",
  "Maintenance & SAV",
  "Autre",
];

export default function QuoteForm() {
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
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // The file is tracked separately (selectedFile) — strip it from the
    // payload sent as JSON `data`, since it's uploaded as a separate part.
    const { fichier, ...payload } = data;

    try {
      await createQuoteRequest(payload, selectedFile);
      setIsSuccess(true);
      reset();
      setFileName(null);
      setSelectedFile(null);
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

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg animate-scale-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in [animation-delay:100ms]">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-fomico-navy mb-3">
          Demande envoyée avec succès !
        </h2>
        <p className="text-fomico-gray-dark mb-6">
          Notre équipe commerciale vous contactera sous 24 heures ouvrées avec une proposition personnalisée.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="btn-outline transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 md:p-10 shadow-lg space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-fomico-navy mb-2">
            Nom complet <span className="text-fomico-orange">*</span>
          </label>
          <input
            {...register("nom")}
            type="text"
            id="nom"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
            placeholder="Jean Dupont"
          />
          {errors.nom && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.nom.message}
            </p>
          )}
        </div>

        {/* Société */}
        <div>
          <label htmlFor="societe" className="block text-sm font-medium text-fomico-navy mb-2">
            Société <span className="text-fomico-orange">*</span>
          </label>
          <input
            {...register("societe")}
            type="text"
            id="societe"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
            placeholder="Nom de votre entreprise"
          />
          {errors.societe && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.societe.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-fomico-navy mb-2">
            Email <span className="text-fomico-orange">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
            placeholder="contact@entreprise.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
            </p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-fomico-navy mb-2">
            Téléphone <span className="text-fomico-orange">*</span>
          </label>
          <input
            {...register("telephone")}
            type="tel"
            id="telephone"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
            placeholder="+242 06 467 1313"
          />
          {errors.telephone && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.telephone.message}
            </p>
          )}
        </div>
      </div>

      {/* Produit */}
      <div>
        <label htmlFor="produit" className="block text-sm font-medium text-fomico-navy mb-2">
          Produit ou service concerné <span className="text-fomico-orange">*</span>
        </label>
        <select
          {...register("produit")}
          id="produit"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all bg-white"
        >
          <option value="">Sélectionnez un produit...</option>
          {produits.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.produit && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.produit.message}
          </p>
        )}
      </div>

      {/* Quantité */}
      <div>
        <label htmlFor="quantite" className="block text-sm font-medium text-fomico-navy mb-2">
          Quantité estimée <span className="text-fomico-orange">*</span>
        </label>
        <input
          {...register("quantite")}
          type="text"
          id="quantite"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all"
          placeholder="Ex: 10 unités, 500m, etc."
        />
        {errors.quantite && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.quantite.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-fomico-navy mb-2">
          Description du besoin <span className="text-fomico-orange">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-fomico-orange focus:ring-2 focus:ring-fomico-orange/20 outline-none transition-all resize-none"
          placeholder="Décrivez votre projet, les spécifications techniques, les délais souhaités..."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
          </p>
        )}
      </div>

      {/* Fichier */}
      <div>
        <label className="block text-sm font-medium text-fomico-navy mb-2">
          Pièce jointe (cahier des charges, plan, etc.)
        </label>
        <div className="relative">
          <input
            type="file"
            id="fichier"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fichier"
            className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-fomico-orange hover:bg-fomico-orange/5 transition-all"
          >
            <Upload className="w-5 h-5 text-fomico-gray-dark" />
            <span className="text-sm text-fomico-gray-dark">
              {fileName || "Cliquez pour télécharger un fichier (PDF, DOC, JPG - max 10 Mo)"}
            </span>
          </label>
        </div>
      </div>

      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2 animate-fade-in-up">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Envoyer ma demande
          </>
        )}
      </button>

      <p className="text-xs text-fomico-gray-dark">
        En envoyant ce formulaire, vous acceptez notre politique de confidentialité. 
        Nous ne partagerons jamais vos données avec des tiers.
      </p>
    </form>
  );
}
