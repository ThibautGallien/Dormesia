import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold">Dormesia</h3>
            <p className="text-indigo-200">
              Votre expert du sommeil pour améliorer votre qualité de vie
              naturellement.
            </p>
            <p className="text-sm text-indigo-300">
              Conseils, formations et recommandations personnalisées.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Quiz Sommeil Gratuit
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/quiz"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Évaluation Personnalisée
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Conseils d'Experts
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Support Personnalisé
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@dormesia.com"
                  className="text-indigo-200 hover:text-white transition-colors"
                >
                  Newsletter Sommeil
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium">Commencer</h4>
            <p className="text-indigo-200">
              Découvrez votre profil de dormeur et recevez des conseils sur
              mesure.
            </p>
            <div className="space-y-2">
              <Link
                href="/quiz"
                className="inline-block w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors text-center font-medium"
              >
                Quiz Gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-block w-full px-4 py-2 bg-indigo-800 hover:bg-indigo-700 rounded-md transition-colors text-center"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-indigo-900">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 text-sm">
              &copy; {new Date().getFullYear()} Dormesia. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-indigo-300 hover:text-white text-sm transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-indigo-300 hover:text-white text-sm transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/contact"
                className="text-indigo-300 hover:text-white text-sm transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
