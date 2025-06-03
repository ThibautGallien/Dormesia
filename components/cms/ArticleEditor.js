// components/cms/ArticleEditor.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save,
  Link,
  Bold,
  Italic,
  List,
  Hash,
  Quote,
  Code,
  FileText,
  ArrowLeft,
} from "lucide-react";

export default function ArticleEditor({
  article,
  siteConfig,
  onSave,
  onCancel,
  loading,
}) {
  // Fonction de protection pour les tags
  const ensureTagsArray = (tags) => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      if (tags.includes(",")) {
        return tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      }
      return tags.length > 0 ? [tags] : [];
    }
    return [];
  };

  // Fonction de protection pour les mots-clés SEO
  const ensureKeywordsArray = (keywords) => {
    if (Array.isArray(keywords)) return keywords;
    if (typeof keywords === "string") {
      if (keywords.includes(",")) {
        return keywords
          .split(",")
          .map((kw) => kw.trim())
          .filter((kw) => kw.length > 0);
      }
      return keywords.length > 0 ? [keywords] : [];
    }
    return [];
  };

  // État initial sécurisé
  const getInitialFormData = () => {
    const baseData = {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      imageAlt: "",
      imageTitle: "",
      category: "conseils-sommeil",
      tags: [],
      author: {
        name: "Équipe Dormesia",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      },
      publishedAt: new Date().toISOString().split("T")[0],
      draft: false,
      featured: false,
      readingTime: 1,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    };

    if (article) {
      return {
        ...baseData,
        ...article,
        tags: ensureTagsArray(article.tags || []),
        seoKeywords: ensureKeywordsArray(article.seoKeywords || []),
        author: article.author || baseData.author,
      };
    }

    return baseData;
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const textareaRef = useRef(null);

  // Catégories disponibles
  const categories = [
    { value: "science-sommeil", label: "Science du Sommeil" },
    { value: "conseils-sommeil", label: "Conseils Sommeil" },
    { value: "produits-naturels", label: "Produits Naturels" },
    { value: "troubles-sommeil", label: "Troubles du Sommeil" },
    { value: "hygiene-sommeil", label: "Hygiène du Sommeil" },
  ];

  // Auto-générer le slug
  useEffect(() => {
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  // Auto-générer SEO title si vide
  useEffect(() => {
    if (formData.title && !formData.seoTitle) {
      setFormData((prev) => ({
        ...prev,
        seoTitle:
          formData.title.length > 60
            ? formData.title.substring(0, 57) + "..."
            : formData.title,
      }));
    }
  }, [formData.title, formData.seoTitle]);

  // Calculer temps de lecture
  useEffect(() => {
    const words = formData.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    setFormData((prev) => ({ ...prev, readingTime }));
  }, [formData.content]);

  // Fonctions d'aide Markdown
  const insertMarkdown = (before, after = "", placeholder = "texte") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || placeholder;

    const newText =
      formData.content.substring(0, start) +
      before +
      selectedText +
      after +
      formData.content.substring(end);

    setFormData((prev) => ({ ...prev, content: newText }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertLink = () => {
    const url = prompt("URL du lien:");
    if (url) {
      insertMarkdown("[", `](${url})`);
    }
  };

  // Gestion des tags
  const addTag = () => {
    if (
      newTag.trim() &&
      !ensureTagsArray(formData.tags).includes(newTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...ensureTagsArray(prev.tags), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: ensureTagsArray(prev.tags).filter((tag) => tag !== tagToRemove),
    }));
  };

  // Gestion des mots-clés
  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !ensureKeywordsArray(formData.seoKeywords).includes(newKeyword.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        seoKeywords: [
          ...ensureKeywordsArray(prev.seoKeywords),
          newKeyword.trim(),
        ],
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData((prev) => ({
      ...prev,
      seoKeywords: ensureKeywordsArray(prev.seoKeywords).filter(
        (keyword) => keyword !== keywordToRemove
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Envoi formData:", formData);
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onCancel}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </button>
              <h1 className="text-xl font-bold text-gray-800">
                {article ? "Modifier l'article" : "Nouvel article"}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FileText className="w-4 h-4" />
                <span>{formData.readingTime} min de lecture</span>
                <span>•</span>
                <span>{formData.content.split(/\s+/).length} mots</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                form="article-form"
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "Sauvegarde..." : "Sauvegarder"}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ paddingTop: "100px" }}>
        <form id="article-form" onSubmit={handleSubmit} className="flex-1">
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-6">
                {/* Titre et slug */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de l'article *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Titre accrocheur de votre article"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL (slug)
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-sm">
                          dormesia.com/articles/
                        </span>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              slug: e.target.value,
                            }))
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="url-de-votre-article"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Résumé
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            excerpt: e.target.value,
                          }))
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Résumé de l'article"
                      />
                    </div>
                  </div>
                </div>

                {/* Éditeur de contenu */}
                <div className="bg-white rounded-lg shadow-sm border">
                  {/* Barre d'outils markdown */}
                  <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                    <div className="flex items-center space-x-2 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => insertMarkdown("**", "**")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Gras"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("*", "*")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Italique"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("## ", "")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Titre H2"
                      >
                        <Hash className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("- ", "")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Liste"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("> ", "")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Citation"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("`", "`")}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Code"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300"></div>
                      <button
                        type="button"
                        onClick={insertLink}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Lien"
                      >
                        <Link className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Zone d'édition */}
                  <div className="p-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu de l'article *
                    </label>
                    <textarea
                      ref={textareaRef}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                      placeholder="Écrivez votre article en Markdown..."
                      required
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      Utilisez la syntaxe Markdown.{" "}
                      <a
                        href="https://www.markdownguide.org/basic-syntax/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Guide de syntaxe
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Statut de publication */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Publication
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="draft"
                        checked={formData.draft}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            draft: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <label htmlFor="draft" className="text-sm text-gray-700">
                        Enregistrer comme brouillon
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <label
                        htmlFor="featured"
                        className="text-sm text-gray-700"
                      >
                        Article mis en avant
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de publication
                      </label>
                      <input
                        type="date"
                        value={formData.publishedAt}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            publishedAt: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Catégorie */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Catégorie</h3>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Tags</h3>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Ajouter un tag"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ensureTagsArray(formData.tags).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image mise en avant */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Image mise en avant
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL de l'image
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Texte alternatif (ALT)
                      </label>
                      <input
                        type="text"
                        value={formData.imageAlt}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            imageAlt: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Description de l'image"
                      />
                    </div>
                    {formData.image && (
                      <div className="mt-2">
                        <img
                          src={formData.image}
                          alt={formData.imageAlt}
                          className="w-full h-32 object-cover rounded-md"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <h3 className="font-medium text-gray-800 mb-3">SEO</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre SEO
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seoTitle: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Titre optimisé pour les moteurs de recherche"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            seoDescription: e.target.value,
                          }))
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Description pour les résultats de recherche"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mots-clés SEO
                      </label>
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), addKeyword())
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder="Ajouter un mot-clé"
                          />
                          <button
                            type="button"
                            onClick={addKeyword}
                            className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {ensureKeywordsArray(formData.seoKeywords).map(
                            (keyword) => (
                              <span
                                key={keyword}
                                className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                              >
                                <span>{keyword}</span>
                                <button
                                  type="button"
                                  onClick={() => removeKeyword(keyword)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  ×
                                </button>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
