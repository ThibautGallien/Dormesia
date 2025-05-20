import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold">Dormesia</h3>
            <p className="text-indigo-200">
              Votre guide vers un sommeil de qualité et un mode de vie équilibré.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-indigo-200 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-indigo-200 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-indigo-200 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-indigo-200 hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz" className="text-indigo-200 hover:text-white transition-colors">
                  Quiz Sommeil
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-indigo-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/glossaire" className="text-indigo-200 hover:text-white transition-colors">
                  Glossaire
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Contact</h4>
            <p className="text-indigo-200">
              Vous avez des questions? N'hésitez pas à nous contacter.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-indigo-900 text-center text-indigo-300">
          <p>&copy; {new Date().getFullYear()} Dormesia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;