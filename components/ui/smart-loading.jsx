// components/ui/smart-loading.jsx - Composant de chargement intelligent
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircleIcon,
  SparklesIcon,
  BrainIcon,
  MailIcon,
} from "lucide-react";

export function SmartLoadingScreen({
  isVisible,
  onComplete,
  userName = "Utilisateur",
  estimatedTime = 8000, // 8 secondes max
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Initialisation",
      description: `Bonjour ${userName} ! Préparation de votre analyse...`,
      icon: <SparklesIcon className="h-6 w-6" />,
      duration: 1000,
    },
    {
      id: 1,
      title: "Création du profil",
      description: "Configuration de votre profil de sommeil personnalisé",
      icon: <BrainIcon className="h-6 w-6" />,
      duration: 2000,
    },
    {
      id: 2,
      title: "Synchronisation",
      description: "Sauvegarde sécurisée de vos informations",
      icon: <MailIcon className="h-6 w-6" />,
      duration: 3000,
    },
    {
      id: 3,
      title: "Finalisation",
      description: "Votre analyse est prête !",
      icon: <CheckCircleIcon className="h-6 w-6" />,
      duration: 1000,
    },
  ];

  useEffect(() => {
    if (!isVisible) return;

    let timeouts = [];
    let progressInterval;
    let totalElapsed = 0;

    // Animation de progression fluide
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1.5, 100);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
        }
        return newProgress;
      });
    }, estimatedTime / 100);

    // Animation des étapes
    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, totalElapsed);

      timeouts.push(timeout);
      totalElapsed += step.duration;
    });

    // Nettoyage
    return () => {
      timeouts.forEach(clearTimeout);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible, onComplete, estimatedTime]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-indigo-200">
        <CardContent className="p-8">
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analyse IA en cours
            </h2>
            <p className="text-gray-600">
              Nous créons votre profil de sommeil personnalisé
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-3 bg-gray-100" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>{Math.round(progress)}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Étapes */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                  index === currentStep
                    ? "bg-indigo-50 border border-indigo-200"
                    : index < currentStep
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <div
                  className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                    index === currentStep
                      ? "bg-indigo-500 text-white animate-pulse"
                      : index < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircleIcon className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4">{step.icon}</div>
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className={`font-medium text-sm ${
                      index <= currentStep ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-xs ${
                      index === currentStep
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.description}
                  </div>
                </div>

                {index === currentStep && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message rassurant */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              <span className="font-medium">💡 Le saviez-vous ?</span>
              <br />
              Nous analysons plus de 15 paramètres pour créer votre profil
              unique !
            </p>
          </div>

          {/* Estimation temps */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Temps estimé : quelques secondes • 🔒 Données sécurisées
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook pour utiliser le loading intelligent
export function useSmartLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    SmartLoadingScreen: (props) => (
      <SmartLoadingScreen
        isVisible={isLoading}
        onComplete={stopLoading}
        {...props}
      />
    ),
  };
}
