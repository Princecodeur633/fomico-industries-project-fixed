import { getRequestConfig } from "next-intl/server";

export const locales = ["fr", "en", "zh", "it", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` replaces the deprecated `locale` param (next-intl 3.22+).
  // It typically corresponds to the `[locale]` segment matched by the
  // middleware, but can resolve to `undefined` on some internal render
  // passes (e.g. metadata generation) or for routes the middleware never
  // touches (e.g. a stray request that doesn't match a real locale).
  // Per next-intl's own guidance, fall back to the default locale in that
  // case instead of throwing — this keeps the app resilient.
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
