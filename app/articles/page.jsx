"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Articles de fallback
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
      slug: "phases-du-sommeil",
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
      slug: "meditation-sommeil",
    },
  ];

  // Fonction pour récupérer les articles
  const loadArticles = async () => {
    try {
      setLoading(true);
      console.log("🔍 Chargement des articles...");

      const response = await fetch("/api/cms/github/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Articles reçus:", data);

      const processedArticles = [];

      for (const file of data) {
        if (file.name && file.name.endsWith(".md")) {
          try {
            const fileResponse = await fetch(
              `/api/cms/github/article/${file.name.replace(".md", "")}`,
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
                  else if (!isNaN(value) && value !== "") value = Number(value);

                  frontmatter[key.trim()] = value;
                }

                const article = {
                  id: frontmatter.slug || file.name.replace(".md", ""),
                  title: frontmatter.title || "Article sans titre",
                  excerpt: frontmatter.excerpt || "",
                  category: frontmatter.category || "conseils-sommeil",
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

                console.log(
                  `✅ Article traité: ${article.title} (draft: ${article.draft})`
                );

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

      // Trier par date
      const sortedArticles = processedArticles.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      if (sortedArticles.length > 0) {
        setArticles(sortedArticles);
        console.log(`✅ ${sortedArticles.length} articles chargés`);
      } else {
        console.log(
          "🔄 Aucun article trouvé, utilisation des articles de fallback"
        );
        setArticles(fallbackArticles);
      }
    } catch (error) {
      console.error("❌ Erreur chargement articles:", error);
      setError(error.message);
      setArticles(fallbackArticles);
    } finally {
      setLoading(false);
    }
  };

  // Charger les articles au montage
  useEffect(() => {
    loadArticles();
  }, []);

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
            {articles.length > 0 && (
              <p className="text-sm text-indigo-200">
                {articles.length} article{articles.length > 1 ? "s" : ""}{" "}
                disponible{articles.length > 1 ? "s" : ""}
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

          {/* Contenu */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Erreur: {error}</p>
              <p className="text-gray-600">
                Affichage des articles de démonstration
              </p>
            </div>
          ) : null}

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

        {articles.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Aucun article trouvé</p>
            <Button onClick={loadArticles}>Réessayer</Button>
          </div>
        )}
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
