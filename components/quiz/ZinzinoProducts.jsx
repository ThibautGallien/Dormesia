// components/quiz/ZinzinoProducts.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, ShoppingCart, Heart } from "lucide-react";

// Base de données des produits Zinzino
const ZINZINO_PRODUCTS = {
  omega3: {
    id: "omega3",
    name: "BalanceOil+ (Orange/Citron/Menthe)",
    shortName: "BalanceOil+",
    description:
      "Complément alimentaire qui augmente en toute sécurité et ajuste les niveaux d'Oméga-3 dans votre corps.",
    image:
      "https://zinzino.b-cdn.net/globalassets/zinzino-images/products/balanceoil/balanceoil-plus-300ml-web_1000x1000.png",
    price: "42,00",
    currency: "€",
    originalPrice: "52,00",
    discount: "19%",
    commission: "€12-18",
    url: "https://www.zinzino.com/shop/2016309984/FR/fr-FR/products/shop/omega-supplements/300000/",
    benefits: [
      "Équilibre naturel Oméga-6:3",
      "Soutient la fonction cardiaque",
      "Maintient la fonction cérébrale",
      "Favorise un bon sommeil",
    ],
    rating: 4.8,
    reviews: 2847,
    category: "omega",
  },
  restore: {
    id: "restore",
    name: "Restore²",
    shortName: "Restore²",
    description:
      "Mélange de 21 micronutriments naturels soigneusement sélectionnés pour soutenir la fonction immunitaire.",
    image:
      "https://zinzino.b-cdn.net/globalassets/zinzino-images/products/restore/restore_60caps_1000x1000.png",
    price: "54,00",
    currency: "€",
    originalPrice: "65,00",
    discount: "17%",
    commission: "€16-25",
    url: "https://www.zinzino.com/shop/2016309984/FR/fr-FR/products/shop/restore-supplements/300800/",
    benefits: [
      "21 micronutriments essentiels",
      "Soutient l'immunité naturelle",
      "Favorise la récupération",
      "Optimise le métabolisme énergétique",
    ],
    rating: 4.7,
    reviews: 1923,
    category: "immunity",
  },
  xtend: {
    id: "xtend",
    name: "Xtend",
    shortName: "Xtend",
    description:
      "Complément alimentaire innovant qui soutient le renouvellement cellulaire et la longévité.",
    image:
      "https://zinzino.b-cdn.net/globalassets/zinzino-images/products/xtend/xtend_60caps_1000x1000.png",
    price: "89,00",
    currency: "€",
    originalPrice: "105,00",
    discount: "15%",
    commission: "€26-40",
    url: "https://www.zinzino.com/shop/2016309984/FR/fr-FR/products/brand-shop/xelliss-products/302771/",
    benefits: [
      "Soutient la longévité cellulaire",
      "Antioxydants puissants",
      "Favorise l'énergie vitale",
      "Protection contre le stress oxydatif",
    ],
    rating: 4.9,
    reviews: 856,
    category: "longevity",
  },
  protect: {
    id: "protect",
    name: "Protect",
    shortName: "Protect",
    description:
      "Formule avancée de polyphénols pour une protection antioxydante optimale.",
    image:
      "https://zinzino.b-cdn.net/globalassets/zinzino-images/products/protect/protect_60caps_1000x1000.png",
    price: "67,00",
    currency: "€",
    originalPrice: "78,00",
    discount: "14%",
    commission: "€20-30",
    url: "https://www.zinzino.com/shop/2016309984/FR/fr-FR/products/brand-shop/xelliss-products/302780/",
    benefits: [
      "Polyphénols hautement concentrés",
      "Protection cellulaire avancée",
      "Soutient la santé cardiovasculaire",
      "Anti-âge naturel",
    ],
    rating: 4.6,
    reviews: 1247,
    category: "protection",
  },
  complete: {
    id: "complete",
    name: "Complete",
    shortName: "Complete",
    description:
      "Shake nutritionnel complet avec protéines végétales et fibres pour un bien-être optimal.",
    image:
      "https://zinzino.b-cdn.net/globalassets/zinzino-images/products/complete/complete_vanilla_1000x1000.png",
    price: "78,00",
    currency: "€",
    originalPrice: "92,00",
    discount: "15%",
    commission: "€23-35",
    url: "https://www.zinzino.com/shop/2016309984/FR/fr-FR/products/brand-shop/xelliss-products/302790/",
    benefits: [
      "Protéines végétales complètes",
      "Fibres prébiotiques",
      "Vitamines et minéraux",
      "Soutient la gestion du poids",
    ],
    rating: 4.5,
    reviews: 1834,
    category: "nutrition",
  },
};

// Recommandations par profil de sommeil
const PROFILE_RECOMMENDATIONS = {
  "excellent-dormeur": {
    primary: ["omega3"],
    secondary: ["protect"],
    message:
      "Maintenez votre excellent équilibre avec ces compléments de qualité supérieure.",
  },
  "bon-dormeur": {
    primary: ["omega3", "restore"],
    secondary: ["protect"],
    message:
      "Optimisez votre récupération et soutenez votre immunité naturelle.",
  },
  "dormeur-a-ameliorer": {
    primary: ["omega3", "restore"],
    secondary: ["xtend", "complete"],
    message: "Rééquilibrez votre organisme pour un sommeil plus réparateur.",
  },
  "sommeil-moyen": {
    primary: ["restore", "omega3"],
    secondary: ["protect", "complete"],
    message:
      "Soutenez votre organisme avec une approche nutritionnelle complète.",
  },
  "sommeil-problematique": {
    primary: ["restore", "omega3", "xtend"],
    secondary: ["protect", "complete"],
    message:
      "Pack complet pour une récupération en profondeur et un sommeil réparateur.",
    urgent: true,
  },
};

const ProductCard = ({ product, isPrimary = false, isUrgent = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isPrimary
          ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/30"
          : ""
      } ${isUrgent ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-950/30" : ""}`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount && (
          <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold">
            -{product.discount}
          </Badge>
        )}
        {isPrimary && (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Recommandé
          </Badge>
        )}
        {isUrgent && (
          <Badge className="bg-red-600 hover:bg-red-700 text-white animate-pulse">
            Urgent
          </Badge>
        )}
      </div>

      {/* Bouton favori */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        <Heart
          className={`h-4 w-4 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </button>

      <CardHeader className="pb-4">
        {/* Image produit */}
        <div className="relative h-48 mb-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Note et avis */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating} ({product.reviews} avis)
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Bénéfices */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Bénéfices clés :
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {product.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Prix */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {product.price}
              {product.currency}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
                {product.currency}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Commission affilié : {product.commission}
          </p>
        </div>

        {/* Bouton d'achat */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold"
        >
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Commander maintenant
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>

        {/* Info partenaire */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          ✓ Produit Zinzino • ✓ Partenaire officiel
        </p>
      </CardContent>
    </Card>
  );
};

export default function ZinzinoProducts({
  sleepProfile = "bon-dormeur",
  className = "",
}) {
  const recommendations =
    PROFILE_RECOMMENDATIONS[sleepProfile] ||
    PROFILE_RECOMMENDATIONS["bon-dormeur"];
  const isUrgent = recommendations.urgent || false;

  const primaryProducts = recommendations.primary
    .map((id) => ZINZINO_PRODUCTS[id])
    .filter(Boolean);
  const secondaryProducts = recommendations.secondary
    .map((id) => ZINZINO_PRODUCTS[id])
    .filter(Boolean);

  return (
    <section
      className={`py-12 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/30 dark:via-gray-900 dark:to-green-950/30 ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Produits Zinzino Recommandés
          </div>

          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">
            Solutions Naturelles Personnalisées
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            {recommendations.message}
          </p>

          {isUrgent && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg mx-auto">
              <p className="text-red-800 font-medium text-sm">
                ⚠️ Votre profil nécessite une attention immédiate. Ces produits
                peuvent vous aider à retrouver un sommeil réparateur rapidement.
              </p>
            </div>
          )}
        </div>

        {/* Produits principaux */}
        {primaryProducts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              🎯 Recommandations Prioritaires
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {primaryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isPrimary={true}
                  isUrgent={isUrgent}
                />
              ))}
            </div>
          </div>
        )}

        {/* Produits secondaires */}
        {secondaryProducts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              💡 Compléments Recommandés
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isPrimary={false}
                  isUrgent={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-950/50 dark:to-green-950/50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              🌿 Pourquoi choisir Zinzino ?
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Ingrédients 100% naturels
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Tests scientifiques rigoureux
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Marque leader européenne
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
