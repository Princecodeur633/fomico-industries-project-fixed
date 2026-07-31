"use client";

import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

export default function ErrorMessage({ message = "Une erreur s'est produite", retry }: ErrorMessageProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-fomico-navy mb-2">{message}</h3>
      {retry && (
        <button onClick={retry} className="btn-outline mt-4">
          Réessayer
        </button>
      )}
    </div>
  );
}
