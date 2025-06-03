// app/articles/[slug]/page.jsx
import { notFound } from "next/navigation";

// Fonction pour récupérer un article depuis l'API GitHub
async function getArticle(slug) {
  try {
    // URL pour appeler l'API - en production on peut utiliser une URL relative
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "" // URL relative en production
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/cms/github/article/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Décoder le contenu base64
    const content = atob(data.content);

    // Parser le frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return null;
    }

    const frontmatterLines = match[1].split("\n");
    const contentBody = match[2];
    const frontmatter = {};

    // Parser le frontmatter
    for (const line of frontmatterLines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || !trimmedLine.includes(":")) continue;

      const [key, ...valueParts] = trimmedLine.split(":");
      let value = valueParts.join(":").trim().replace(/['"]/g, "");

      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (!isNaN(value) && value !== "") value = Number(value);

      frontmatter[key.trim()] = value;
    }

    return {
      ...frontmatter,
      content: contentBody,
      slug,
    };
  } catch (error) {
    console.error("Erreur récupération article:", error);
    return null;
  }
}

// Composant de la page article
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* En-tête de l'article */}
          <header className="p-8 border-b">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                {article.category?.replace("-", " ") || "Article"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {article.author?.name && (
                <div className="flex items-center space-x-2">
                  {article.author.avatar && (
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span>{article.author.name}</span>
                </div>
              )}

              {article.publishedAt && (
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              {article.readingTime && (
                <span>{article.readingTime} min de lecture</span>
              )}
            </div>
          </header>

          {/* Image principale */}
          {article.image && (
            <div className="relative h-64 md:h-96">
              <img
                src={article.image}
                alt={article.imageAlt || article.title}
                title={article.imageTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contenu de l'article */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {/* Rendu basique du markdown - vous pouvez utiliser une lib comme react-markdown */}
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\n/g, "<br/>")
                    .replace(/^/, "<p>")
                    .replace(/$/, "</p>")
                    .replace(/<p><\/p>/g, ""),
                }}
              />
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <footer className="p-8 pt-0">
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Tags :
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </footer>
          )}
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

// Métadonnées pour le SEO
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    keywords: article.seoKeywords?.join(", "),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  };
}
