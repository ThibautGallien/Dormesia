// lib/activecampaign.js - VERSION CORRIGÉE
import axios from "axios";

class ActiveCampaignService {
  constructor() {
    this.baseURL = process.env.ACTIVECAMPAIGN_URL;
    this.apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

    if (!this.baseURL || !this.apiKey) {
      throw new Error("ActiveCampaign credentials not configured");
    }

    if (!this.baseURL.endsWith("/api/3")) {
      this.baseURL = this.baseURL + "/api/3";
    }

    console.log("🔧 ActiveCampaign URL configurée:", this.baseURL);

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Api-Token": this.apiKey,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    // 🆕 CACHE pour éviter les recréations
    this.fieldCache = new Map();
    this.fieldsLoaded = false;
  }

  // 🔧 CORRECTION: Charger tous les champs existants au démarrage
  async loadExistingFields() {
    if (this.fieldsLoaded) return;

    try {
      console.log("📋 Chargement des champs existants...");

      const response = await this.client.get("/fields", {
        params: { limit: 100 },
      });

      if (response.data.fields) {
        response.data.fields.forEach((field) => {
          // Stocker par titre ET par type
          const normalizedTitle = field.title
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "_");
          this.fieldCache.set(normalizedTitle, field.id);
          console.log(`📝 Champ existant: ${field.title} (ID: ${field.id})`);
        });
      }

      this.fieldsLoaded = true;
      console.log(`✅ ${this.fieldCache.size} champ(s) chargé(s)`);
    } catch (error) {
      console.error("❌ Erreur chargement champs:", error.message);
      this.fieldsLoaded = true; // Continuer même si erreur
    }
  }

  // 🔧 CORRECTION: Fonction pour créer les champs avec le bon format
  async createCustomField(fieldName) {
    try {
      console.log(`➕ Création champ: ${fieldName}`);

      const fieldConfig = this.getFieldConfig(fieldName);

      // 🎯 FORMAT CORRECT pour ActiveCampaign
      const requestData = {
        field: {
          title: fieldConfig.title,
          type: fieldConfig.type,
          descript: fieldConfig.descript,
          perstag: this.generatePerstag(fieldConfig.title), // Tag personnel unique
          defval: fieldConfig.defval || "", // Valeur par défaut
          visible: 1, // Visible dans l'interface
          service: "", // Pas de service spécifique
          ordernum: 0, // Ordre d'affichage
        },
      };

      console.log("📤 Données envoyées:", JSON.stringify(requestData, null, 2));

      const response = await this.client.post("/fields", requestData);

      if (response.data.field) {
        const newField = response.data.field;
        this.fieldCache.set(fieldName, newField.id);
        console.log(`✅ Champ créé: ${fieldConfig.title} (ID: ${newField.id})`);
        return newField;
      }

      throw new Error("Réponse invalide d'ActiveCampaign");
    } catch (error) {
      console.error(
        `❌ Erreur création champ ${fieldName}:`,
        error.response?.data || error.message
      );

      // 🔍 Log détaillé pour debug
      if (error.response?.data) {
        console.error(
          "📋 Détails erreur AC:",
          JSON.stringify(error.response.data, null, 2)
        );
      }

      return null; // Retourner null au lieu de throw
    }
  }

  // 🆕 NOUVEAU: Générer un perstag unique
  generatePerstag(title) {
    return (
      title
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "_")
        .substring(0, 20) + // Max 20 caractères
      "_" +
      Date.now().toString().slice(-4)
    ); // Suffixe unique
  }

  // 🔧 CORRECTION: Configuration des champs avec types corrects
  getFieldConfig(fieldName) {
    const configs = {
      SCORE_SOMMEIL: {
        title: "Score Sommeil",
        type: "text", // 🔧 CHANGÉ: text au lieu de number pour plus de compatibilité
        descript: "Score du quiz sommeil (0-100)",
        defval: "0",
      },
      CATEGORIE_SOMMEIL: {
        title: "Catégorie Sommeil",
        type: "text",
        descript: "Catégorie: excellent, bon, moyen, problématique",
        defval: "",
      },
      CHRONOTYPE: {
        title: "Chronotype",
        type: "text",
        descript: "Type: lève-tôt, couche-tard, neutre",
        defval: "",
      },
      HEURE_COUCHER: {
        title: "Heure Coucher",
        type: "text",
        descript: "Heure habituelle de coucher",
        defval: "",
      },
      HEURE_REVEIL: {
        title: "Heure Réveil",
        type: "text",
        descript: "Heure habituelle de réveil",
        defval: "",
      },
      DUREE_SOMMEIL: {
        title: "Durée Sommeil",
        type: "text", // 🔧 CHANGÉ: text au lieu de number
        descript: "Durée de sommeil en heures",
        defval: "0",
      },
      PROBLEME_PRINCIPAL: {
        title: "Problème Principal",
        type: "text",
        descript: "Principal problème de sommeil",
        defval: "",
      },
      NIVEAU_STRESS: {
        title: "Niveau Stress",
        type: "text", // 🔧 CHANGÉ
        descript: "Niveau de stress (1-10)",
        defval: "0",
      },
      QUALITE_SOMMEIL: {
        title: "Qualité Sommeil",
        type: "text", // 🔧 CHANGÉ
        descript: "Qualité perçue (1-10)",
        defval: "0",
      },
      EXPOSITION_ECRANS: {
        title: "Exposition Écrans",
        type: "text",
        descript: "Temps exposition écrans avant coucher",
        defval: "",
      },
      NIVEAU_EXERCICE: {
        title: "Niveau Exercice",
        type: "text",
        descript: "Fréquence exercice physique",
        defval: "",
      },
      QUIZ_COMPLETE_LE: {
        title: "Quiz Complété Le",
        type: "date",
        descript: "Date completion du quiz",
        defval: "",
      },
      DERNIERE_SYNC: {
        title: "Dernière Sync",
        type: "text", // 🔧 CHANGÉ: text au lieu de datetime
        descript: "Dernière synchronisation",
        defval: "",
      },
    };

    return (
      configs[fieldName] || {
        title: fieldName.replace(/_/g, " "),
        type: "text",
        descript: `Champ: ${fieldName}`,
        defval: "",
      }
    );
  }

  // 🔧 CORRECTION: getFieldId avec chargement préalable
  async getFieldId(fieldName) {
    try {
      // Charger les champs existants si pas encore fait
      await this.loadExistingFields();

      // Vérifier le cache d'abord
      if (this.fieldCache.has(fieldName)) {
        const fieldId = this.fieldCache.get(fieldName);
        console.log(`✅ Champ trouvé en cache: ${fieldName} (ID: ${fieldId})`);
        return fieldId;
      }

      // Essayer de créer le champ
      console.log(`🔍 Champ non trouvé, création: ${fieldName}`);
      const newField = await this.createCustomField(fieldName);

      if (newField && newField.id) {
        return newField.id;
      }

      console.warn(`⚠️ Impossible de créer le champ: ${fieldName}`);
      return null;
    } catch (error) {
      console.error(`❌ Erreur getFieldId ${fieldName}:`, error.message);
      return null;
    }
  }

  // 🔧 CORRECTION: updateCustomFields avec gestion d'erreurs améliorée
  async updateCustomFields(contactId, fields) {
    try {
      console.log(
        "📝 Mise à jour champs personnalisés pour contact:",
        contactId
      );
      console.log("📊 Champs à traiter:", Object.keys(fields));

      const fieldUpdates = [];
      let successCount = 0;
      let errorCount = 0;

      // 🎯 MAPPING SIMPLIFIÉ - moins de champs pour éviter les erreurs
      const criticalFields = {
        sleep_score: fields.sleep_score_advanced || fields.sleep_score,
        sleep_category: fields.sleep_category_advanced || fields.sleep_category,
        chronotype: fields.chronotype,
        quiz_completed_at: fields.quiz_completed_at,
      };

      console.log("🎯 Champs critiques à synchroniser:", criticalFields);

      for (const [key, value] of Object.entries(criticalFields)) {
        if (value !== null && value !== undefined && value !== "") {
          try {
            const fieldId = await this.getFieldId(key.toUpperCase());

            if (fieldId) {
              // 🔧 FORMAT CORRECT pour field values
              const fieldValueData = {
                fieldValue: {
                  contact: contactId,
                  field: fieldId,
                  value: String(value), // Toujours convertir en string
                },
              };

              const response = await this.client.post(
                "/fieldValues",
                fieldValueData
              );

              if (response.status === 201 || response.status === 200) {
                successCount++;
                console.log(`✅ Champ mis à jour: ${key} = ${value}`);
              } else {
                errorCount++;
                console.log(
                  `⚠️ Réponse inattendue pour ${key}:`,
                  response.status
                );
              }
            } else {
              console.log(`⚠️ ID champ non trouvé pour: ${key}`);
              errorCount++;
            }
          } catch (fieldError) {
            console.error(
              `❌ Erreur champ ${key}:`,
              fieldError.response?.data || fieldError.message
            );
            errorCount++;
          }

          // 🔄 Petite pause entre les requêtes pour éviter rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      console.log(`📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);

      if (successCount > 0) {
        console.log("✅ Mise à jour champs personnalisés terminée");
      }

      return { successCount, errorCount };
    } catch (error) {
      console.error(
        "❌ Erreur updateCustomFields:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  // 1. GESTION CONTACTS (reste pareil)
  async findOrCreateContact(email, firstName = null) {
    try {
      console.log("🔍 Recherche contact:", email.substring(0, 3) + "***");

      const searchResponse = await this.client.get("/contacts", {
        params: { email },
      });

      let contact = null;
      let isNew = false;

      if (
        searchResponse.data.contacts &&
        searchResponse.data.contacts.length > 0
      ) {
        contact = searchResponse.data.contacts[0];
        console.log("✅ Contact trouvé:", contact.id);
      } else {
        console.log("➕ Création nouveau contact");

        const createData = {
          contact: {
            email,
            firstName: firstName || "Dormeur",
          },
        };

        const createResponse = await this.client.post("/contacts", createData);
        contact = createResponse.data.contact;
        isNew = true;
        console.log("✅ Contact créé:", contact.id);
      }

      return { ...contact, isNew };
    } catch (error) {
      console.error(
        "❌ Erreur find/create contact:",
        error.response?.data || error.message
      );
      throw new Error(`Contact error: ${error.message}`);
    }
  }

  // 3. GESTION TAGS (reste pareil mais avec gestion d'erreurs)
  async addTags(contactId, tags) {
    try {
      console.log("🏷️ Ajout tags:", contactId, tags);

      const results = [];
      for (const tagName of tags) {
        try {
          const tag = await this.findOrCreateTag(tagName);
          if (tag) {
            await this.client.post("/contactTags", {
              contactTag: {
                contact: contactId,
                tag: tag.id,
              },
            });
            results.push(tagName);
            console.log(`✅ Tag ajouté: ${tagName}`);
          }
        } catch (error) {
          console.error(`❌ Erreur tag ${tagName}:`, error.message);
        }
      }

      return results;
    } catch (error) {
      console.error("❌ Erreur addTags:", error.message);
      return [];
    }
  }

  async findOrCreateTag(tagName) {
    try {
      const searchResponse = await this.client.get("/tags", {
        params: { search: tagName },
      });

      if (searchResponse.data.tags && searchResponse.data.tags.length > 0) {
        const existingTag = searchResponse.data.tags.find(
          (tag) => tag.tag.toLowerCase() === tagName.toLowerCase()
        );
        if (existingTag) {
          return existingTag;
        }
      }

      const createResponse = await this.client.post("/tags", {
        tag: {
          tag: tagName,
          tagType: "contact",
        },
      });

      return createResponse.data.tag;
    } catch (error) {
      console.error(`❌ Erreur tag ${tagName}:`, error.message);
      return null;
    }
  }

  // 8. TEST CONNEXION
  async testConnection() {
    try {
      const response = await this.client.get("/users/me");
      console.log("✅ ActiveCampaign connexion OK");
      return true;
    } catch (error) {
      console.error("❌ ActiveCampaign connexion failed:", error.message);
      return false;
    }
  }
}

// Export singleton
let activeCampaignService = null;

export function getActiveCampaignService() {
  if (!activeCampaignService) {
    activeCampaignService = new ActiveCampaignService();
  }
  return activeCampaignService;
}

export default ActiveCampaignService;
