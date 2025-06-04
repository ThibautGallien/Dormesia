# 🌙 Dormesia - Expert du Sommeil

**Application Next.js 14 moderne dédiée à l'amélioration de la qualité du sommeil avec CMS intégré et SEO optimisé.**

![Dormesia Preview](https://images.pexels.com/photos/6087674/pexels-photo-6087674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=400&dpr=2)

## 🚀 Fonctionnalités

### 🎯 **Site Principal**

- ✅ **Quiz personnalisé** pour évaluer la qualité du sommeil
- ✅ **Recommandations IA** basées sur les réponses
- ✅ **Interface moderne** avec animations fluides
- ✅ **Responsive design** optimisé mobile/desktop
- ✅ **Newsletter** avec intégration email

### 📝 **Blog & CMS**

- ✅ **CMS headless** multi-sites centralisé
- ✅ **Articles dynamiques** avec rendu Markdown
- ✅ **Interface d'administration** complète
- ✅ **Publication quotidienne** workflow optimisé
- ✅ **Gestion des médias** intégrée

### 🔍 **SEO Avancé**

- ✅ **Métadonnées dynamiques** par page
- ✅ **Schema.org structuré** (Article, FAQ, etc.)
- ✅ **Sitemap automatique** avec articles
- ✅ **Open Graph** et Twitter Cards
- ✅ **Optimisation Core Web Vitals**

### ⚡ **Performance**

- ✅ **Next.js 14** avec App Router
- ✅ **Génération statique** (SSG)
- ✅ **Images optimisées** (next/image)
- ✅ **Bundle analyzer** intégré
- ✅ **Lazy loading** des composants

## 🏗️ Architecture

```
dormesia/
├── app/                          # App Router (Next.js 14)
│   ├── (routes)/
│   │   ├── quiz/                 # Quiz personnalisé
│   │   ├── articles/             # Blog dynamique
│   │   │   ├── page.jsx          # Liste des articles
│   │   │   └── [slug]/page.jsx   # Article individuel
│   │   └── admin/                # Redirection CMS
│   ├── api/
│   │   ├── quiz/                 # API Quiz + recommandations
│   │   └── cms/sync/             # Synchronisation CMS
│   ├── globals.css               # Styles globaux
│   ├── layout.jsx                # Layout principal
│   ├── page.jsx                  # Page d'accueil
│   └── sitemap.js                # Sitemap dynamique
├── components/
│   ├── ui/                       # Composants réutilisables
│   ├── quiz/                     # Composants Quiz
│   ├── blog/                     # Composants Blog
│   └── seo/                      # Composants SEO
├── lib/
│   ├── cms.js                    # Gestion contenu CMS
│   ├── seo.js                    # Utilitaires SEO
│   └── quiz-logic.js             # Logique Quiz
├── content/
│   └── articles/                 # Articles Markdown
└── public/
    ├── images/                   # Images statiques
    └── robots.txt                # Configuration SEO
```

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS + shadcn/ui
- **CMS** : Headless custom (GitHub + Markdown)
- **SEO** : Métadonnées dynamiques + Schema.org
- **Déploiement** : Vercel (auto-deploy)
- **Version Control** : Git + GitHub

## 📦 Installation

### 1. **Clone du projet**

```bash
git clone https://github.com/ThibautGallien/Dormesia.git
cd Dormesia
```

### 2. **Installation des dépendances**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. **Configuration environnement**

```bash
cp .env.example .env.local
```

Configurer les variables :

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dormesia.vercel.app
NEXT_PUBLIC_SITE_NAME=Dormesia

# CMS Configuration (optionnel)
GITHUB_TOKEN=your_github_token
CMS_ADMIN_URL=https://lesprosdecherbourg-admin.vercel.app

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. **Démarrage développement**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Gestion de Contenu (CMS)

### **Architecture Monosite**

Dormesia utilise un CMS centralisé qui gère plusieurs sites :

- **Administration** : Interface centralisée
- **Publication** : Push automatique vers GitHub
- **Déploiement** : Redéploiement Vercel automatique

### **Workflow de Publication Quotidien**

1. **Accès Admin** : [/admin](/admin) → Redirection vers CMS
2. **Sélection site** : Choisir "Dormesia" dans l'interface
3. **Création article** : Interface WYSIWYG complète
4. **Optimisation SEO** : Métadonnées automatiques
5. **Publication** : Push vers GitHub → Déploiement auto

### **Structure des Articles**

```yaml
---
title: "Titre de l'article"
slug: "url-optimisee"
excerpt: "Description SEO (160 caractères max)"
category: "science-sommeil" # ou bien-etre, conseils-pratiques, etc.
image: "https://example.com/image.jpg"
imageAlt: "Description image pour accessibilité"
author:
  name: "Dr. Expert"
  avatar: "https://example.com/avatar.jpg"
publishedAt: "2024-12-01T10:00:00.000Z"
tags: ["sommeil", "science", "conseils"]
readingTime: 5
featured: true
draft: false
# SEO
seoTitle: "Titre optimisé SEO (60 chars max)"
seoDescription: "Meta description (160 chars max)"
seoKeywords: ["mot-clé 1", "mot-clé 2"]
---
Contenu de l'article en Markdown...
```

## 🔍 SEO & Performance

### **Métadonnées Dynamiques**

- ✅ Title tags optimisés par page
- ✅ Meta descriptions uniques
- ✅ Open Graph pour réseaux sociaux
- ✅ Twitter Cards automatiques
- ✅ Canonical URLs

### **Schema.org Structuré**

```javascript
// Exemples de schemas générés automatiquement
- Article (Blog posts)
- WebSite (Page d'accueil)
- FAQPage (Quiz)
- BreadcrumbList (Navigation)
- Organization (À propos)
```

### **Optimisations Core Web Vitals**

- ✅ **LCP** : Images optimisées next/image
- ✅ **FID** : Lazy loading composants
- ✅ **CLS** : Dimensions images définies
- ✅ **TTFB** : SSG + CDN Vercel

### **Sitemap Dynamique**

Le sitemap est généré automatiquement à `/sitemap.xml` incluant :

- Pages statiques (accueil, quiz, etc.)
- Articles dynamiques du CMS
- Métadonnées de fréquence de mise à jour

## 🎨 Personnalisation

### **Thème & Design**

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: "#4f46e5", // Indigo
      secondary: "#6366f1",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      playfair: ["Playfair Display", "serif"],
    }
  }
}
```

### **Configuration Site**

```javascript
// lib/config.js
export const siteConfig = {
  name: "Dormesia",
  description: "Expert du sommeil et solutions personnalisées",
  url: "https://dormesia.vercel.app",
  creator: "@dormesia",
  // ...
};
```

## 🚀 Déploiement

### **Vercel (Recommandé)**

1. **Connect GitHub** repository
2. **Configure environment** variables
3. **Deploy** automatically on push

```bash
# Variables d'environnement Vercel
NEXT_PUBLIC_SITE_URL=https://dormesia.vercel.app
GITHUB_TOKEN=your_token_here
```

### **Build Local**

```bash
npm run build
npm run start
```

### **Analyse Bundle**

```bash
npm run analyze
```

## 📊 Analytics & Monitoring

### **Métriques Importantes**

- **Performance** : Core Web Vitals
- **SEO** : Positions Google, CTR
- **Engagement** : Temps sur page, taux rebond
- **Conversions** : Inscriptions newsletter, quiz complétés

### **Outils Recommandés**

- **Google Analytics 4** : Trafic et comportement
- **Google Search Console** : Performance SEO
- **Vercel Analytics** : Core Web Vitals
- **Hotjar** : Heatmaps utilisateur

## 🧪 Tests

### **Tests de Performance**

```bash
# Lighthouse
npm run lighthouse

# Bundle analyzer
npm run analyze

# Performance testing
npm run test:perf
```

### **Tests SEO**

- ✅ Métadonnées toutes pages
- ✅ Schema.org validation
- ✅ Sitemap.xml généré
- ✅ Robots.txt configuré
- ✅ Core Web Vitals

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # ESLint
npm run analyze      # Analyse bundle
npm run lighthouse   # Tests performance
```

## 📚 Documentation API

### **Quiz API**

```javascript
POST /api/quiz/submit
{
  "answers": [1, 2, 3, ...],
  "email": "user@example.com"
}

Response:
{
  "recommendations": [...],
  "score": 75,
  "profile": "bon-dormeur"
}
```

### **CMS Sync API**

```javascript
POST /api/cms/sync
{
  "action": "create|update|delete",
  "file": "article-slug.md",
  "content": "markdown content"
}
```

## 🤝 Contribution

### **Workflow de Développement**

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** Pull Request

### **Guidelines**

- ✅ Code formaté avec Prettier
- ✅ Tests passants
- ✅ Documentation mise à jour
- ✅ SEO maintenu/amélioré

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙋‍♂️ Support

- **Documentation** : [Wiki GitHub](https://github.com/ThibautGallien/Dormesia/wiki)
- **Issues** : [GitHub Issues](https://github.com/ThibautGallien/Dormesia/issues)
- **Discussions** : [GitHub Discussions](https://github.com/ThibautGallien/Dormesia/discussions)

## 🗺️ Roadmap

### **Version 1.1** (Prochaine)

- [ ] **IA Recommandations** avancées
- [ ] **Progressive Web App** (PWA)
- [ ] **Mode sombre** complet
- [ ] **Notifications push** blog

### **Version 1.2** (Futur)

- [ ] **Compte utilisateur** personnalisé
- [ ] **Tracking sommeil** intégré
- [ ] **API publique** pour développeurs
- [ ] **App mobile** React Native

---

# 🌙 Dormesia - Expert du Sommeil & Plateforme d'Affiliation

**Application Next.js 14 moderne dédiée à l'amélioration de la qualité du sommeil avec CMS intégré, quiz IA personnalisé et espace membre pour recommandations affiliées.**

![Dormesia Preview](https://images.pexels.com/photos/6087674/pexels-photo-6087674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=400&dpr=2)

## 🎯 Vue d'Ensemble Business

**Objectif** : Convertir les visiteurs en leads qualifiés et générer des revenus via l'affiliation produits sommeil.

**Proposition de valeur** : Quiz gratuit personnalisé → Espace membre privé → Recommandations produits affiliés personnalisées

**Modèle économique actuel** :

- 🎯 **Capture de leads** via quiz personnalisé
- 💰 **Revenus affiliés** sur produits sommeil (matelas, oreillers, compléments, accessoires)
- 📱 **Espace membre** avec suivi personnalisé et recommandations
- 📧 **Email marketing** automatisé avec ActiveCampaign

**Évolution future** : Formations premium et consultations expertes

## 🚀 Fonctionnalités Business

### 🎯 **Quiz IA Avancé & Personnalisé**

- ✅ **Questions approfondies** : 12-15 questions vs 6 actuelles
- ✅ **Chronotype scientifique** : Questionnaire Horne-Östberg (lève-tôt/couche-tard)
- ✅ **Troubles spécifiques** : Apnée, jambes sans repos, ronflement, terreurs nocturnes
- ✅ **Environnement détaillé** : Bruit, lumière, température, qualité matelas/oreiller
- ✅ **Habitudes de vie** : Alimentation, exercice, écrans, caféine, alcool
- ✅ **Stress & mental** : Anxiété, ruminations, charge mentale, techniques relaxation
- ✅ **Médicaments & suppléments** : Actuels, passés, sensibilités, préférences naturel
- ✅ **Flow optimisé** : Questions → Résultats → Email pour plan personnalisé

### 🤖 **Recommandations IA Personnalisées**

- ✅ **Algorithme intelligent** : Analyse croisée des 15 critères pour recommandations précises
- ✅ **Profils multidimensionnels** : Au-delà de "bon/mauvais", analyse:
  - Chronotype (lève-tôt, neutre, couche-tard)
  - Stress level (faible, modéré, élevé)
  - Troubles dominants (endormissement, réveils, qualité)
  - Sensibilités (bruit, lumière, température)
- ✅ **Plan d'action 30 jours** : Programme progressif adapté au profil
- ✅ **Suivi des progrès** : Dashboard avec graphiques d'évolution
- ✅ **Rappels intelligents** : Emails timing selon chronotype (couche-tard = emails 20h)

- ✅ **Produits Zinzino selon profil** :
  - 🟢 **Spiruline** : Énergie matinale pour tous profils (€25-45 commission)
  - 🔵 **Phycocyanine** : Anti-inflammatoire pour sommeil problématique (€35-60 commission)
  - 🟡 **Omega-3** : Équilibre nerveux pour stress/anxiété (€20-40 commission)
  - 🟠 **Pack Sommeil** : Combinaisons selon besoins spécifiques (€80-150 commission)

### 🛏️ **Autres Affiliations** (30% des revenus)

- ✅ **Apps méditation** : Calm, Headspace selon profil stress
- ✅ **Matelas/oreillers** : Emma, Casper pour problèmes physiques
- ✅ **Accessoires** : Masques, bouchons oreilles, diffuseurs
- ✅ **Thés/tisanes** : Produits naturels relaxation

### 📊 **Analytics & Tracking Avancé**

- ✅ **ActiveCampaign intégré** : Auto-tagging et segmentation
- ✅ **MongoDB tracking** : Résultats quiz, comportements utilisateurs
- ✅ **Google Analytics 4** avec events personnalisés
- ✅ **Conversion tracking** : Quiz → Email → Newsletter → Vente
- ✅ **A/B testing** sur quiz, landing pages et emails

### 📝 **CMS & SEO Optimisé**

- ✅ **CMS headless** multi-sites centralisé
- ✅ **Articles dynamiques** avec rendu Markdown optimisé SEO
- ✅ **Schema.org structuré** (Article, FAQ, Organization)
- ✅ **Sitemap automatique** avec articles et pages
- ✅ **Meta descriptions** dynamiques par page
- ✅ **Core Web Vitals** optimisé pour le ranking Google

### 💰 **Système de Monétisation**

- ✅ **Affiliations intégrées** : Matelas, oreillers, compléments
- ✅ **Recommandations produits** basées sur profil de sommeil
- ✅ **Formation premium** : Cours vidéo sommeil réparateur
- ✅ **Consultations expertes** : Booking intégré
- ✅ **Programmes VIP** : Suivi personnalisé 90 jours

## 🏗️ Architecture Technique

```
dormesia/
├── app/                          # App Router (Next.js 14)
│   ├── (routes)/
│   │   ├── quiz/                 # Quiz (questions → email → résultats)
│   │   ├── auth/                 # Système authentification complet
│   │   │   ├── login/            # Connexion membre
│   │   │   ├── register/         # Création compte (post-quiz)
│   │   │   ├── forgot-password/  # Récupération mot de passe
│   │   │   └── reset-password/   # Nouveau mot de passe
│   │   ├── dashboard/            # Espace membre privé
│   │   │   ├── page.jsx          # Vue d'ensemble profil
│   │   │   ├── recommandations/  # Produits Zinzino + autres
│   │   │   ├── suivi/            # Tracking amélioration
│   │   │   ├── profil/           # Paramètres utilisateur
│   │   │   └── zinzino/          # Section dédiée produits Zinzino
│   │   ├── articles/             # Blog SEO optimisé
│   │   └── legal/                # Pages légales RGPD
│   │       ├── mentions/         # Mentions légales
│   │       ├── confidentialite/  # Politique confidentialité
│   │       └── cookies/          # Politique cookies
│   ├── api/
│   │   ├── quiz-results/         # Sauvegarde + ActiveCampaign sync
│   │   ├── user/                 # Gestion profils membres
│   │   ├── recommendations/      # Algorithme produits affiliés
│   │   ├── tracking/             # Analytics clics et conversions
│   │   └── cms/                  # Gestion contenu
│   ├── sitemap.js                # SEO dynamique
│   └── robots.txt                # Optimisation crawling
├── components/
│   ├── quiz/                     # Système quiz optimisé
│   ├── dashboard/                # Interface espace membre
│   ├── recommendations/          # Système produits affiliés
│   ├── tracking/                 # Composants analytics
│   └── auth/                     # Authentification membres
├── lib/
│   ├── activecampaign.js         # API automation marketing
│   ├── mongodb.js                # Base de données utilisateurs
│   ├── auth.js                   # Authentification complète
│   ├── password-reset.js         # Système récupération MDP
│   ├── zinzino-affiliate.js      # Tracking spécial Zinzino
│   ├── affiliate-tracking.js     # Autres affiliés
│   ├── recommendations-ai.js     # Algorithme suggestions
│   └── email-automation.js       # Templates emails automatiques
└── content/
    ├── articles/                 # Articles SEO
    ├── formations/               # Contenu premium
    └── legal/                    # Pages légales RGPD
```

## 🚀 Plan de Développement Espace Membre

### **Phase 1 : Authentification Complète (Semaine 1-2)**

#### Système Auth Complet

```javascript
// lib/auth.js - Authentification complète
- Inscription automatique post-quiz (email + mot de passe généré)
- Login membre avec email/mot de passe
- Mot de passe oublié avec email sécurisé
- Réinitialisation mot de passe avec token
- Session persistante avec JWT sécurisé
- Middleware protection routes privées
```

#### Algorithme IA Recommandations

```javascript
// lib/recommendations-ai.js - Analyse multidimensionnelle
const analyzeProfile = (quizAnswers) => {
  const profile = {
    chronotype: calculateChronotype(
      answers.circadian_preference,
      answers.energy_peaks
    ),
    sleep_quality: calculateSleepScore(
      answers.latency,
      answers.waking,
      answers.morning_feel
    ),
    stress_level: calculateStress(
      answers.anxiety,
      answers.rumination,
      answers.life_stress
    ),
    environment: analyzeEnvironment(
      answers.noise,
      answers.light,
      answers.temperature
    ),
    health_factors: analyzeHealth(
      answers.exercise,
      answers.diet,
      answers.medications
    ),
    primary_issues: identifyMainProblems(answers),
  };

  return generatePersonalizedPlan(profile);
};

// Exemples de profils complexes
const profileExamples = {
  "chronotype-tardif-stress-eleve": {
    zinzino_products: ["Omega-3 Balance", "Phycocyanine"],
    sleep_schedule: "Coucher 23h30, lever 7h30",
    evening_routine: "Meditation 21h, lecture 22h30",
    supplements_timing: "Omega-3 avec dîner 19h",
  },
  "leve-tot-environnement-bruyant": {
    zinzino_products: ["Spiruline", "Pack Énergie"],
    environmental_solutions: ["Bouchons oreilles", "Masque sommeil"],
    morning_routine: "Spiruline 6h30, exercice 7h",
    bedroom_optimization: "Isolation phonique priorité",
  },
};
```

#### Template Email Personnalisé (vs PDF)

```html
<!-- Email template dynamique selon profil -->
<div class="sleep-analysis-email">
  <h1>Votre Analyse Sommeil Personnalisée</h1>

  <div class="profile-section">
    <h2>Votre Profil: {{chronotype}} + {{stress_level}}</h2>
    <p>Score global: {{sleep_score}}/100</p>
    <div class="progress-bar" style="width: {{sleep_score}}%"></div>
  </div>

  <div class="recommendations-section">
    <h2>Vos Recommandations Zinzino</h2>
    {{#each zinzino_products}}
    <div class="product-card">
      <h3>{{name}}</h3>
      <p>{{benefit_for_profile}}</p>
      <a href="{{affiliate_link}}" class="cta-button"
        >Découvrir ({{commission}})</a
      >
    </div>
    {{/each}}
  </div>

  <div class="plan-section">
    <h2>Votre Plan 30 Jours</h2>
    <div class="weekly-goals">
      <div class="week">Semaine 1: {{week1_focus}}</div>
      <div class="week">Semaine 2: {{week2_focus}}</div>
      <!-- etc. -->
    </div>
  </div>

  <div class="cta-dashboard">
    <a href="{{dashboard_link}}">Accéder à votre espace membre →</a>
  </div>
</div>
```

### **Phase 2 : Recommandations Zinzino Intelligentes (Semaine 2-3)**

#### Algorithme Produits Zinzino

```javascript
// lib/zinzino-affiliate.js
const getZinzinoRecommendations = (sleepProfile) => {
  switch (sleepProfile.category) {
    case "sommeil-problematique":
      return [
        {
          product: "Phycocyanine Premium",
          reason: "Anti-inflammatoire naturel, améliore la récupération",
          commission: "€45-60",
          priority: "HIGH",
          benefits: [
            "Réduit inflammation",
            "Améliore sommeil profond",
            "Boost énergie naturelle",
          ],
        },
        {
          product: "Pack Omega-3 + Spiruline",
          reason: "Équilibre nerveux + énergie stable",
          commission: "€80-120",
          priority: "HIGH",
        },
      ];
    case "stress-anxiete":
      return [
        {
          product: "Omega-3 Balance",
          reason: "Réduit le stress et améliore l'humeur",
          commission: "€25-40",
        },
      ];
  }
};
```

#### Dashboard Zinzino Dédié

```jsx
// app/dashboard/zinzino/page.jsx
- Section spéciale "Vos suppléments personnalisés"
- Cards produits Zinzino avec bénéfices selon profil
- Témoignages clients spécifiques au sommeil
- Calculateur "Économies santé" sur 6 mois
- Liens affiliés trackés avec code personnel
```

### **Phase 3 : Branding & Contenu Authentique (Semaine 3-4)**

#### Refonte Visuelle

- **Logo Dormesia** : Design professionnel sommeil + bien-être
- **Couleurs** : Bleu nuit + vert Zinzino pour cohérence
- **Photos équipe** : Vraies photos ou illustrations pros
- **Images produits** : Photos Zinzino officielles + mise en scène
- **Témoignages** : Vrais clients (floutés si nécessaire)

#### Pages Légales RGPD

```javascript
// app/legal/ - Pages obligatoires
- Mentions légales : Statut auto-entrepreneur/société
- Politique confidentialité : RGPD + données membres
- CGV/CGU : Espace membre + affiliations
- Politique cookies : Tracking et analytics
- Disclaimer : Conseils non-médicaux + suppléments
```

## 🛠️ Stack Technique Optimisé

- **Frontend** : Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
- **Backend** : API Routes + MongoDB Atlas
- **Marketing** : ActiveCampaign + Google Analytics 4
- **SEO** : Schema.org + Sitemap dynamique + Core Web Vitals
- **Performance** : Vercel Edge + Images optimisées + Lazy loading
- **Monétisation** : Stripe + Affiliés tracking + LTD courses

## 📦 Installation & Configuration Business

### 1. **Setup Technique**

```bash
git clone https://github.com/ThibautGallien/Dormesia.git
cd Dormesia
npm install
```

### 2. **Variables d'Environnement Business**

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dormesia.vercel.app
NEXT_PUBLIC_SITE_NAME=Dormesia

# Base de Données Analytics
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dormesia

# Marketing Automation
ACTIVECAMPAIGN_URL=https://votre-compte.api-us1.com/api/3
ACTIVECAMPAIGN_API_KEY=votre_api_key_activecampaign

# Analytics & Tracking
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=votre_hotjar_id

# Monétisation
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx

# Affiliations
EMMA_AFFILIATE_ID=votre_id_emma
CASPER_AFFILIATE_ID=votre_id_casper
AMAZON_ASSOCIATE_ID=votre_id_amazon
```

### 3. **Configuration Marketing**

```bash
# ActiveCampaign Setup
npm run setup:activecampaign

# Analytics Setup
npm run setup:analytics

# Affiliate Links Setup
npm run setup:affiliates
```

## 💰 Guide de Monétisation

## 💰 Stratégie d'Affiliation Zinzino Prioritaire

### **Matrice Produits Zinzino par Profil** (70% revenus)

```javascript
// Produits Zinzino selon problématiques sommeil
const zinzinoMatrix = {
  "excellent-dormeur": [
    {
      product: "Spiruline Bio",
      benefit: "Maintient énergie optimale",
      commission: "€25-45",
      timing: "Matin au réveil",
      testimonial: "Je garde ma forme toute la journée",
    },
  ],
  "bon-dormeur": [
    {
      product: "Pack Spiruline + Omega-3",
      benefit: "Optimise récupération et concentration",
      commission: "€50-80",
      timing: "Matin + soir",
    },
  ],
  "dormeur-a-ameliorer": [
    {
      product: "Omega-3 Balance",
      benefit: "Réduit stress et améliore humeur",
      commission: "€25-40",
      priority: "HIGH",
    },
    {
      product: "Phycocyanine",
      benefit: "Anti-inflammatoire, meilleure récupération",
      commission: "€35-60",
    },
  ],
  "sommeil-problematique": [
    {
      product: "Pack Récupération (Phycocyanine + Omega-3)",
      benefit: "Combat inflammation + équilibre nerveux",
      commission: "€80-150",
      priority: "URGENT",
      social_proof:
        "78% de nos membres problématiques voient amélioration en 3 semaines",
    },
    {
      product: "Spiruline Premium",
      benefit: "Énergie naturelle sans stimulants",
      commission: "€35-55",
    },
  ],
};
```

### **Autres Affiliations par Priorité** (30% revenus)

1. **Apps méditation** : Calm, Headspace (€15-25)
2. **Matelas** : Emma, Casper (€80-200)
3. **Accessoires** : Masques, bouchons (€5-15)
4. **Thés/tisanes** : Marques bio relaxation (€8-20)

### **Automatisations ActiveCampaign Complètes**

```yaml
# Séquences email automation

ONBOARDING_PAR_PROFIL:
  "excellent-dormeur":
    - J+1: "Maintenez votre excellence" + Spiruline
    - J+3: "Témoignage client similaire" + Pack énergie
    - J+7: "Optimisation avancée" + Omega-3

  "sommeil-problematique":
    - J+1: "Plan d'urgence 21 jours" + Phycocyanine
    - J+2: "Comprendre l'inflammation" + Pack récupération
    - J+5: "Premiers résultats clients" + Témoignages
    - J+10: "Offre spéciale suivi" + Réduction exclusive

MOT_PASSE_OUBLIE:
  - Email immédiat avec lien sécurisé 24h
  - Si non utilisé: rappel J+1 avec aide

SEQUENCE_VENTE_ZINZINO:
  - Email 1: "Votre profil sommeil + solution naturelle"
  - Email 2: "Science derrière les omega-3 et sommeil"
  - Email 3: "Témoignage transformation 30 jours"
  - Email 4: "Offre limitée + garantie satisfait"
  - Email 5: "Dernière chance + bonus exclusif"

REMARKETING:
  - Quiz abandonné: Rappel J+1, J+3, J+7
  - Compte créé sans achat: Emails J+3, J+7, J+14
  - Produit vu sans achat: Email J+1 avec réduction

NEWSLETTER_MENSUELLE:
  - Contenu personnalisé selon profil
  - Nouveauté Zinzino + promotions exclusives
  - Tips sommeil + success stories membres
```

## 🎯 Stratégie de Conversion

### **Phase 1 : Acquisition** (SEO + Social)

- Articles optimisés "comment bien dormir", "troubles du sommeil"
- Quiz viral "Quel dormeur êtes-vous ?"
- Partenariats influenceurs bien-être

### **Phase 2 : Engagement** (Quiz + Email)

- Quiz personnalisé avec résultats détaillés
- PDF gratuit "Guide Optimisation Chambre"
- Séquence email 7 jours post-quiz

### **Phase 3 : Conversion** (Recommandations)

- Produits affiliés selon profil
- Formations adaptées aux problèmes identifiés
- Consultations pour cas complexes

### **Phase 4 : Fidélisation** (Premium)

- Newsletter mensuelle avec tips avancés
- Communauté privée Discord/Telegram
- Nouveaux produits et formations

## 📈 Optimisation Continue

### **A/B Tests Prioritaires**

1. **Questions quiz** : Ordre, formulation, nombre
2. **CTA buttons** : Couleur, texte, placement
3. **Landing pages** : Headlines, vidéos, social proof
4. **Email sequences** : Subject lines, timing, contenu
5. **Pricing** : Formations, consultations, programmes

### **Analytics Avancées**

```javascript
// Events tracking personnalisés
- quiz_started
- quiz_question_answered (avec numéro)
- quiz_completed
- email_provided
- newsletter_subscribed
- affiliate_link_clicked
- course_purchased
- consultation_booked
```

## 🎯 Actions Immédiates (Cette Semaine)

### **Setup Quiz IA Avancé (Priorité #1)**

1. **Extension quiz actuel** : 6 → 15 questions spécialisées
2. **Chronotype Horne-Östberg** : Questions scientifiques validées
3. **Troubles spécifiques** : Apnée, jambes sans repos, ronflement
4. **Analyse environnement** : Bruit, lumière, température, literie
5. **Algorithme IA** : Profils multidimensionnels vs binaire bon/mauvais

### **Email Templates Personnalisés (vs PDF)**

6. **Templates HTML dynamiques** : Selon profil détaillé (12 variantes)
7. **Séquences automatisées** : 5-10 emails selon complexité profil
8. **Contenu évolutif** : Mise à jour facile sans regénération PDF
9. **Tracking granulaire** : Ouverture, clics, conversions par section email

### **Authentification Complète**

5. **Pages auth** : Login, register, forgot-password, reset-password
6. **Middleware protection** : Routes /dashboard/\* protégées
7. **Session management** : JWT sécurisé + refresh tokens
8. **Integration ActiveCampaign** : Tags selon actions (login, reset, etc.)

### **Branding & Légal**

9. **Logo Dormesia** : Design professionnel + couleurs Zinzino
10. **Photos équipe** : Remplacer par vraies photos ou illustrations pros
11. **Pages légales** : Mentions, confidentialité, cookies, CGV
12. **Images produits** : Photos officielles Zinzino + mise en scène

### **ActiveCampaign Setup**

13. **Automatisations** : Onboarding par profil, mot de passe oublié
14. **Séquences Zinzino** : 5 emails de vente selon profil sommeil
15. **Tags avancés** : Profil + actions + préférences produits
16. **Templates emails** : Design cohérent avec site

## 🚀 Roadmap 90 Jours Focus Zinzino

### **Mois 1 : Quiz IA & Email Automation**

- ✅ Quiz avancé 15 questions + algorithme IA
- ✅ Templates email personnalisés (12 profils types)
- ✅ Séquences ActiveCampaign selon chronotype/troubles
- ✅ Dashboard avec recommandations Zinzino intelligentes

### **Mois 2 : Optimisation & Profils Avancés**

- 📝 Articles SEO chronotypes ("Êtes-vous lève-tôt ou couche-tard ?")
- 📊 A/B test profils : Simple vs IA vs questionnaire long
- 🎨 Infographies profils sommeil + troubles spécifiques
- 📧 Optimisation emails : timing selon chronotype

### **Mois 3 : Scale & Revenue**

- 📈 Partenariat renforcé Zinzino (codes promo exclusifs)
- 🎯 Optimisation conversion quiz→membre→achat Zinzino
- 📱 Dashboard mobile optimisé + notifications push
- 💰 **Objectif : €2,000/mois revenus Zinzino**

## 🔄 Métriques de Succès Zinzino-Focused

| Métrique              | Actuel | 1 Mois   | 3 Mois     | 6 Mois     |
| --------------------- | ------ | -------- | ---------- | ---------- |
| Quiz completés (15Q)  | -      | 80       | 250        | 500        |
| Profils IA générés    | -      | 80       | 250        | 500        |
| Emails personnalisés  | -      | 80       | 250        | 500        |
| Open rate emails      | -      | 45%      | 55%        | 65%        |
| Clics Zinzino         | -      | 100      | 350        | 700        |
| Conversion quiz→vente | -      | 10%      | 14%        | 18%        |
| Revenue Zinzino       | €0     | €500     | €1,800     | €4,000     |
| **Total revenus**     | **€0** | **€600** | **€2,200** | **€4,800** |

### **KPIs Quiz IA Spécifiques**

- **Completion rate 15 questions** : >75% (vs 65% pour 6 questions)
- **Précision profils** : >90% satisfaction utilisateur avec recommandations
- **Engagement emails** : >50% ouverture séquences personnalisées
- **Conversion Zinzino par profil** :
  - Stress élevé + Omega-3 : >15%
  - Problèmes inflammatoires + Phycocyanine : >12%
  - Fatigue matinale + Spiruline : >18%

**Focus immédiat** : Optimiser le quiz pour maximiser les emails collectés, puis orienter massivement vers les produits Zinzino dans l'espace membre ! 🎯💰

---

**Développé avec 💰 stratégie business par [Thibaut Gallien](https://github.com/ThibautGallien)**

_Dormesia - Transformez votre expertise sommeil en business rentable_ 🌙💰
