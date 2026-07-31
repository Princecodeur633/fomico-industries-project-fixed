const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);
