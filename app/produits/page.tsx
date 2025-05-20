import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, BadgePercent, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Produits | Dormesia - Expert du Sommeil',
  description: 'Découvrez notre sélection de produits pour améliorer votre sommeil - matelas, oreillers, accessoires et plus encore.',
};

export default function ProductsPage() {
  const categories = [
    { id: 'matelas', name: 'Matelas' },
    { id: 'oreillers', name: 'Oreillers' },
    { id: 'literie', name: 'Literie' },
    { id: 'accessoires', name: 'Accessoires' },
  ];
  
  const products = [
    {
      id: 1,
      name: 'Matelas Ergonomique Premium',
      category: 'matelas',
      price: 899,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Matelas à mémoire de forme offrant un soutien optimal et une régulation thermique pour un sommeil profond.',
      badge: 'Populaire'
    },
    {
      id: 2,
      name: 'Oreiller Cervical Anatomique',
      category: 'oreillers',
      price: 89,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/6316066/pexels-photo-6316066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Oreiller ergonomique conçu pour soulager les tensions cervicales et favoriser un alignement optimal.',
      badge: 'Recommandé'
    },
    {
      id: 3,
      name: 'Couette Thermorégulatrice',
      category: 'literie',
      price: 149,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/6186511/pexels-photo-6186511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Couette innovante qui s\'adapte à la température corporelle pour un confort optimal toute la nuit.',
      badge: 'Nouveau'
    },
    {
      id: 4,
      name: 'Masque de Sommeil en Soie',
      category: 'accessoires',
      price: 29,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/6634680/pexels-photo-6634680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Masque en soie naturelle qui bloque 100% de la lumière pour un sommeil profond et réparateur.',
      badge: 'Populaire'
    },
    {
      id: 5,
      name: 'Diffuseur d\'Huiles Essentielles',
      category: 'accessoires',
      price: 59,
      rating: 4.4,
      image: 'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Diffuseur silencieux avec lumière tamisée et arrêt automatique pour créer une ambiance propice au sommeil.',
      badge: ''
    },
    {
      id: 6,
      name: 'Draps en Coton Biologique',
      category: 'literie',
      price: 79,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Ensemble de draps en coton biologique respirant et doux pour une sensation de confort optimal.',
      badge: 'Éco-responsable'
    },
    {
      id: 7,
      name: 'Bouchons d\'Oreilles Haute Fidélité',
      category: 'accessoires',
      price: 19,
      rating: 4.3,
      image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Bouchons d\'oreilles qui réduisent le bruit ambiant tout en préservant la clarté des sons.',
      badge: ''
    },
    {
      id: 8,
      name: 'Matelas Hybride Ressorts Ensachés',
      category: 'matelas',
      price: 1199,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/6585830/pexels-photo-6585830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Matelas premium combinant ressorts ensachés et mousse à mémoire de forme pour un soutien incomparable.',
      badge: 'Premium'
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6514211/pexels-photo-6514211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Produits Pour un Sommeil Optimal
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Notre sélection rigoureuse de produits testés et approuvés par nos experts du sommeil.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <Tabs defaultValue="tous" className="w-full">
            <TabsList className="mb-8 flex flex-wrap">
              <TabsTrigger value="tous">Tous les produits</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="tous" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </TabsContent>
            
            {categories.map((category) => (
              <TabsContent 
                key={category.id} 
                value={category.id}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {products
                  .filter(product => product.category === category.id)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-indigo-50 dark:bg-indigo-950/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
              Pourquoi Nos Produits?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Tous nos produits sont rigoureusement sélectionnés selon des critères stricts de qualité et d'efficacité.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                    <path d="M9 12L2 12"></path>
                    <path d="M13 6L2 6"></path>
                    <path d="M13 18L2 18"></path>
                    <path d="M20 6L17 9L14 6"></path>
                    <path d="M14 18L17 15L20 18"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sélection Rigoureuse</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Chaque produit est évalué et sélectionné par notre équipe d'experts en sommeil selon des critères stricts.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                    <path d="M20 6H4V12H20V6Z"></path>
                    <path d="M12 12v6"></path>
                    <path d="M8 18h8"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Testés et Approuvés</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Tous nos produits sont testés pendant plusieurs semaines par notre panel de testeurs pour garantir leur qualité.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                    <path d="M6 14c.25 .66 1 2 3 2s5-1.25 5-3c0-1.25-1-2-3-2s-5 .75-5 2.5"></path>
                    <path d="M9 6.75c2 0 4 .25 4 2s-2 2-4 2s-4-.25-4-2s2-2 4-2"></path>
                    <path d="M12 16c2 .67 7 .33 7-2.5q0-4.5-7-2.5"></path>
                    <path d="M18 9.75c1 0 2 .25 2 1.25s-1 1.25-2 1.25-2-.25-2-1.25s1-1.25 2-1.25"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Recommandations Personnalisées</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nos quiz et évaluations vous aident à identifier les produits qui correspondent le mieux à vos besoins spécifiques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-indigo-900 text-white rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Besoin de Conseils Personnalisés?
              </h2>
              <p className="text-lg text-indigo-200 mb-6">
                Faites notre quiz sommeil pour recevoir des recommandations de produits adaptés à votre profil de dormeur.
              </p>
              <div>
                <Button size="lg" asChild className="bg-white text-indigo-900 hover:bg-indigo-100">
                  <Link href="/quiz">Faire le Quiz Sommeil</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <Image 
                src="https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Produits pour le sommeil" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    image: string;
    description: string;
    badge: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <div className="relative h-48">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill
            className="object-cover"
          />
        </div>
        {product.badge && (
          <Badge className="absolute top-3 right-3 bg-indigo-600">{product.badge}</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">{product.price} €</p>
          <Button size="sm" variant="outline" className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Acheter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}