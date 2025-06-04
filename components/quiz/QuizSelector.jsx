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
  HeartIcon,
  TrendingUpIcon,
  ZapIcon
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
            Sélectionnez le quiz qui correspond le mieux à vos besoins pour obtenir 
            des recommandations personnalisées
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
                <p className="text-gray-600">Évaluation rapide de votre sommeil</p>
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