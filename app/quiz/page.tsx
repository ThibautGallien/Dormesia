"use client"

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import {
  BedIcon,
  MoonIcon,
  SunIcon,
  CoffeeIcon,
  SettingsIcon,
  PizzaIcon,
} from 'lucide-react';

export default function QuizPage() {
  const [step, setStep] = useState(1);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  
  const questionSchema = z.object({
    answer: z.string({
      required_error: "Veuillez sélectionner une réponse",
    }),
  });
  
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      answer: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof questionSchema>) {
    // Store answer
    setAnswers({ ...answers, [`q${step}`]: values.answer });
    
    // Move to next step or calculate results
    if (step < totalSteps) {
      setStep(step + 1);
      form.reset({
        answer: "",
      });
    } else {
      // Calculate quiz results
      calculateResults({ ...answers, [`q${step}`]: values.answer });
    }
  }
  
  function calculateResults(allAnswers: any) {
    // Simple scoring system
    let score = 0;
    
    // Quality of sleep (q1)
    if (allAnswers.q1 === "très-bien") score += 3;
    else if (allAnswers.q1 === "bien") score += 2;
    else if (allAnswers.q1 === "moyen") score += 1;
    
    // Hours of sleep (q2)
    if (allAnswers.q2 === "7-8") score += 3;
    else if (allAnswers.q2 === "6-7" || allAnswers.q2 === "8-9") score += 2;
    else score += 1;
    
    // Falling asleep time (q3)
    if (allAnswers.q3 === "moins-15") score += 3;
    else if (allAnswers.q3 === "15-30") score += 2;
    else score += 1;
    
    // Morning feeling (q4)
    if (allAnswers.q4 === "éveillé") score += 3;
    else if (allAnswers.q4 === "légèrement-fatigué") score += 2;
    else score += 1;
    
    // Midnight waking (q5)
    if (allAnswers.q5 === "jamais") score += 3;
    else if (allAnswers.q5 === "rarement") score += 2;
    else score += 1;
    
    // Calculate a percentage
    const maxScore = 15;
    const percentage = Math.round((score / maxScore) * 100);
    
    let category;
    let recommendations = [];
    
    if (percentage >= 80) {
      category = "Excellent";
      recommendations = [
        "Continuez vos bonnes habitudes de sommeil",
        "Maintenez votre routine régulière",
        "Limitez la caféine et l'alcool avant le coucher"
      ];
    } else if (percentage >= 60) {
      category = "Bon";
      recommendations = [
        "Établissez une routine de coucher plus stricte",
        "Évitez les écrans une heure avant de dormir",
        "Essayez des techniques de relaxation le soir"
      ];
    } else if (percentage >= 40) {
      category = "Moyen";
      recommendations = [
        "Consultez nos articles sur l'hygiène du sommeil",
        "Essayez la méditation guidée avant de dormir",
        "Vérifiez la qualité de votre matelas et oreiller",
        "Évitez les repas lourds le soir"
      ];
    } else {
      category = "À améliorer";
      recommendations = [
        "Consultez un professionnel de santé",
        "Établissez un horaire de sommeil strict",
        "Créez un environnement propice au sommeil (obscurité, calme, fraîcheur)",
        "Limitez la caféine après midi",
        "Pratiquez des exercices de relaxation quotidiennement"
      ];
    }
    
    setQuizResults({
      score,
      percentage,
      category,
      recommendations
    });
  }
  
  function restartQuiz() {
    setStep(1);
    setAnswers({});
    setQuizResults(null);
    form.reset({
      answer: "",
    });
  }
  
  const questions = [
    {
      id: 1,
      icon: <BedIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      question: "Comment évaluez-vous globalement la qualité de votre sommeil?",
      options: [
        { value: "très-bien", label: "Très bien" },
        { value: "bien", label: "Bien" },
        { value: "moyen", label: "Moyen" },
        { value: "mauvais", label: "Mauvais" },
      ],
    },
    {
      id: 2,
      icon: <MoonIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      question: "Combien d'heures dormez-vous en moyenne par nuit?",
      options: [
        { value: "moins-5", label: "Moins de 5 heures" },
        { value: "5-6", label: "5 à 6 heures" },
        { value: "6-7", label: "6 à 7 heures" },
        { value: "7-8", label: "7 à 8 heures" },
        { value: "8-9", label: "8 à 9 heures" },
        { value: "plus-9", label: "Plus de 9 heures" },
      ],
    },
    {
      id: 3,
      icon: <SettingsIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      question: "Combien de temps mettez-vous habituellement à vous endormir?",
      options: [
        { value: "moins-15", label: "Moins de 15 minutes" },
        { value: "15-30", label: "Entre 15 et 30 minutes" },
        { value: "30-60", label: "Entre 30 minutes et 1 heure" },
        { value: "plus-60", label: "Plus d'une heure" },
      ],
    },
    {
      id: 4,
      icon: <SunIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      question: "Comment vous sentez-vous généralement au réveil?",
      options: [
        { value: "éveillé", label: "Reposé et éveillé" },
        { value: "légèrement-fatigué", label: "Légèrement fatigué" },
        { value: "fatigué", label: "Fatigué" },
        { value: "très-fatigué", label: "Très fatigué et somnolent" },
      ],
    },
    {
      id: 5,
      icon: <CoffeeIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
      question: "Vous réveillez-vous en pleine nuit?",
      options: [
        { value: "jamais", label: "Jamais ou presque" },
        { value: "rarement", label: "Rarement (1-2 fois par semaine)" },
        { value: "souvent", label: "Souvent (3-5 fois par semaine)" },
        { value: "chaque-nuit", label: "Chaque nuit, plusieurs fois" },
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
              Évaluez Votre Sommeil
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Répondez à quelques questions simples pour obtenir une évaluation personnalisée de votre sommeil et des recommandations adaptées.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Quiz Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {!quizResults ? (
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Question {step}/{totalSteps}</span>
                    <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  {currentQuestion.icon}
                  <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
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
                                  className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-900"
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
                        {step === totalSteps ? "Terminer" : "Suivant"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-950 rounded-full mb-4">
                    <BedIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Vos Résultats</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Basé sur vos réponses, voici notre évaluation de votre sommeil
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Qualité du sommeil: {quizResults.category}</span>
                    <span className="font-medium">{quizResults.percentage}%</span>
                  </div>
                  <Progress value={quizResults.percentage} className="h-3" />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Nos recommandations</h3>
                  <ul className="space-y-2">
                    {quizResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={restartQuiz} 
                    variant="outline" 
                    className="flex-1"
                  >
                    Refaire le Quiz
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/articles'} 
                    className="flex-1"
                  >
                    Découvrir Nos Articles
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