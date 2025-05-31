import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function ArticlesPage() {
  const articles = [
    {
      id: "phases-du-sommeil",
      title: "Les 4 Phases du Sommeil Expliquées",
      excerpt:
        "Découvrez les différentes phases du sommeil et leur importance pour votre santé globale.",
      category: "science",
      image:
        "https://images.pexels.com/photos/17499246/pexels-photo-17499246/free-photo-of-femme-lit-sommeil-dormir.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "12 avril 2024",
    },
    {
      id: "meditation-sommeil",
      title: "5 Techniques de Méditation pour Mieux Dormir",
      excerpt:
        "Des exercices de méditation simples et efficaces pour apaiser l'esprit avant le coucher.",
      category: "bien-être",
      image:
        "https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "5 avril 2024",
    },
    {
      id: "musique-sommeil",
      title: "L'Impact de la Musique sur la Qualité du Sommeil",
      excerpt:
        "Comment certains genres musicaux peuvent améliorer votre sommeil et réduire l'anxiété.",
      category: "conseils",
      image:
        "https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "28 mars 2024",
    },
    {
      id: "sommeil-stress",
      title: "Sommeil et Stress: Un Cercle Vicieux à Briser",
      excerpt:
        "Comprendre la relation entre le stress et les troubles du sommeil pour mieux les gérer.",
      category: "santé",
      image:
        "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "20 mars 2024",
    },
    {
      id: "alimentation-sommeil",
      title: "Alimentation et Sommeil: Ce Qu'il Faut Savoir",
      excerpt:
        "Les aliments qui favorisent un bon sommeil et ceux à éviter avant le coucher.",
      category: "nutrition",
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "15 mars 2024",
    },
    {
      id: "technologie-sommeil",
      title: "La Technologie au Service du Sommeil",
      excerpt:
        "Les innovations technologiques qui peuvent aider à suivre et améliorer la qualité de votre sommeil.",
      category: "technologie",
      image:
        "https://images.pexels.com/photos/4482896/pexels-photo-4482896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "8 mars 2024",
    },
    {
      id: "exercice-sommeil",
      title: "L'Exercice Physique et Votre Sommeil",
      excerpt:
        "Comment l'activité physique peut améliorer la qualité de votre sommeil et à quel moment la pratiquer.",
      category: "conseils",
      image:
        "https://images.pexels.com/photos/4058316/pexels-photo-4058316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "1 mars 2024",
    },
  ];

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
            {article.category}
          </div>
          <div className="text-sm text-gray-500">{article.date}</div>
        </div>
        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {article.excerpt}
        </p>
        <Link
          href={`/articles/${article.id}`}
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
            <TabsTrigger value="science">Science du sommeil</TabsTrigger>
            <TabsTrigger value="bien-être">Bien-être</TabsTrigger>
            <TabsTrigger value="conseils">Conseils pratiques</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="santé">Santé</TabsTrigger>
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
            value="science"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "science")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Bien-être */}
          <TabsContent
            value="bien-être"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "bien-être")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Conseils pratiques */}
          <TabsContent
            value="conseils"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "conseils")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Nutrition */}
          <TabsContent
            value="nutrition"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "nutrition")
              .map(renderArticleCard)}
          </TabsContent>

          {/* Santé */}
          <TabsContent
            value="santé"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles
              .filter((article) => article.category === "santé")
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
