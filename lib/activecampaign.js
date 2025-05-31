import axios from "axios";

class ActiveCampaignService {
  constructor() {
    // CORRECTION: Construire l'URL correctement
    this.baseURL = process.env.ACTIVECAMPAIGN_URL;
    this.apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

    if (!this.baseURL || !this.apiKey) {
      throw new Error("ActiveCampaign credentials not configured");
    }

    // S'assurer que l'URL se termine par /api/3
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
      timeout: 10000,
    });
  }

  // 1. GESTION CONTACTS
  async findOrCreateContact(email, firstName = null) {
    try {
      console.log("🔍 Searching contact:", email.substring(0, 3) + "***");

      // Rechercher contact existant - CORRECTION: endpoint correct
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
        console.log("✅ Contact found:", contact.id);
      } else {
        // Créer nouveau contact
        console.log("➕ Creating new contact");

        const createData = {
          contact: {
            email,
            firstName: firstName || "Dormeur",
          },
        };

        // Ajouter à une liste par défaut si elle existe
        const defaultListId = await this.getDefaultListId();
        if (defaultListId) {
          createData.contact.lists = [defaultListId];
        }

        const createResponse = await this.client.post("/contacts", createData);

        contact = createResponse.data.contact;
        isNew = true;
        console.log("✅ Contact created:", contact.id);
      }

      return { ...contact, isNew };
    } catch (error) {
      console.error(
        "❌ Find/Create contact error:",
        error.response?.data || error.message
      );
      throw new Error(`ActiveCampaign contact error: ${error.message}`);
    }
  }

  // NOUVELLE: Obtenir une liste par défaut
  async getDefaultListId() {
    try {
      const listsResponse = await this.client.get("/lists");

      if (listsResponse.data.lists && listsResponse.data.lists.length > 0) {
        // Prendre la première liste disponible
        const defaultList = listsResponse.data.lists[0];
        console.log("📋 Using default list:", defaultList.name, defaultList.id);
        return defaultList.id;
      }

      console.log("⚠️ No lists found in ActiveCampaign");
      return null;
    } catch (error) {
      console.error("❌ Error getting lists:", error.message);
      return null;
    }
  }

  // 2. MISE À JOUR CHAMPS PERSONNALISÉS
  async updateCustomFields(contactId, fields) {
    try {
      console.log("📝 Updating custom fields for contact:", contactId);

      const fieldUpdates = [];

      // Mapper les champs pour AC
      const fieldMapping = {
        sleep_score: await this.getFieldId("SCORE_SOMMEIL"),
        sleep_category: await this.getFieldId("CATEGORIE_SOMMEIL"),
        bedtime_hour: await this.getFieldId("HEURE_COUCHER"),
        wake_hour: await this.getFieldId("HEURE_REVEIL"),
        sleep_duration: await this.getFieldId("DUREE_SOMMEIL"),
        main_issue: await this.getFieldId("PROBLEME_PRINCIPAL"),
        stress_level: await this.getFieldId("NIVEAU_STRESS"),
        sleep_quality: await this.getFieldId("QUALITE_SOMMEIL"),
        chronotype: await this.getFieldId("CHRONOTYPE"),
        screen_exposure: await this.getFieldId("EXPOSITION_ECRANS"),
        exercise_level: await this.getFieldId("NIVEAU_EXERCICE"),
        quiz_completed_at: await this.getFieldId("QUIZ_COMPLETE_LE"),
        last_sync: await this.getFieldId("DERNIERE_SYNC"),
      };

      // Créer les field values
      for (const [key, value] of Object.entries(fields)) {
        const fieldId = fieldMapping[key];
        if (fieldId && value !== null && value !== undefined) {
          fieldUpdates.push({
            contact: contactId,
            field: fieldId,
            value: String(value),
          });
        }
      }

      // Mettre à jour par batch
      if (fieldUpdates.length > 0) {
        const promises = fieldUpdates.map((fieldUpdate) =>
          this.client.post("/fieldValues", { fieldValue: fieldUpdate })
        );

        await Promise.all(promises);
        console.log("✅ Custom fields updated:", fieldUpdates.length);
      }
    } catch (error) {
      console.error(
        "❌ Update fields error:",
        error.response?.data || error.message
      );
      throw new Error(`Custom fields update error: ${error.message}`);
    }
  }

  // 3. GESTION TAGS
  async addTags(contactId, tags) {
    try {
      console.log("🏷️ Adding tags to contact:", contactId, tags);

      const tagPromises = tags.map(async (tagName) => {
        try {
          // Trouver ou créer le tag
          const tag = await this.findOrCreateTag(tagName);

          // Ajouter au contact
          await this.client.post("/contactTags", {
            contactTag: {
              contact: contactId,
              tag: tag.id,
            },
          });

          return tagName;
        } catch (error) {
          console.error(`❌ Error adding tag ${tagName}:`, error.message);
          return null;
        }
      });

      const results = await Promise.all(tagPromises);
      const successfulTags = results.filter((tag) => tag !== null);

      console.log("✅ Tags added:", successfulTags);
      return successfulTags;
    } catch (error) {
      console.error(
        "❌ Add tags error:",
        error.response?.data || error.message
      );
      throw new Error(`Tags error: ${error.message}`);
    }
  }

  // 4. GESTION TAGS (HELPER)
  async findOrCreateTag(tagName) {
    try {
      // Rechercher tag existant
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

      // Créer nouveau tag
      const createResponse = await this.client.post("/tags", {
        tag: {
          tag: tagName,
          tagType: "contact",
        },
      });

      return createResponse.data.tag;
    } catch (error) {
      console.error("❌ Find/Create tag error:", error.message);
      throw error;
    }
  }

  // 5. GESTION CHAMPS PERSONNALISÉS (HELPER)
  async getFieldId(fieldName) {
    try {
      // Cache pour éviter les appels répétés
      if (!this.fieldCache) {
        this.fieldCache = {};
      }

      if (this.fieldCache[fieldName]) {
        return this.fieldCache[fieldName];
      }

      // Récupérer tous les champs
      const fieldsResponse = await this.client.get("/fields");

      const field = fieldsResponse.data.fields.find(
        (f) => f.title.toUpperCase() === fieldName.toUpperCase()
      );

      if (field) {
        this.fieldCache[fieldName] = field.id;
        return field.id;
      }

      // Créer le champ s'il n'existe pas
      console.log("➕ Creating custom field:", fieldName);
      const newField = await this.createCustomField(fieldName);
      this.fieldCache[fieldName] = newField.id;

      return newField.id;
    } catch (error) {
      console.error("❌ Get field ID error:", error.message);
      return null;
    }
  }

  // 6. CRÉATION CHAMPS PERSONNALISÉS
  async createCustomField(fieldName) {
    try {
      const fieldConfig = this.getFieldConfig(fieldName);

      const createResponse = await this.client.post("/fields", {
        field: fieldConfig,
      });

      console.log("✅ Custom field created:", fieldName);
      return createResponse.data.field;
    } catch (error) {
      console.error("❌ Create field error:", error.message);
      throw error;
    }
  }

  // 7. CONFIGURATION CHAMPS
  getFieldConfig(fieldName) {
    const configs = {
      SCORE_SOMMEIL: {
        title: "Score Sommeil",
        type: "number",
        descript: "Score du quiz sommeil (0-100)",
      },
      CATEGORIE_SOMMEIL: {
        title: "Catégorie Sommeil",
        type: "text",
        descript: "Catégorie de sommeil: excellent, bon, moyen, problématique",
      },
      HEURE_COUCHER: {
        title: "Heure de Coucher",
        type: "text",
        descript: "Heure habituelle de coucher",
      },
      HEURE_REVEIL: {
        title: "Heure de Réveil",
        type: "text",
        descript: "Heure habituelle de réveil",
      },
      DUREE_SOMMEIL: {
        title: "Durée de Sommeil",
        type: "number",
        descript: "Durée de sommeil en heures",
      },
      PROBLEME_PRINCIPAL: {
        title: "Problème Principal",
        type: "text",
        descript: "Principal problème de sommeil identifié",
      },
      NIVEAU_STRESS: {
        title: "Niveau de Stress",
        type: "number",
        descript: "Niveau de stress (1-10)",
      },
      QUALITE_SOMMEIL: {
        title: "Qualité de Sommeil",
        type: "number",
        descript: "Qualité perçue du sommeil (1-10)",
      },
      CHRONOTYPE: {
        title: "Chronotype",
        type: "text",
        descript: "Type chronobiologique: lève-tôt, couche-tard, neutre",
      },
      EXPOSITION_ECRANS: {
        title: "Exposition Écrans",
        type: "text",
        descript: "Temps d'exposition aux écrans avant coucher",
      },
      NIVEAU_EXERCICE: {
        title: "Niveau d'Exercice",
        type: "text",
        descript: "Fréquence d'exercice physique",
      },
      QUIZ_COMPLETE_LE: {
        title: "Quiz Complété Le",
        type: "date",
        descript: "Date de completion du quiz",
      },
      DERNIERE_SYNC: {
        title: "Dernière Sync",
        type: "datetime",
        descript: "Dernière synchronisation des données",
      },
    };

    return (
      configs[fieldName] || {
        title: fieldName,
        type: "text",
        descript: `Champ personnalisé: ${fieldName}`,
      }
    );
  }

  // 8. DÉCLENCHER AUTOMATION
  async triggerAutomation(contactId, automationId) {
    try {
      console.log(
        "🤖 Triggering automation:",
        automationId,
        "for contact:",
        contactId
      );

      const response = await this.client.post("/contactAutomations", {
        contactAutomation: {
          contact: contactId,
          automation: automationId,
        },
      });

      console.log("✅ Automation triggered");
      return response.data;
    } catch (error) {
      console.error(
        "❌ Trigger automation error:",
        error.response?.data || error.message
      );
      throw new Error(`Automation trigger error: ${error.message}`);
    }
  }

  // 9. TEST CONNEXION
  async testConnection() {
    try {
      const response = await this.client.get("/users/me");
      console.log("✅ ActiveCampaign connection successful");
      return true;
    } catch (error) {
      console.error("❌ ActiveCampaign connection failed:", error.message);
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
