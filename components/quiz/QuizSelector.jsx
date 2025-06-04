// components/quiz/QuizSelector.jsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClockIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BrainIcon,
} from "lucide-react";

export default function QuizSelector() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            Choisissez Votre Quiz Sommeil
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Sélectionnez le quiz qui correspond le mieux à vos besoins pour
            obtenir des recommandations personnalisées
          </p>
        </div>
      </section>

      {/* Quiz Options */}
      <section className="container mx-auto px-4 py-16 -mt-10">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quiz Standard */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-300 transition-all hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Rapide
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
                  <ClockIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Standard</h2>
                <p className="text-gray-600">
                  Évaluation rapide de votre sommeil
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>6 questions essentielles</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Résultats en 2 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Score de qualité global</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Conseils personnalisés</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Rapport PDF par email</span>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href="/quiz" className="flex items-center justify-center">
                  Commencer le Quiz Standard
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Parfait pour une première évaluation
              </p>
            </CardContent>
          </Card>

          {/* Quiz Avancé IA */}
          <Card className="relative overflow-hidden border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 hover:border-indigo-400 transition-all hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <Badge className="bg-indigo-600 text-white">
                <SparklesIcon className="h-3 w-3 mr-1" />
                IA Avancé
              </Badge>
            </div>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full mb-4">
                  <BrainIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-indigo-900">
                  Quiz IA Avancé
                </h2>
                <p className="text-indigo-700">
                  Analyse multidimensionnelle avec IA
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">
                    15 questions scientifiques
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">
                    Chronotype Horne-Östberg
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">
                    Troubles spécifiques identifiés
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">
                    Recommandations Zinzino personnalisées
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">
                    Plan d'action 30 jours
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-indigo-900">Espace membre privé</span>
                </div>
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                asChild
              >
                <Link
                  href="/quiz-avance"
                  className="flex items-center justify-center"
                >
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  Analyse IA Complète
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="text-xs text-indigo-600 text-center mt-4 font-medium">
                Recommandé pour une analyse approfondie
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Comparaison détaillée */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-indigo-900">
            Comparaison des Quiz
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-4 text-left">
                    Fonctionnalité
                  </th>
                  <th className="border border-gray-200 p-4 text-center">
                    Quiz Standard
                  </th>
                  <th className="border border-gray-200 p-4 text-center bg-indigo-50">
                    Quiz IA Avancé
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Nombre de questions
                  </td>
                  <td className="border border-gray-200 p-4 text-center">
                    6 questions
                  </td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    15 questions
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Durée estimée
                  </td>
                  <td className="border border-gray-200 p-4 text-center">
                    2 minutes
                  </td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    5-7 minutes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Analyse chronotype
                  </td>
                  <td className="border border-gray-200 p-4 text-center">❌</td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    ✅ Scientifique
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Troubles spécifiques
                  </td>
                  <td className="border border-gray-200 p-4 text-center">❌</td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    ✅ Détection IA
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Recommandations Zinzino
                  </td>
                  <td className="border border-gray-200 p-4 text-center">❌</td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    ✅ Personnalisées
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Plan d'action
                  </td>
                  <td className="border border-gray-200 p-4 text-center">
                    Conseils généraux
                  </td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    Plan 30 jours détaillé
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Espace membre
                  </td>
                  <td className="border border-gray-200 p-4 text-center">❌</td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    ✅ Accès privé
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-4 font-medium">
                    Suivi des progrès
                  </td>
                  <td className="border border-gray-200 p-4 text-center">❌</td>
                  <td className="border border-gray-200 p-4 text-center bg-indigo-50">
                    ✅ Dashboard
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-indigo-900">
            Questions Fréquentes
          </h2>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Puis-je faire les deux quiz ?
                </h3>
                <p className="text-gray-600">
                  Absolument ! Vous pouvez commencer par le quiz standard pour
                  une première évaluation, puis passer au quiz IA avancé pour
                  une analyse plus approfondie.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Mes données sont-elles sécurisées ?
                </h3>
                <p className="text-gray-600">
                  Oui, toutes vos données sont cryptées et sécurisées. Nous
                  respectons strictement le RGPD et ne partageons jamais vos
                  informations personnelles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Que contient l'espace membre ?
                </h3>
                <p className="text-gray-600">
                  L'espace membre (quiz avancé) inclut vos recommandations
                  Zinzino personnalisées, votre plan d'action 30 jours, et un
                  dashboard pour suivre vos progrès.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  Les recommandations remplacent-elles un avis médical ?
                </h3>
                <p className="text-gray-600">
                  Non, nos recommandations sont informationnelles. Si vous avez
                  des troubles du sommeil chroniques, consultez toujours un
                  professionnel de santé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold mb-6">
            Prêt à Améliorer Votre Sommeil ?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Commencez dès maintenant votre voyage vers un sommeil réparateur et
            une meilleure qualité de vie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-900"
              asChild
            >
              <Link href="/quiz">Quiz Standard</Link>
            </Button>
            <Button
              size="lg"
              className="bg-white text-indigo-900 hover:bg-indigo-100"
              asChild
            >
              <Link href="/quiz-avance" className="flex items-center">
                <SparklesIcon className="mr-2 h-4 w-4" />
                Quiz IA Avancé
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
