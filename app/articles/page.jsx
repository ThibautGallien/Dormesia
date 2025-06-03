import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Fonction pour récupérer les articles depuis l'API
async function getArticles() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/cms/github/articles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Pas de cache pour toujours avoir les derniers articles
      }
    );

    if (!response.ok) {
      throw new Error("Erreur récupération articles");
    }

    const data = await response.json();
    const processedArticles = [];

    for (const file of data) {
      if (file.name && file.name.endsWith(".md")) {
        try {
          const fileResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
            }/api/cms/github/article/${file.name.replace(".md", "")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            const content = atob(fileData.content);

            // Parser le frontmatter
            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
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
                else if (!isNaN(value) && value !== "") value = Number(value);

                frontmatter[key.trim()] = value;
              }

              const article = {
                id: frontmatter.slug || file.name.replace(".md", ""),
                title: frontmatter.title || "Article sans titre",
                excerpt: frontmatter.excerpt || "",
                category: frontmatter.category || "conseils",
                image:
                  frontmatter.image ||
                  "https://images.pexels.com/photos/6087674/pexels-photo-6087674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                date: frontmatter.publishedAt
                  ? new Date(frontmatter.publishedAt).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Date inconnue",
                draft: frontmatter.draft || false,
                slug: frontmatter.slug || file.name.replace(".md", ""),
              };

              // N'afficher que les articles publiés
              if (!article.draft) {
                processedArticles.push(article);
              }
            }
          }
        } catch (error) {
          console.error(`Erreur traitement fichier ${file.name}:`, error);
        }
      }
    }

    // Trier par date de publication (plus récent en premier)
    return processedArticles.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  } catch (error) {
    console.error("Erreur récupération articles:", error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
}

export default async function ArticlesPage() {
  // Récupérer les vrais articles depuis l'API
  const realArticles = await getArticles();

  // Articles de fallback en cas de problème
  const fallbackArticles = [
    {
      id: "phases-du-sommeil",
      title: "Les 4 Phases du Sommeil Expliquées",
      excerpt:
        "Découvrez les différentes phases du sommeil et leur importance pour votre santé globale.",
      category: "science-sommeil",
      image:
        "https://images.pexels.com/photos/17499246/pexels-photo-17499246/free-photo-of-femme-lit-sommeil-dormir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "12 avril 2024",
    },
    {
      id: "meditation-sommeil",
      title: "5 Techniques de Méditation pour Mieux Dormir",
      excerpt:
        "Des exercices de méditation simples et efficaces pour apaiser l'esprit avant le coucher.",
      category: "conseils-sommeil",
      image:
        "https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "5 avril 2024",
    },
  ];

  // Utiliser les vrais articles si disponibles, sinon les articles de fallback
  const articles = realArticles.length > 0 ? realArticles : fallbackArticles;

  // Fonction pour rendre une carte d'article
  const renderArticleCard = (article) => (
    <Card
      key={article.id}
      className="overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative h-48">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 capitalize">
            {article.category?.replace("-", " ") || "Conseils"}
          </div>
          <div className="text-sm text-gray-500">{article.date}</div>
        </div>
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {article.excerpt}
        </p>
        <Link
          href={`/articles/${article.slug || article.id}`}
          className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center hover:text-indigo-700 transition-colors"
        >
          Lire l'article
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6087674/pexels-photo-6087674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Articles & Ressources
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Découvrez nos guides, conseils et études sur le sommeil pour
              améliorer votre qualité de vie.
            </p>
            {realArticles.length > 0 && (
              <p className="text-sm text-indigo-200">
                {realArticles.length} article
                {realArticles.length > 1 ? "s" : ""} disponible
                {realArticles.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Search & Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Input
              type="text"
              placeholder="Rechercher un article..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              aria-label="Rechercher"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="tous" className="w-full">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="tous">Tous les articles</TabsTrigger>
            <TabsTrigger value="science-sommeil">
              Science du sommeil
            </TabsTrigger>
            <TabsTrigger value="conseils-sommeil">Conseils sommeil</TabsTrigger>
            <TabsTrigger value="produits-naturels">
              Produits naturels
            </TabsTrigger>
            <TabsTrigger value="troubles-sommeil">
              Troubles du sommeil
            </TabsTrigger>
            <TabsTrigger value="hygiene-sommeil">
              Hygiène du sommeil
            </TabsTrigger>
          </TabsList>

          {/* Tous les articles */}
          <TabsContent
            value="tous"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map(renderArticleCard)}
          </TabsContent>

          {/* Science du sommeil */}
          <TabsContent
            value="science-sommeil"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "science-sommeil")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Conseils sommeil */}
          <TabsContent
            value="conseils-sommeil"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "conseils-sommeil")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Produits naturels */}
          <TabsContent
            value="produits-naturels"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "produits-naturels")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Troubles du sommeil */}
          <TabsContent
            value="troubles-sommeil"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "troubles-sommeil")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Hygiène du sommeil */}
          <TabsContent
            value="hygiene-sommeil"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "hygiene-sommeil")
              .map(renderArticleCard)}
          </TabsContent>
        </Tabs>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
              Ne Manquez Aucun Article
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers
              articles directement dans votre boîte mail.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                required
                className="flex-grow"
              />
              <Button type="submit">S'inscrire</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
