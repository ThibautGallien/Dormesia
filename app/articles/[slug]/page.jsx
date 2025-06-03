"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug;
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Article de fallback pour la démo
  const fallbackArticle = {
    title: "Guide Complet pour un Sommeil Réparateur",
    content: `# Guide Complet pour un Sommeil Réparateur

Le sommeil est l'un des piliers fondamentaux de notre santé. Un sommeil de qualité influence directement notre bien-être physique, mental et émotionnel.

## L'importance du sommeil

Un sommeil réparateur permet à notre organisme de :

- **Régénérer les cellules** et réparer les tissus
- **Consolider la mémoire** et traiter les informations de la journée
- **Renforcer le système immunitaire**
- **Réguler les hormones** qui contrôlent la faim et le stress
- **Maintenir un équilibre émotionnel** stable

## Les phases du sommeil

Le sommeil se compose de plusieurs cycles, chacun durant environ 90 minutes :

### 1. Sommeil léger (N1)
Phase de transition entre l'éveil et le sommeil profond.

### 2. Sommeil profond (N2)
Le corps commence à se détendre profondément.

### 3. Sommeil très profond (N3)
Phase la plus réparatrice pour le corps physique.

### 4. Sommeil paradoxal (REM)
Période des rêves, essentielle pour la santé mentale.

## Conseils pour améliorer votre sommeil

### Créez un environnement propice

- Maintenez une température fraîche (18-20°C)
- Utilisez des rideaux occultants
- Éliminez les sources de bruit
- Investissez dans une literie de qualité

### Adoptez une routine du soir

- Couchez-vous et levez-vous à heures fixes
- Évitez les écrans 1h avant le coucher
- Pratiquez la relaxation ou la méditation
- Prenez un bain chaud

### Attention à votre alimentation

- Évitez la caféine après 16h
- Ne mangez pas trop lourd le soir
- Limitez l'alcool
- Buvez une tisane apaisante

## Quand consulter un professionnel ?

Si malgré ces conseils vous continuez à avoir des troubles du sommeil, il est recommandé de consulter un médecin, particulièrement si vous ressentez :

- Fatigue chronique
- Difficultés de concentration
- Troubles de l'humeur
- Ronflements importants
- Arrêts respiratoires nocturnes

N'hésitez pas à tenir un carnet de sommeil pour aider votre médecin à mieux comprendre vos difficultés.

## Conclusion

Un sommeil de qualité est un investissement pour votre santé future. En appliquant ces conseils progressivement, vous devriez observer une amélioration de votre qualité de vie globale.`,
    excerpt: "Découvrez tous nos conseils pour retrouver un sommeil réparateur et améliorer votre qualité de vie.",
    category: "conseils-sommeil",
    image: "https://images.pexels.com/photos/6087674/pexels-photo-6087674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Personne dormant paisiblement",
    publishedAt: "2024-04-15",
    readingTime: 5,
    tags: ["sommeil", "santé", "bien-être", "conseils"],
    author: {
      name: "Équipe Dormesia",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  };

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        console.log(`🔍 Chargement de l'article: ${slug}`);

        const response = await fetch(`/api/cms/github/article/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.log('📝 Article non trouvé, utilisation du fallback');
            setArticle(fallbackArticle);
            return;
          }
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        const content = atob(data.content);
        
        // Parser le frontmatter
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (!match) {
          console.log('❌ Pas de frontmatter, utilisation du fallback');
          setArticle(fallbackArticle);
          return;
        }

        const frontmatterLines = match[1].split('\n');
        const contentBody = match[2];
        const frontmatter = {};

        // Parser le frontmatter
        for (const line of frontmatterLines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.includes(':')) continue;

          const [key, ...valueParts] = trimmedLine.split(':');
          let value = valueParts.join(':').trim().replace(/['"]/g, '');

          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if (!isNaN(value) && value !== '') value = Number(value);

          frontmatter[key.trim()] = value;
        }

        const parsedArticle = {
          ...frontmatter,
          content: contentBody,
          slug,
        };

        console.log('✅ Article chargé:', parsedArticle.title);
        setArticle(parsedArticle);

      } catch (error) {
        console.error('❌ Erreur chargement article:', error);
        setError(error.message);
        setArticle(fallbackArticle);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ensureArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.includes(',')) {
      return value.split(',').map(item => item.trim());
    }
    return value ? [value] : [];
  };

  return (
    <div className="pt-16">
      {/* Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/articles"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          {/* Catégorie */}
          {article.category && (
            <div className="mb-4">
              <Badge variant="secondary" className="text-indigo-600 bg-indigo-50">
                {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            </div>
          )}

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta informations */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            {/* Auteur */}
            <div className="flex items-center">
              {article.author?.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author?.name || 'Auteur'}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
              )}
              <User className="w-4 h-4 mr-1" />
              <span>{article.author?.name || 'Équipe Dormesia'}</span>
            </div>

            {/* Date */}
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            {/* Temps de lecture */}
            {article.readingTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readingTime} min de lecture</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && ensureArray(article.tags).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {ensureArray(article.tags).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Image principale */}
          {article.image && (
            <div className="mb-8">
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {article.imageAlt && (
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  {article.imageAlt}
                </p>
              )}
            </div>
          )}
        </header>

        {/* Contenu */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">{children}</h3>,
              p: ({children}) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-gray-700">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 p-4 my-6 italic">
                  {children}
                </blockquote>
              ),
              strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
              code: ({children}) => (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Footer de l'article */}
        <footer className="mt-12 pt-8 border-t">
          <div className="bg-indigo-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">
              Besoin d'aide pour votre sommeil ?
            </h3>
            <p className="text-indigo-700 mb-4">
              Découvrez nos solutions naturelles et nos conseils personnalisés pour améliorer votre qualité de sommeil.
            </p>
            <Link href="/contact">
              <Button>Nous contacter</Button>
            </Link>
          </div>
        </footer>
      </article>

      {/* Articles similaires */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Articles similaires</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Vous pouvez ajouter ici une logique pour charger des articles similaires */}
          <div className="text-center text-gray-500">
            <p>Articles similaires bientôt disponibles</p>
          </div>
        </div>
      </section>
    </div>
  );
}