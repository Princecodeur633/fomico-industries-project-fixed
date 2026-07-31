import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fomico-industries.com"),
  title: {
    default: "FOMICO Industries - Fournitures & Machines Industrielles",
    template: "%s | FOMICO Industries",
  },
  description: "FOMICO Industries, votre partenaire industriel au Congo. Vérins hydrauliques, flexibles, raccords, EPI et solutions sur mesure.",
  keywords: ["industrie", "hydraulique", "Congo", "fournitures industrielles", "pétrole", "mines", "Brazzaville"],
  authors: [{ name: "FOMICO Industries" }],
  creator: "FOMICO Industries",
  publisher: "FOMICO Industries",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "https://fomico-industries.com",
    siteName: "FOMICO Industries",
    title: "FOMICO Industries - Fournitures & Machines Industrielles",
    description: "Votre partenaire industriel au Congo. Solutions robustes et sur mesure.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FOMICO Industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOMICO Industries",
    description: "Fournitures & Machines Industrielles de pointe",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr/",
      en: "/en/",
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
