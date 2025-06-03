export default async function sitemap() {
  const baseUrl = "https://www.dormesia.com";

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Récupérer les articles dynamiquement
  let articlePages = [];

  try {
    // Essayer de récupérer les articles depuis l'API GitHub
    const response = await fetch(`${baseUrl}/api/cms/github/articles`, {
      next: { revalidate: 3600 }, // Cache pendant 1 heure
    });

    if (response.ok) {
      const articles = await response.json();

      for (const file of articles) {
        if (file.name && file.name.endsWith(".md")) {
          try {
            const fileResponse = await fetch(
              `${baseUrl}/api/cms/github/article/${file.name.replace(
                ".md",
                ""
              )}`,
              {
                next: { revalidate: 3600 },
              }
            );

            if (fileResponse.ok) {
              const fileData = await fileResponse.json();
              const content = atob(fileData.content);

              // Parser le frontmatter pour vérifier si l'article est publié
              const frontmatterRegex =
                /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
              const match = content.match(frontmatterRegex);

              if (match) {
                const frontmatterLines = match[1].split("\n");
                const frontmatter = {};

                for (const line of frontmatterLines) {
                  const trimmedLine = line.trim();
                  if (!trimmedLine || !trimmedLine.includes(":")) continue;

                  const [key, ...valueParts] = trimmedLine.split(":");
                  let value = valueParts.join(":").trim().replace(/['"]/g, "");

                  if (value === "true") value = true;
                  else if (value === "false") value = false;

                  frontmatter[key.trim()] = value;
                }

                // N'ajouter que les articles publiés (non-brouillons)
                if (!frontmatter.draft) {
                  const slug = frontmatter.slug || file.name.replace(".md", "");
                  const publishedDate = frontmatter.publishedAt
                    ? new Date(frontmatter.publishedAt)
                    : new Date();

                  articlePages.push({
                    url: `${baseUrl}/articles/${slug}`,
                    lastModified: publishedDate,
                    changeFrequency: "monthly",
                    priority: 0.8,
                  });
                }
              }
            }
          } catch (error) {
            console.error(
              `Erreur lors du traitement de l'article ${file.name}:`,
              error
            );
          }
        }
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des articles pour le sitemap:",
      error
    );

    // Articles de fallback si l'API échoue
    const fallbackArticles = [
      "phases-du-sommeil",
      "meditation-sommeil",
      "hygiene-sommeil-naturelle",
    ];

    articlePages = fallbackArticles.map((slug) => ({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  }

  return [...staticPages, ...articlePages];
}
