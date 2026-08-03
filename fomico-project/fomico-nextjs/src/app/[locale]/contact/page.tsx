import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("contact")} | FOMICO Industries`,
    description: "Contactez FOMICO Industries à Brazzaville et Pointe-Noire. Téléphone, email, WhatsApp et formulaire de contact.",
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-fomico-navy py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets industriels.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-fomico-navy mb-6">Nos coordonnées</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-fomico-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy text-sm">Adresse</h3>
                    <p className="text-sm text-fomico-gray-dark mt-1">
                      14e Étage, Tour Business Center (Tour Jumelles) M'pila<br />
                      Brazzaville, République du Congo
                    </p>
                    <p className="text-sm text-fomico-gray-dark mt-2">
                      Pointe-Noire, République du Congo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-fomico-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy text-sm">Téléphone</h3>
                    <a href="tel:+242064671313" className="text-sm text-fomico-gray-dark hover:text-fomico-orange transition-colors mt-1 block">
                      +242 06 467 1313
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-fomico-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy text-sm">Email</h3>
                    <a href="mailto:contact@fomico-industries.com" className="text-sm text-fomico-gray-dark hover:text-fomico-orange transition-colors mt-1 block">
                      contact@fomico-industries.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-fomico-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy text-sm">WhatsApp</h3>
                    <a href="https://wa.me/242064671313" target="_blank" rel="noopener noreferrer" className="text-sm text-fomico-gray-dark hover:text-fomico-orange transition-colors mt-1 block">
                      +242 06 467 1313
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-fomico-orange/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-fomico-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fomico-navy text-sm">Horaires</h3>
                    <p className="text-sm text-fomico-gray-dark mt-1">
                      Lundi - Vendredi<br />
                      8h30 - 17h30
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm aspect-square">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.0!2d15.242!3d-4.269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTYnMDguNCJTIDE1wrAxNCczMS4yIkU!5e0!3m2!1sfr!2scg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FOMICO Industries - Brazzaville"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
