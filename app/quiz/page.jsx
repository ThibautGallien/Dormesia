// app/quiz-avance/page.jsx
import AdvancedSleepQuiz from "@/components/quiz/AdvancedSleepQuiz";

export const metadata = {
  title: "Quiz IA Avancé - Analyse Complète du Sommeil | Dormesia",
  description:
    "Découvrez votre profil de sommeil complet avec notre quiz IA avancé de 15 questions. Chronotype scientifique, troubles spécifiques et recommandations Zinzino personnalisées.",
  keywords:
    "quiz sommeil avancé, chronotype, analyse IA, troubles sommeil, Horne-Östberg, profil sommeil",
  openGraph: {
    title: "Quiz IA Avancé - Analyse Complète du Sommeil",
    description:
      "15 questions scientifiques pour une analyse multidimensionnelle de votre sommeil et des recommandations personnalisées.",
    type: "website",
    images: [
      {
        url: "/images/quiz-advanced-og.jpg",
        width: 1200,
        height: 630,
        alt: "Quiz IA Avancé Dormesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz IA Avancé - Analyse Complète du Sommeil",
    description:
      "Découvrez votre chronotype et obtenez des recommandations personnalisées.",
    images: ["/images/quiz-advanced-twitter.jpg"],
  },
};

export default function QuizAvancePage() {
  return <AdvancedSleepQuiz />;
}
