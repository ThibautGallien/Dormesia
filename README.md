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

### **Architecture Multi-Sites**

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

**Développé avec ❤️ par [Thibaut Gallien](https://github.com/ThibautGallien)**

_Dormesia - Votre expert digital du sommeil réparateur_ 🌙
