// config/sites.js - Configuration pour Dormesia uniquement

export const SITES_CONFIG = {
  dormesia: {
    id: "dormesia",
    name: "Dormesia",
    description: "Blog expert du sommeil et bien-être",
    domain: "dormesia.com",
    url: "https://dormesia.com",

    // 🎯 Configuration GitHub
    repo: "ThibautGallien/Dormesia",
    branch: "main",

    // 📁 Structure des contenus
    content: {
      articles: {
        folder: "content/articles",
        template: "article",
        fields: [
          { name: "title", type: "text", required: true, label: "Titre" },
          { name: "slug", type: "text", required: true, label: "URL (slug)" },
          { name: "excerpt", type: "textarea", label: "Résumé" },
          {
            name: "content",
            type: "markdown",
            required: true,
            label: "Contenu",
          },
          { name: "image", type: "image", label: "Image principale" },
          { name: "imageAlt", type: "text", label: "Texte alternatif image" },
          { name: "imageTitle", type: "text", label: "Titre image" },
          {
            name: "category",
            type: "select",
            required: true,
            label: "Catégorie",
            options: [
              { value: "science-sommeil", label: "Science du Sommeil" },
              { value: "conseils-sommeil", label: "Conseils Sommeil" },
              { value: "produits-naturels", label: "Produits Naturels" },
              { value: "troubles-sommeil", label: "Troubles du Sommeil" },
              { value: "hygiene-sommeil", label: "Hygiène du Sommeil" },
            ],
          },
          { name: "tags", type: "tags", label: "Mots-clés" },
          {
            name: "author",
            type: "object",
            label: "Auteur",
            fields: [
              {
                name: "name",
                type: "text",
                default: "Équipe Dormesia",
                label: "Nom",
              },
              { name: "avatar", type: "image", label: "Avatar" },
            ],
          },
          {
            name: "publishedAt",
            type: "date",
            required: true,
            label: "Date de publication",
          },
          {
            name: "draft",
            type: "boolean",
            default: false,
            label: "Brouillon",
          },
          {
            name: "featured",
            type: "boolean",
            default: false,
            label: "Article vedette",
          },
          {
            name: "readingTime",
            type: "number",
            label: "Temps de lecture (min)",
          },

          // 🔍 SEO spécifique Dormesia
          { name: "seoTitle", type: "text", label: "Titre SEO" },
          {
            name: "seoDescription",
            type: "textarea",
            label: "Description SEO",
          },
          { name: "seoKeywords", type: "tags", label: "Mots-clés SEO" },
        ],
      },
    },

    // 🖼️ Gestion des médias
    media: {
      folder: "public/images",
      publicPath: "/images",
      allowedTypes: ["jpg", "jpeg", "png", "webp", "svg", "gif"],
      maxSize: 5 * 1024 * 1024, // 5MB
    },

    // 🎨 Thème et styles
    theme: {
      primaryColor: "#6366F1", // Indigo pour Dormesia
      secondaryColor: "#EC4899", // Rose
      logo: "/images/dormesia-logo.png",
      favicon: "/favicon.ico",
    },

    // 📊 Analytics et SEO
    analytics: {
      google: "G-DORMESIA-GA4", // À remplacer par ton ID Google Analytics
      gtm: null, // Google Tag Manager si nécessaire
    },

    // 🔧 Configuration technique
    build: {
      framework: "next", // Next.js
      outputDir: ".next",
      publicDir: "public",
    },

    // 🌐 Internationalisation
    i18n: {
      defaultLocale: "fr",
      locales: ["fr"],
      timezone: "Europe/Paris",
    },
  },
};

// 🎯 Fonction pour récupérer la config d'un site
export function getSiteConfig(siteId) {
  return SITES_CONFIG[siteId] || null;
}

// 📋 Fonction pour lister tous les sites disponibles
export function getAllSites() {
  return Object.values(SITES_CONFIG);
}

// ✅ Site par défaut (pour ce CMS Dormesia)
export const DEFAULT_SITE = "dormesia";

// 🔍 Fonction pour valider un site
export function validateSite(siteId) {
  const site = getSiteConfig(siteId);
  if (!site) {
    throw new Error(`Site "${siteId}" non trouvé`);
  }
  return site;
}
