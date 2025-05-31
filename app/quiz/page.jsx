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
  SettingsIcon,
  ClockIcon,
  HeartIcon,
  CheckCircleIcon,
  MailIcon,
  ArrowRightIcon,
} from "lucide-react";

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0 = email capture, 1-6 = questions, 7 = results
  const [quizResults, setQuizResults] = useState(null);
  const [answers, setAnswers] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6; // Questions seulement
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

  async function onEmailSubmit(values) {
    setIsSubmitting(true);
    try {
      // Sauvegarder email et nom pour plus tard
      setUserEmail(values.email);

      // Optionnel: Ajouter à la newsletter immédiatement
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            name: values.name,
            source: "quiz",
          }),
        });
        console.log("✅ Email ajouté à la newsletter");
      } catch (error) {
        console.log("⚠️ Erreur newsletter (non bloquant):", error);
      }

      setStep(1); // Commencer les questions

      toast({
        title: "Parfait !",
        description: "Commençons votre évaluation personnalisée.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function onQuestionSubmit(values) {
    // Store answer
    const newAnswers = { ...answers, [`q${step}`]: values.answer };
    setAnswers(newAnswers);

    // Move to next step or calculate results
    if (step < totalSteps) {
      setStep(step + 1);
      questionForm.reset({ answer: "" });
    } else {
      // Calculate quiz results
      calculateResults(newAnswers);
    }
  }

  async function calculateResults(allAnswers) {
    let score = 0;
    let sleepProfile = {};

    // Analyse plus détaillée des réponses
    const quality = allAnswers.q1;
    if (quality === "très-bien") score += 4;
    else if (quality === "bien") score += 3;
    else if (quality === "moyen") score += 2;
    else score += 1;

    const duration = allAnswers.q2;
    sleepProfile.duration = duration;
    if (duration === "7-8" || duration === "8-9") score += 4;
    else if (duration === "6-7" || duration === "9-10") score += 3;
    else if (duration === "5-6") score += 2;
    else score += 1;

    const latency = allAnswers.q3;
    sleepProfile.latency = latency;
    if (latency === "moins-10") score += 4;
    else if (latency === "10-20") score += 3;
    else if (latency === "20-30") score += 2;
    else score += 1;

    const morning = allAnswers.q4;
    sleepProfile.morningFeeling = morning;
    if (morning === "très-reposé") score += 4;
    else if (morning === "reposé") score += 3;
    else if (morning === "légèrement-fatigué") score += 2;
    else score += 1;

    const waking = allAnswers.q5;
    sleepProfile.nightWaking = waking;
    if (waking === "jamais") score += 4;
    else if (waking === "rarement") score += 3;
    else if (waking === "parfois") score += 2;
    else score += 1;

    const impact = allAnswers.q6;
    sleepProfile.dayImpact = impact;
    if (impact === "aucun") score += 4;
    else if (impact === "léger") score += 3;
    else if (impact === "modéré") score += 2;
    else score += 1;

    // Calculate percentage (max 24 points)
    const maxScore = 24;
    const percentage = Math.round((score / maxScore) * 100);

    let category, recommendations, sleepTips, affiliateProducts;

    if (percentage >= 85) {
      category = "Excellent dormeur";
      recommendations = [
        "Votre sommeil est d'excellente qualité ! Continuez vos bonnes habitudes.",
        "Maintenez votre routine de coucher régulière",
        "Optimisez votre environnement de sommeil pour maintenir cette qualité",
      ];
      sleepTips = [
        "Routine du soir: Gardez votre routine efficace",
        "Exercice: Continuez l'activité physique régulière",
        "Nutrition: Maintenez une alimentation équilibrée",
      ];
      affiliateProducts = ["matelas-premium", "oreiller-ergonomique"];
    } else if (percentage >= 70) {
      category = "Bon dormeur";
      recommendations = [
        "Votre sommeil est de bonne qualité avec quelques améliorations possibles",
        "Établissez une routine de coucher plus stricte",
        "Optimisez votre environnement de sommeil (température, obscurité, silence)",
      ];
      sleepTips = [
        "Routine: Créez un rituel de 30 min avant le coucher",
        "Écrans: Évitez les écrans 1h avant de dormir",
        "Relaxation: Essayez la méditation ou la lecture",
      ];
      affiliateProducts = ["masque-sommeil", "diffuseur-huiles"];
    } else if (percentage >= 50) {
      category = "Dormeur à améliorer";
      recommendations = [
        "Votre sommeil peut être significativement amélioré",
        "Créez un environnement de sommeil optimal",
        "Établissez des horaires de coucher et lever fixes",
        "Limitez la caféine après 14h",
      ];
      sleepTips = [
        "Horaires: Couchez-vous et levez-vous à heures fixes",
        "Environnement: Température fraîche (18-20°C), noir complet",
        "Stress: Pratiquez des techniques de relaxation quotidiennes",
      ];
      affiliateProducts = ["complement-melatonine", "bouchons-oreilles"];
    } else {
      category = "Sommeil problématique";
      recommendations = [
        "Votre sommeil nécessite une attention particulière",
        "Consultez un professionnel de santé si les problèmes persistent",
        "Appliquez rigoureusement une hygiène de sommeil",
        "Évitez alcool, caféine et écrans le soir",
      ];
      sleepTips = [
        "Professionnel: Consultez votre médecin ou un spécialiste du sommeil",
        "Hygiène: Appliquez strictement les règles de base",
        "Relaxation: Techniques de gestion du stress et anxiété",
      ];
      affiliateProducts = ["formation-sommeil", "consultation-expert"];
    }

    const results = {
      score,
      percentage,
      category,
      recommendations,
      sleepTips,
      affiliateProducts,
      sleepProfile,
      userEmail,
      name: emailForm.getValues("name"),
      answers: allAnswers,
    };

    setQuizResults(results);
    setStep(7); // Results step

    // 🚀 NOUVEAU: Sauvegarder dans MongoDB + ActiveCampaign
    await sendResultsToDatabase(results);
  }

  async function sendResultsToDatabase(results) {
    try {
      console.log("💾 Sauvegarde des résultats...");

      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ Résultats sauvegardés:", data.data);

        toast({
          title: "✅ Résultats sauvegardés !",
          description:
            "Vos résultats ont été envoyés par email et sauvegardés.",
        });
      } else {
        throw new Error(data.error || "Erreur de sauvegarde");
      }
    } catch (error) {
      console.error("❌ Erreur sauvegarde:", error);

      toast({
        title: "⚠️ Attention",
        description:
          "Vos résultats sont affichés mais la sauvegarde a échoué. Contactez-nous si besoin.",
        variant: "destructive",
      });
    }
  }

  function restartQuiz() {
    setStep(0);
    setAnswers({});
    setQuizResults(null);
    setUserEmail("");
    emailForm.reset();
    questionForm.reset();
  }

  const questions = [
    {
      id: 1,
      icon: (
        <BedIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question:
        "Comment évaluez-vous globalement la qualité de votre sommeil ?",
      options: [
        {
          value: "très-bien",
          label: "Très bien - Je me sens toujours reposé(e)",
        },
        { value: "bien", label: "Bien - Généralement satisfaisant" },
        { value: "moyen", label: "Moyen - Parfois bon, parfois moins" },
        { value: "mauvais", label: "Mauvais - Souvent insatisfaisant" },
      ],
    },
    {
      id: 2,
      icon: (
        <ClockIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question: "Combien d'heures dormez-vous en moyenne par nuit ?",
      options: [
        { value: "moins-5", label: "Moins de 5 heures" },
        { value: "5-6", label: "5 à 6 heures" },
        { value: "6-7", label: "6 à 7 heures" },
        { value: "7-8", label: "7 à 8 heures" },
        { value: "8-9", label: "8 à 9 heures" },
        { value: "9-10", label: "9 à 10 heures" },
        { value: "plus-10", label: "Plus de 10 heures" },
      ],
    },
    {
      id: 3,
      icon: (
        <MoonIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question: "Combien de temps mettez-vous à vous endormir ?",
      options: [
        { value: "moins-10", label: "Moins de 10 minutes" },
        { value: "10-20", label: "10 à 20 minutes" },
        { value: "20-30", label: "20 à 30 minutes" },
        { value: "30-60", label: "30 minutes à 1 heure" },
        { value: "plus-60", label: "Plus d'une heure" },
      ],
    },
    {
      id: 4,
      icon: (
        <SunIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question: "Comment vous sentez-vous au réveil ?",
      options: [
        { value: "très-reposé", label: "Très reposé(e) et énergique" },
        { value: "reposé", label: "Reposé(e) et en forme" },
        { value: "légèrement-fatigué", label: "Légèrement fatigué(e)" },
        { value: "fatigué", label: "Fatigué(e) et lourd(e)" },
        { value: "épuisé", label: "Épuisé(e) et difficile à démarrer" },
      ],
    },
    {
      id: 5,
      icon: (
        <SettingsIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question: "À quelle fréquence vous réveillez-vous la nuit ?",
      options: [
        { value: "jamais", label: "Jamais ou très rarement" },
        { value: "rarement", label: "1-2 fois par semaine" },
        { value: "parfois", label: "3-4 fois par semaine" },
        { value: "souvent", label: "5-6 fois par semaine" },
        { value: "chaque-nuit", label: "Chaque nuit, plusieurs fois" },
      ],
    },
    {
      id: 6,
      icon: (
        <CoffeeIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      ),
      question: "Votre sommeil affecte-t-il votre journée ?",
      options: [
        { value: "aucun", label: "Aucun impact négatif" },
        { value: "léger", label: "Impact léger occasionnel" },
        { value: "modéré", label: "Impact modéré régulier" },
        { value: "important", label: "Impact important sur ma productivité" },
        {
          value: "très-important",
          label: "Impact majeur sur ma vie quotidienne",
        },
      ],
    },
  ];

  const currentQuestion = questions[step - 1];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/18111515/pexels-photo-18111515/free-photo-of-des-plantes-nuages-temps-paysage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Quiz Sommeil Gratuit
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Évaluez votre sommeil en 2 minutes et recevez vos recommandations
              personnalisées par email
            </p>
            <div className="flex items-center justify-center gap-6 text-indigo-200">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>Résultats instantanés</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quiz Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Email Capture Step */}
          {step === 0 && (
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-950 rounded-full mb-4">
                    <MailIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Commencez votre évaluation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Pour recevoir vos résultats personnalisés et nos meilleurs
                    conseils sommeil
                  </p>
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
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre prénom" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="votre@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Chargement..." : "Commencer le Quiz"}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-xs text-center text-gray-500">
                      Vos données sont sécurisées. Nous ne partageons jamais
                      votre email.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Questions Steps */}
          {step >= 1 && step <= totalSteps && (
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Question {step}/{totalSteps}
                    </span>
                    <span className="text-sm text-gray-500">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  {currentQuestion.icon}
                  <h2 className="text-xl font-bold">
                    {currentQuestion.question}
                  </h2>
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
                                  className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-indigo-300"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                  />
                                  <FormLabel
                                    htmlFor={option.value}
                                    className="flex-1 cursor-pointer font-normal"
                                  >
                                    {option.label}
                                  </FormLabel>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                      >
                        Précédent
                      </Button>
                      <Button type="submit">
                        {step === totalSteps ? "Voir mes résultats" : "Suivant"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Results Step */}
          {step === 7 && quizResults && (
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-950 rounded-full mb-4">
                    <HeartIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    Vos Résultats Personnalisés
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyse complète de votre sommeil et recommandations sur
                    mesure
                  </p>
                </div>

                <div className="mb-8">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {quizResults.category}
                    </h3>
                    <p className="text-3xl font-bold">
                      {quizResults.percentage}%
                    </p>
                  </div>
                  <Progress value={quizResults.percentage} className="h-4" />
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                      Vos recommandations prioritaires
                    </h4>
                    <ul className="space-y-2">
                      {quizResults.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {rec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <SettingsIcon className="h-5 w-5 text-indigo-600 mr-2" />
                      Plan d'action personnalisé
                    </h4>
                    <ul className="space-y-2">
                      {quizResults.sleepTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                  <p className="text-sm text-center text-indigo-700 dark:text-indigo-300 mb-4">
                    📧 Vos résultats détaillés et un guide d'action personnalisé
                    ont été envoyés à <strong>{quizResults.userEmail}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    onClick={restartQuiz}
                    variant="outline"
                    className="flex-1"
                  >
                    Refaire le Quiz
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/articles")}
                    className="flex-1"
                  >
                    Découvrir Nos Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
