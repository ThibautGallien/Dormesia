import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Moon, Sun, ActivitySquare, BarChart4 } from "lucide-react";
import FeatureCard from "@/components/feature-card";
import Testimonial from "@/components/testimonial";
import Newsletter from "@/components/newsletter";

export default function HomePage() {
  const features = [
    {
      icon: <Moon className="h-10 w-10 text-indigo-600" />,
      title: "Conseils Personnalisés",
      description:
        "Des recommandations adaptées à votre profil de sommeil et à vos habitudes de vie.",
    },
    {
      icon: <Sun className="h-10 w-10 text-amber-500" />,
      title: "Routines Optimales",
      description:
        "Découvrez les meilleures routines du matin et du soir pour un sommeil réparateur.",
    },
    {
      icon: <ActivitySquare className="h-10 w-10 text-emerald-500" />,
      title: "Analyse du Sommeil",
      description:
        "Comprenez les différentes phases du sommeil et leur impact sur votre santé.",
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-purple-500" />,
      title: "Suivi des Progrès",
      description:
        "Suivez l'évolution de votre sommeil et identifiez les facteurs d'amélioration.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Grâce aux conseils de Dormesia, je dors enfin sans interruption. Une vraie révolution pour ma santé!",
      author: "Sophie L.",
      role: "Professeure",
    },
    {
      quote:
        "Le quiz m'a permis d'identifier mes problèmes de sommeil. Les recommandations sont précises et efficaces.",
      author: "Thomas M.",
      role: "Développeur",
    },
    {
      quote:
        "J'ai suivi les routines proposées pendant un mois et mon sommeil s'est considérablement amélioré.",
      author: "Émilie D.",
      role: "Médecin",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Redécouvrez le Pouvoir d'un Sommeil Réparateur
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Dormesia vous guide vers une meilleure qualité de sommeil et une
              vie plus équilibrée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-indigo-900 hover:bg-indigo-100"
              >
                <Link href="/quiz-">Évaluez Votre Sommeil</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/articles">Découvrir Nos Articles</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300">
              Pourquoi le Sommeil est Essentiel
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Le sommeil n'est pas un luxe, c'est une nécessité biologique. Il
              joue un rôle crucial dans la santé physique et mentale, la
              consolidation de la mémoire, la régulation hormonale et le
              renforcement du système immunitaire.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Chez Dormesia, nous croyons qu'un sommeil de qualité est le
              fondement d'une vie équilibrée et épanouie. Notre mission est de
              vous aider à comprendre votre sommeil et à l'améliorer.
            </p>
            <div>
              <Button className="group">
                <Link href="/a-propos">En Savoir Plus</Link>
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-[400px]">
            <Image
              src="/images/hero/hero1.webp"
              alt="Personne dormant paisiblement"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-indigo-50 dark:bg-indigo-950/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Dormesia vous accompagne dans toutes les dimensions de votre
              sommeil pour une vie plus épanouie et énergique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Articles Preview Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
            Articles Récents
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explorez nos derniers articles sur le sommeil, la santé et le
            bien-être.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src="/images/articles/article1.webp"
                alt="Les phases du sommeil"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Santé
              </div>
              <h3 className="text-xl font-bold mb-2">
                Les 4 Phases du Sommeil Expliquées
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Découvrez les différentes phases du sommeil et leur importance
                pour votre santé globale.
              </p>
              <Link
                href="/articles/phases-du-sommeil"
                className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center"
              >
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src="https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Méditation avant le coucher"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Bien-être
              </div>
              <h3 className="text-xl font-bold mb-2">
                5 Techniques de Méditation pour Mieux Dormir
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Des exercices de méditation simples et efficaces pour apaiser
                l'esprit avant le coucher.
              </p>
              <Link
                href="/articles/meditation-sommeil"
                className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center"
              >
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src="https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Musique relaxante"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                Conseils
              </div>
              <h3 className="text-xl font-bold mb-2">
                L'Impact de la Musique sur la Qualité du Sommeil
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Comment certains genres musicaux peuvent améliorer votre sommeil
                et réduire l'anxiété.
              </p>
              <Link
                href="/articles/musique-sommeil"
                className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center"
              >
                Lire l'article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/articles" className="flex items-center">
              Voir Tous Nos Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Ce Que Disent Nos Utilisateurs
            </h2>
            <p className="text-lg text-indigo-200">
              Des témoignages de personnes qui ont amélioré leur sommeil grâce à
              Dormesia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Newsletter />
      </section>
    </div>
  );
}
