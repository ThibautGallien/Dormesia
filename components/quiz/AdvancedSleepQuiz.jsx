// components/quiz/AdvancedSleepQuiz.jsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import {
  BedIcon,
  MoonIcon,
  SunIcon,
  CoffeeIcon,
  ClockIcon,
  HeartIcon,
  CheckCircleIcon,
  MailIcon,
  ArrowRightIcon,
  ZapIcon,
  Volume2Icon,
  ActivityIcon,
  VolumeXIcon,
  EyeOffIcon,
  BrainIcon,
  SmartphoneIcon,
  TrendingUpIcon,
  RefreshCwIcon,
  SparklesIcon,
  AlertTriangleIcon,
  InfoIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
} from "lucide-react";
import {
  ADVANCED_QUIZ_QUESTIONS,
  analyzeAdvancedQuiz,
} from "@/lib/advanced-quiz-logic";
import ZinzinoProducts from "./ZinzinoProducts";
import {
  SmartLoadingScreen,
  useSmartLoading,
} from "@/components/ui/smart-loading";

// Mapping des icônes
const iconMap = {
  BedIcon,
  MoonIcon,
  SunIcon,
  CoffeeIcon,
  ClockIcon,
  ZapIcon,
  Volume2Icon,
  ActivityIcon,
  VolumeXIcon,
  EyeOffIcon,
  BrainIcon,
  SmartphoneIcon,
  TrendingUpIcon,
  RefreshCwIcon,
};

function mapQuizResultsToSleepProfile(quizResults) {
  if (!quizResults?.profile) {
    return "bon-dormeur";
  }

  const { category, percentage, troubles } = quizResults.profile;
  const troubleCount = troubles?.length || 0;

  if (percentage >= 80 && troubleCount === 0) {
    return "excellent-dormeur";
  } else if (percentage >= 65 && troubleCount <= 1) {
    return "bon-dormeur";
  } else if (percentage >= 50 && troubleCount <= 2) {
    return "dormeur-a-ameliorer";
  } else if (percentage >= 35) {
    return "sommeil-moyen";
  } else {
    return "sommeil-problematique";
  }
}

export default function AdvancedSleepQuiz() {
  const [step, setStep] = useState(0); // 0 = email, 1-15 = questions, 16 = results, 17 = produits
  const [quizResults, setQuizResults] = useState(null);
  const [answers, setAnswers] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sleepProfile, setSleepProfile] = useState("bon-dormeur");

  // 🚀 Hook pour le chargement intelligent
  const { isLoading, startLoading, stopLoading } = useSmartLoading();

  const totalSteps = ADVANCED_QUIZ_QUESTIONS.length;
  const progress = step === 0 ? 0 : (step / totalSteps) * 100;

  // Schema pour capture email
  const emailSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse email valide"),
    name: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  });

  // Schema pour questions
  const questionSchema = z.object({
    answer: z.string({
      required_error: "Veuillez sélectionner une réponse",
    }),
  });

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", name: "" },
  });

  const questionForm = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: { answer: "" },
  });

  // 🚀 NOUVELLE FONCTION: Submit email optimisé
  async function onEmailSubmit(values) {
    setIsSubmitting(true);
    startLoading(); // Démarrer l'animation

    try {
      setUserEmail(values.email);
      setUserName(values.name);

      // 🎯 STRATÉGIE 1: Réponse ultra-rapide
      backgroundEmailSync(values.email, values.name);

      // Simuler un délai minimal pour l'UX (éviter effet "trop rapide")
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Transition vers le quiz
      stopLoading();
      setIsSubmitting(false);
      setStep(1);

      toast({
        title: "Parfait !",
        description: "Votre analyse personnalisée démarre maintenant.",
      });
    } catch (error) {
      stopLoading();
      setIsSubmitting(false);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }

  // 🔄 Sync en arrière-plan (non-bloquante)
  async function backgroundEmailSync(email, name) {
    try {
      console.log(
        "🔄 Début sync arrière-plan pour:",
        email.substring(0, 3) + "***"
      );

      // Newsletter avec timeout court
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s max

      const newsletterPromise = fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "quiz-avance",
        }),
        signal: controller.signal,
      });

      try {
        const response = await newsletterPromise;
        clearTimeout(timeoutId);

        if (response.ok) {
          console.log("✅ Newsletter sync réussie");
        }
      } catch (error) {
        console.log(
          "⚠️ Newsletter sync timeout/error (non-bloquant):",
          error.message
        );
      }
    } catch (error) {
      console.error("❌ Erreur sync arrière-plan (non-bloquant):", error);
    }
  }

  async function calculateAdvancedResults(allAnswers) {
    try {
      setIsSubmitting(true);
      console.log("🧠 Analyse IA en cours...");

      const analysis = analyzeAdvancedQuiz(allAnswers);
      console.log("📊 Analyse complétée:", analysis);

      const results = {
        ...analysis,
        userEmail,
        userName,
        answers: allAnswers,
        completedAt: new Date().toISOString(),
        quizVersion: "advanced-v1",
      };
      setQuizResults(results);

      const mappedProfile = mapQuizResultsToSleepProfile(results);
      setSleepProfile(mappedProfile);
      console.log("🎯 Profil sommeil mappé:", mappedProfile);

      setStep(totalSteps + 1); // Results step
      await sendAdvancedResultsToDatabase(results);
    } catch (error) {
      console.error("❌ Erreur analyse:", error);
      toast({
        title: "Erreur d'analyse",
        description:
          "Une erreur s'est produite lors de l'analyse. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function sendAdvancedResultsToDatabase(results) {
    try {
      console.log("💾 Sauvegarde des résultats avancés...");

      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...results,
          isAdvancedQuiz: true,
          quizType: "advanced-sleep-analysis",
          sleepProfile: sleepProfile,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Résultats avancés sauvegardés:", data.data);
        toast({
          title: "✅ Analyse complétée !",
          description: "Votre analyse détaillée a été envoyée par email.",
        });
      } else {
        throw new Error(data.error || "Erreur de sauvegarde");
      }
    } catch (error) {
      console.error("❌ Erreur sauvegarde:", error);
      toast({
        title: "⚠️ Attention",
        description: "Vos résultats sont affichés mais la sauvegarde a échoué.",
        variant: "destructive",
      });
    }
  }

  function restartQuiz() {
    setStep(0);
    setAnswers({});
    setQuizResults(null);
    setUserEmail("");
    setUserName("");
    setSleepProfile("bon-dormeur");
    emailForm.reset();
    questionForm.reset();
  }

  function goBack() {
    if (step > 1) {
      setStep(step - 1);
      const prevAnswer = answers[`q${step - 1}`];
      if (prevAnswer) {
        questionForm.setValue("answer", prevAnswer);
      }
    }
  }

  function goToProducts() {
    setStep(totalSteps + 2);
  }

  function backToResults() {
    setStep(totalSteps + 1);
  }

  const currentQuestion =
    step > 0 && step <= totalSteps ? ADVANCED_QUIZ_QUESTIONS[step - 1] : null;
  const IconComponent = currentQuestion ? iconMap[currentQuestion.icon] : null;

  return (
    <div className="pt-16">
      {/* 🚀 Écran de chargement intelligent */}
      <SmartLoadingScreen
        userName={userName}
        estimatedTime={6000} // 6 secondes pour l'animation
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-indigo-200 text-sm mb-6 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Quiz IA Avancé - Analyse Multidimensionnelle
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Analyse Complète de Votre Sommeil
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              15 questions scientifiques pour une analyse IA personnalisée et
              des recommandations adaptées
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-indigo-200">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Chronotype scientifique</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Troubles spécifiques</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Plan 30 jours</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quiz Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Email Capture Step OPTIMISÉ */}
          {step === 0 && (
            <Card className="shadow-xl border-2 border-indigo-100">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
                    <MailIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Démarrez votre analyse IA
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Recevez votre rapport complet avec des recommandations
                    personnalisées
                  </p>
                </div>

                {/* Benefits grid */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="font-semibold text-green-800 mb-1">
                      ⚡ Analyse Rapide
                    </div>
                    <div className="text-green-600">
                      Résultats en moins de 2 minutes
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="font-semibold text-blue-800 mb-1">
                      🧠 IA Avancée
                    </div>
                    <div className="text-blue-600">15 paramètres analysés</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="font-semibold text-purple-800 mb-1">
                      🎯 100% Personnalisé
                    </div>
                    <div className="text-purple-600">Solutions sur-mesure</div>
                  </div>
                </div>

                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={emailForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Prénom</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Votre prénom"
                              {...field}
                              className="h-12 text-lg"
                              disabled={isSubmitting || isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="votre@email.com"
                              {...field}
                              className="h-12 text-lg"
                              disabled={isSubmitting || isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Création de votre profil IA...
                        </span>
                      ) : (
                        <>
                          Commencer l'Analyse IA
                          <SparklesIcon className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Messages rassurants */}
                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500">
                        🔒 Vos données sont sécurisées • Analyse gratuite et
                        sans engagement
                      </p>
                      {(isSubmitting || isLoading) && (
                        <div className="space-y-1">
                          <p className="text-sm text-indigo-600 font-medium animate-pulse">
                            🚀 Configuration de votre profil personnalisé...
                          </p>
                          <p className="text-xs text-gray-500">
                            Cela prend quelques secondes pour une analyse
                            optimale
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </Form>

                {/* Social proof */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Déjà{" "}
                      <span className="font-bold text-indigo-600">2 847</span>{" "}
                      personnes ont amélioré leur sommeil
                    </p>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ⭐
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        4.9/5 (234 avis)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Questions Steps */}
          {step >= 1 && step <= totalSteps && currentQuestion && (
            <Card className="shadow-xl">
              <CardContent className="p-8 md:p-12">
                {/* Progress Header */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium bg-indigo-100 px-3 py-1 rounded-full text-indigo-700">
                        Question {step}/{totalSteps}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {currentQuestion.category.replace("-", " ")}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 bg-gray-100" />
                </div>

                {/* Question Header */}
                <div className="flex items-start gap-6 mb-8">
                  {IconComponent && (
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.category === "chronotype" && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800 text-sm">
                          <InfoIcon className="h-4 w-4" />
                          <span className="font-medium">
                            Chronotype scientifique
                          </span>
                        </div>
                        <p className="text-blue-600 text-sm mt-1">
                          Cette question aide à déterminer votre rythme
                          circadien naturel
                        </p>
                      </div>
                    )}
                    {currentQuestion.category === "troubles" && (
                      <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-800 text-sm">
                          <AlertTriangleIcon className="h-4 w-4" />
                          <span className="font-medium">
                            Détection de troubles
                          </span>
                        </div>
                        <p className="text-amber-600 text-sm mt-1">
                          Ces informations aident à identifier d'éventuels
                          troubles du sommeil
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Form {...questionForm}>
                  <form
                    onSubmit={questionForm.handleSubmit(onQuestionSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={questionForm.control}
                      name="answer"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-4"
                            >
                              {currentQuestion.options.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-4 rounded-xl border-2 p-6 cursor-pointer transition-all hover:bg-gray-50 hover:border-indigo-300 has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                    className="mt-1"
                                  />
                                  <FormLabel
                                    htmlFor={option.value}
                                    className="flex-1 cursor-pointer font-normal text-lg leading-relaxed"
                                  >
                                    {option.label}
                                    {option.medical && (
                                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                        Attention médicale
                                      </span>
                                    )}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        disabled={step === 1}
                        className="px-8"
                      >
                        <ArrowLeftIcon className="mr-2 h-4 w-4" />
                        Précédent
                      </Button>
                      <Button
                        type="submit"
                        className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Analyse..."
                          : step === totalSteps
                          ? "Analyser mon Sommeil"
                          : "Suivant"}
                        {step === totalSteps ? (
                          <SparklesIcon className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Results Step */}
          {step === totalSteps + 1 && quizResults && (
            <div className="space-y-8">
              {/* Results Header */}
              <Card className="shadow-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 text-white">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                    <HeartIcon className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Votre Analyse IA Complétée !
                  </h2>
                  <p className="text-xl text-indigo-100 mb-6">
                    Profil:{" "}
                    <span className="font-bold text-white">
                      {quizResults.profile.category.replace("-", " ")}
                    </span>
                  </p>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">
                      {quizResults.profile.percentage}%
                    </div>
                    <div className="text-indigo-200">
                      Score global de qualité
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold mb-1">Chronotype</div>
                      <div className="capitalize">
                        {quizResults.profile.chronotype.replace("-", " ")}
                      </div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold mb-1">
                        Troubles détectés
                      </div>
                      <div>{quizResults.profile.troubles.length}</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                      <div className="font-semibold mb-1">Recommandations</div>
                      <div>
                        {quizResults.zinzinoRecommendations.length} produits
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chronotype & Profile */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <SunIcon className="h-6 w-6 text-amber-500 mr-3" />
                    Votre Profil Sommeil
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800 mb-2">
                        Chronotype:{" "}
                        {quizResults.profile.chronotype.replace("-", " ")}
                      </div>
                      <p className="text-blue-700">
                        {quizResults.profile.profileDescription}
                      </p>
                    </div>

                    {quizResults.profile.troubles.length > 0 && (
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-amber-800 mb-2 flex items-center">
                          <AlertTriangleIcon className="h-4 w-4 mr-2" />
                          Troubles identifiés (
                          {quizResults.profile.troubles.length})
                        </div>
                        <ul className="space-y-1">
                          {quizResults.profile.troubles.map((trouble, idx) => (
                            <li key={idx} className="text-amber-700">
                              • {trouble.description}
                              {trouble.medical && (
                                <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                  Consultation recommandée
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 🆕 BOUTON VERS LES PRODUITS ZINZINO */}
              <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
                    <ShoppingBagIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    🌿 Découvrez vos Produits Zinzino Personnalisés
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg">
                    Basé sur votre profil{" "}
                    <strong>{sleepProfile.replace("-", " ")}</strong>, nous
                    avons sélectionné les meilleurs compléments naturels pour
                    optimiser votre sommeil.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-green-800 mb-1">
                        ✓ 100% Naturel
                      </div>
                      <div className="text-green-600">
                        Ingrédients soigneusement sélectionnés
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-blue-800 mb-1">
                        ✓ Scientifiquement Prouvé
                      </div>
                      <div className="text-blue-600">
                        Tests cliniques rigoureux
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-purple-800 mb-1">
                        ✓ Recommandé par l'IA
                      </div>
                      <div className="text-purple-600">
                        Adapté à votre profil unique
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={goToProducts}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 h-12 text-lg"
                  >
                    Voir mes Recommandations Zinzino
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Recommendations Zinzino */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <SparklesIcon className="h-6 w-6 text-purple-500 mr-3" />
                    Vos Recommandations Zinzino Personnalisées
                  </h3>
                  <div className="grid gap-4">
                    {quizResults.zinzinoRecommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className={`p-6 rounded-lg border-2 ${
                          rec.priority === "URGENT"
                            ? "bg-red-50 border-red-200"
                            : rec.priority === "HIGH"
                            ? "bg-orange-50 border-orange-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-xl font-bold">{rec.product}</h4>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              rec.priority === "URGENT"
                                ? "bg-red-100 text-red-800"
                                : rec.priority === "HIGH"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {rec.priority}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{rec.reason}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Prise: </span>
                            {rec.timing}
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {rec.commission}
                          </div>
                        </div>
                        {rec.guarantee && (
                          <div className="mt-2 text-sm text-green-700 bg-green-100 p-2 rounded">
                            🛡️ {rec.guarantee}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Plan d'Action */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    Votre Plan d'Action 30 Jours
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {quizResults.actionPlan.overview}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quizResults.actionPlan.weeks.map((week, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="font-bold text-lg mb-2">
                          Semaine {week.week}: {week.focus}
                        </div>
                        <ul className="space-y-1 text-sm">
                          {week.actions.map((action, actionIdx) => (
                            <li key={actionIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                        {week.zinzinoIntro && (
                          <div className="mt-2 text-xs bg-purple-100 text-purple-700 p-2 rounded">
                            🌿 Zinzino: {week.zinzinoIntro}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Email Confirmation */}
              <Card className="shadow-lg bg-indigo-50">
                <CardContent className="p-8 text-center">
                  <MailIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Rapport Détaillé Envoyé !
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Votre analyse complète avec plan personnalisé a été envoyée
                    à <strong>{quizResults.userEmail}</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="px-8"
                      onClick={restartQuiz}
                    >
                      Refaire le Quiz
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/articles")}
                      className="px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Découvrir Nos Guides
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">
                      Prochaines étapes recommandées :
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        Consultez votre email pour le rapport détaillé
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        Commencez par la semaine 1 de votre plan personnalisé
                      </li>
                      <li className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        Explorez nos articles pour approfondir vos connaissances
                      </li>
                      {quizResults.profile.troubles.some((t) => t.medical) && (
                        <li className="flex items-center">
                          <AlertTriangleIcon className="h-4 w-4 text-amber-500 mr-2" />
                          <span className="text-amber-700">
                            Consultez un professionnel de santé pour les
                            troubles identifiés
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof & Testimonials */}
              <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Rejoignez plus de 10 000 personnes qui ont amélioré leur
                    sommeil
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        87%
                      </div>
                      <div className="text-gray-600">
                        d'amélioration de la qualité du sommeil en 3 semaines
                      </div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        92%
                      </div>
                      <div className="text-gray-600">
                        de satisfaction avec les recommandations Zinzino
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-700 italic mb-2">
                      "Grâce au quiz IA avancé de Dormesia et aux produits
                      Zinzino recommandés, j'ai retrouvé un sommeil réparateur
                      en moins d'un mois. Les conseils personnalisés font
                      vraiment la différence !"
                    </p>
                    <div className="text-sm text-gray-600">
                      <strong>Marie L.</strong> - Profil similaire au vôtre
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action Final */}
              <Card className="shadow-lg bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Prêt à transformer votre sommeil ?
                  </h3>
                  <p className="text-purple-100 mb-6">
                    Votre analyse personnalisée n'est que le début. Découvrez
                    comment nos experts peuvent vous accompagner davantage.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => (window.location.href = "/contact")}
                      className="bg-white text-purple-800 hover:bg-gray-100 px-8"
                    >
                      Consultation Personnalisée
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/articles")}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 px-8"
                    >
                      Explorer Nos Ressources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Summary for Sharing */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <SparklesIcon className="h-5 w-5 text-indigo-500 mr-2" />
                    Partagez vos résultats
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 text-sm mb-4">
                      Aidez vos proches à améliorer leur sommeil en partageant
                      ce quiz IA avancé :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => {
                          const url = window.location.origin + "/quiz-avance";
                          const text = `Je viens de faire le quiz sommeil IA de Dormesia - très instructif ! Mon profil : ${quizResults.profile.category}. À toi de jouer : ${url}`;
                          if (navigator.share) {
                            navigator.share({
                              title: "Quiz Sommeil IA - Dormesia",
                              text,
                              url,
                            });
                          } else {
                            navigator.clipboard.writeText(text);
                            toast({
                              title: "Lien copié !",
                              description:
                                "Le lien a été copié dans le presse-papier",
                            });
                          }
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Partager
                      </Button>
                      <Button
                        onClick={() => {
                          const mailtoLink = `mailto:?subject=Quiz Sommeil IA - Dormesia&body=Salut ! Je viens de faire ce quiz sommeil très complet qui analyse ton chronotype et tes troubles du sommeil. Très utile ! ${window.location.origin}/quiz-avance`;
                          window.location.href = mailtoLink;
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <MailIcon className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 🆕 ÉTAPE PRODUITS ZINZINO */}
          {step === totalSteps + 2 && quizResults && (
            <div className="space-y-8">
              {/* En-tête Produits */}
              <Card className="shadow-xl bg-gradient-to-br from-green-500 via-blue-600 to-green-800 text-white">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                    <ShoppingBagIcon className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    🌿 Vos Produits Zinzino Personnalisés
                  </h2>
                  <p className="text-xl text-green-100 mb-6">
                    Profil: <strong>{sleepProfile.replace("-", " ")}</strong> •
                    Score: <strong>{quizResults.profile.percentage}%</strong>
                  </p>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm max-w-2xl mx-auto">
                    <p className="text-green-100">
                      Notre IA a analysé votre profil de sommeil et sélectionné
                      les compléments Zinzino les plus adaptés à vos besoins
                      spécifiques. Ces recommandations sont basées sur votre
                      chronotype, vos troubles identifiés et votre score global.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={backToResults}
                  variant="outline"
                  className="px-6"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Retour aux Résultats
                </Button>
                <div className="text-sm text-gray-500">
                  Recommandations basées sur votre analyse IA
                </div>
              </div>

              {/* Composant ZinzinoProducts intégré */}
              <ZinzinoProducts
                sleepProfile={sleepProfile}
                className="bg-transparent"
              />

              {/* Pourquoi ces recommandations ? */}
              <Card className="shadow-lg bg-blue-50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <InfoIcon className="h-6 w-6 text-blue-500 mr-3" />
                    Pourquoi ces recommandations pour vous ?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          🧬 Votre Profil: {sleepProfile.replace("-", " ")}
                        </h4>
                        <p className="text-blue-700 text-sm">
                          {sleepProfile === "excellent-dormeur" &&
                            "Vous avez un excellent sommeil ! Ces produits vous aideront à maintenir cet équilibre optimal."}
                          {sleepProfile === "bon-dormeur" &&
                            "Votre sommeil est bon mais peut être optimisé. Ces produits renforceront votre récupération."}
                          {sleepProfile === "dormeur-a-ameliorer" &&
                            "Votre sommeil nécessite quelques ajustements. Ces produits ciblent vos besoins spécifiques."}
                          {sleepProfile === "sommeil-moyen" &&
                            "Votre sommeil peut être nettement amélioré. Ces produits offrent une approche complète."}
                          {sleepProfile === "sommeil-problematique" &&
                            "Votre sommeil nécessite une attention immédiate. Ces produits forment un protocole complet."}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-800 mb-2">
                          🎯 Chronotype:{" "}
                          {quizResults.profile.chronotype.replace("-", " ")}
                        </h4>
                        <p className="text-green-700 text-sm">
                          Votre rythme circadien naturel influence le timing
                          optimal de prise des compléments.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border-l-4 border-amber-500">
                        <h4 className="font-semibold text-amber-800 mb-2">
                          ⚠️ Troubles identifiés:{" "}
                          {quizResults.profile.troubles.length}
                        </h4>
                        <p className="text-amber-700 text-sm">
                          {quizResults.profile.troubles.length === 0
                            ? "Aucun trouble majeur détecté. Prévention optimale."
                            : "Les produits sélectionnés ciblent spécifiquement vos troubles identifiés."}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-800 mb-2">
                          📊 Score global: {quizResults.profile.percentage}%
                        </h4>
                        <p className="text-purple-700 text-sm">
                          Plus votre score est bas, plus nous recommandons une
                          approche complète.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Témoignages spécifiques au profil */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">
                    Témoignages de personnes avec un profil similaire
                  </h3>
                  <div className="space-y-4">
                    {sleepProfile === "excellent-dormeur" && (
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <p className="text-green-800 italic mb-2">
                          "J'avais déjà un bon sommeil, mais avec BalanceOil+ je
                          me sens encore plus énergique au réveil."
                        </p>
                        <div className="text-sm text-green-600">
                          <strong>Thomas M.</strong> - Excellent dormeur
                        </div>
                      </div>
                    )}
                    {sleepProfile === "sommeil-problematique" && (
                      <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <p className="text-red-800 italic mb-2">
                          "Après des années d'insomnies, le protocole complet
                          Zinzino m'a permis de retrouver un sommeil réparateur
                          en 6 semaines."
                        </p>
                        <div className="text-sm text-red-600">
                          <strong>Claire B.</strong> - Sommeil problématique
                        </div>
                      </div>
                    )}
                    {(sleepProfile === "bon-dormeur" ||
                      sleepProfile === "dormeur-a-ameliorer" ||
                      sleepProfile === "sommeil-moyen") && (
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-blue-800 italic mb-2">
                          "Les produits recommandés par l'IA ont vraiment ciblé
                          mes besoins. Mon sommeil s'est amélioré
                          progressivement."
                        </p>
                        <div className="text-sm text-blue-600">
                          <strong>Marie L.</strong> - Profil similaire
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Garanties et Support */}
              <Card className="shadow-lg bg-green-50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-center">
                    🛡️ Votre Tranquillité d'Esprit
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">📞</div>
                      <div className="font-semibold text-green-800 mb-1">
                        Support Personnel
                      </div>
                      <div className="text-green-600 text-sm">
                        Accompagnement par des experts Zinzino
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">↩️</div>
                      <div className="font-semibold text-green-800 mb-1">
                        Satisfait ou Remboursé
                      </div>
                      <div className="text-green-600 text-sm">
                        Garantie de satisfaction 60 jours
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">🚚</div>
                      <div className="font-semibold text-green-800 mb-1">
                        Livraison Gratuite
                      </div>
                      <div className="text-green-600 text-sm">
                        Dès 50 € d'achat en France
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action Final */}
              <Card className="shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Commencez votre transformation dès aujourd'hui
                  </h3>
                  <p className="text-indigo-100 mb-6">
                    Plus de 10 000 personnes ont déjà amélioré leur sommeil avec
                    nos recommandations personnalisées.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={backToResults}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 px-8"
                    >
                      Revoir mon Analyse
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/contact")}
                      className="bg-white text-purple-800 hover:bg-gray-100 px-8"
                    >
                      Questions ? Contactez-nous
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section - Only show if not in results or products */}
      {step !== totalSteps + 1 && step !== totalSteps + 2 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Questions Fréquentes sur le Quiz IA Avancé
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">
                    En quoi ce quiz est-il différent du quiz standard ?
                  </h3>
                  <p className="text-gray-700">
                    Le quiz IA avancé analyse 15 dimensions de votre sommeil
                    avec un algorithme multidimensionnel. Il détermine votre
                    chronotype scientifique (Horne-Östberg), identifie des
                    troubles spécifiques et génère des recommandations
                    personnalisées selon votre profil unique.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">
                    Qu'est-ce que le chronotype et pourquoi est-ce important ?
                  </h3>
                  <p className="text-gray-700">
                    Votre chronotype détermine vos horaires naturels optimaux
                    pour dormir, manger et être actif. Connaître votre
                    chronotype (lève-tôt, couche-tard, ou neutre) permet
                    d'adapter vos habitudes pour maximiser votre énergie et
                    améliorer votre sommeil.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">
                    Les recommandations sont-elles vraiment personnalisées ?
                  </h3>
                  <p className="text-gray-700">
                    Oui, notre IA analyse votre profil complet (chronotype,
                    troubles, stress, environnement) pour recommander les
                    produits les plus adaptés. Par exemple, si vous avez un
                    stress élevé, l'Omega-3 sera prioritaire. Si vous avez des
                    problèmes inflammatoires, la Phycocyanine sera recommandée.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg mb-2">
                    Que faire si des troubles médicaux sont détectés ?
                  </h3>
                  <p className="text-gray-700">
                    Si le quiz identifie des signes d'apnée du sommeil, de
                    jambes sans repos ou d'autres troubles, nous recommandons
                    fortement de consulter un professionnel de santé. Nos
                    conseils complètent mais ne remplacent jamais un avis
                    médical professionnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );

  function onQuestionSubmit(values) {
    const newAnswers = { ...answers, [`q${step}`]: values.answer };
    setAnswers(newAnswers);

    if (step < totalSteps) {
      setStep(step + 1);
      questionForm.reset({ answer: "" });
    } else {
      calculateAdvancedResults(newAnswers);
    }
  }
}
