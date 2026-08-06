import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en", "zh", "it", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export const config = {
  // Matches everything except Next.js internals and files with an extension
  // (static assets like favicon.ico, robots.txt, images, etc).
  matcher: ["/", "/(fr|en|zh|it|es)/:path*"],
};

