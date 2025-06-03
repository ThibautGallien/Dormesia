export const metadata = {
  title: "Mentions légales - Dormesia",
  description: "Mentions légales et informations légales de Dormesia.",
};

export default function MentionsLegales() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-8">
          Mentions légales
        </h1>

        <div className="prose prose-lg max-w-none">
          <h2>Informations légales</h2>

          <h3>Éditeur du site</h3>
          <p>
            <strong>Dormesia</strong>
            <br />
            Société de conseil en sommeil et bien-être
            <br />
            SIRET : [À compléter]
            <br />
            Adresse : [À compléter]
            <br />
            Téléphone : [À compléter]
            <br />
            Email : contact@dormesia.com
          </p>

          <h3>Directeur de la publication</h3>
          <p>[Nom du directeur de publication]</p>

          <h3>Hébergement</h3>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723
            <br />
            États-Unis
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et
            internationale sur le droit d'auteur et la propriété intellectuelle.
            Tous les droits de reproduction sont réservés, y compris pour les
            documents téléchargeables et les représentations iconographiques et
            photographiques.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Conformément à la loi « Informatique et libertés » du 6 janvier 1978
            modifiée et au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification, de
            suppression et d'opposition au traitement de vos données
            personnelles.
          </p>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à l'adresse :
            privacy@dormesia.com
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations contenues sur ce site sont données à titre
            indicatif et ne sauraient engager la responsabilité de Dormesia. Les
            conseils en matière de sommeil ne remplacent pas l'avis d'un
            professionnel de santé.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur
            et réaliser des statistiques de visite. Vous pouvez paramétrer
            l'utilisation des cookies dans votre navigateur ou via notre bandeau
            de gestion des cookies.
          </p>

          <h2>Liens externes</h2>
          <p>
            Ce site peut contenir des liens vers d'autres sites. Dormesia n'est
            pas responsable du contenu de ces sites externes.
          </p>

          <h2>Modification des mentions légales</h2>
          <p>
            Dormesia se réserve le droit de modifier les présentes mentions
            légales à tout moment. Il est conseillé de les consulter
            régulièrement.
          </p>

          <p className="text-sm text-gray-500 mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  );
}
