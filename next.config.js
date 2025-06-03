/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // ❌ COMMENTÉ - Incompatible avec les routes API dynamiques du CMS
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Suppression des extensions TypeScript
  pageExtensions: ["js", "jsx", "md", "mdx"],
  // Configuration pour les variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
