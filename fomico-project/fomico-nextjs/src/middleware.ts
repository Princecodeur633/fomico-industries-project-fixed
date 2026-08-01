import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export const config = {
  // Matches everything except Next.js internals and files with an extension
  // (static assets like favicon.ico, robots.txt, images, etc).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
