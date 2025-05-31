"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast.js";
import { MailIcon, CheckCircleIcon, SparklesIcon } from "lucide-react";

const Newsletter = ({
  title = "Recevez Nos Conseils Sommeil",
  description = "Rejoignez plus de 10 000 personnes qui améliorent leur sommeil grâce à nos conseils hebdomadaires d'experts.",
  placeholder = "Votre adresse email",
  buttonText = "Recevoir les Conseils",
  showIcon = true,
  variant = "default", // "default" | "compact" | "hero"
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("📧 Soumission newsletter...");

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: variant === "hero" ? "hero" : "footer",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEmail("");

        toast({
          title: data.alreadySubscribed
            ? "🎉 Déjà inscrit !"
            : "🎉 Inscription réussie !",
          description: data.message,
        });
      } else {
        throw new Error(data.error || "Erreur d'inscription");
      }
    } catch (error) {
      console.error("❌ Erreur newsletter:", error);

      toast({
        title: "Erreur d'inscription",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container:
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6",
          title: "text-xl font-bold text-gray-900 dark:text-gray-100 mb-3",
          description: "text-gray-600 dark:text-gray-300 mb-4",
          form: "flex gap-2",
        };
      case "hero":
        return {
          container:
            "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white rounded-2xl p-8 md:p-12",
          title: "text-3xl md:text-4xl font-playfair font-bold mb-4",
          description: "text-indigo-100 text-lg mb-6",
          form: "flex flex-col sm:flex-row gap-3 max-w-lg mx-auto",
        };
      default:
        return {
          container:
            "bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-8 md:p-12",
          title:
            "text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4",
          description: "text-lg text-gray-700 dark:text-gray-300 mb-6",
          form: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={styles.container}>
      <div className="text-center max-w-3xl mx-auto">
        {showIcon && variant !== "compact" && (
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
            <MailIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}

        <h2 className={styles.title}>{title}</h2>

        <p className={styles.description}>{description}</p>

        {/* Social Proof */}
        {variant === "default" && (
          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <span>Conseils d'experts</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <span>Désabonnement facile</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`flex-grow ${
              variant === "hero"
                ? "bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
                : ""
            }`}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={
              variant === "hero"
                ? "bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-6"
                : "bg-indigo-600 hover:bg-indigo-700 font-semibold px-6"
            }
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Inscription...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {buttonText}
                <SparklesIcon className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <p
          className={`text-sm mt-4 ${
            variant === "hero"
              ? "text-indigo-200"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          🔒 Vos données sont sécurisées. Aucun spam, promis !
        </p>

        {/* Bonus offer */}
        {variant === "default" && (
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-200/50 dark:border-green-800/50">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              🎁 <strong>Bonus :</strong> Recevez notre guide "7 Secrets pour un
              Sommeil Réparateur" dès votre inscription !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
