import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'À Propos | Dormesia - Expert du Sommeil',
  description: 'Découvrez l\'histoire et la mission de Dormesia, votre partenaire pour un sommeil de qualité et une vie équilibrée.',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Marie Laurent",
      role: "Spécialiste du Sommeil",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Médecin spécialisée en troubles du sommeil, 15 ans d'expérience clinique"
    },
    {
      name: "Pierre Dubois",
      role: "Nutritionniste",
      image: "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Expert en nutrition et son impact sur le sommeil et le rythme circadien"
    },
    {
      name: "Sophie Martin",
      role: "Psychologue",
      image: "https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Spécialiste des thérapies comportementales pour améliorer la qualité du sommeil"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7640927/pexels-photo-7640927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Notre Mission: Améliorer Votre Sommeil
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Nous sommes une équipe passionnée d'experts dédiés à vous aider à retrouver un sommeil réparateur et à améliorer votre qualité de vie.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-xl overflow-hidden h-[400px]">
            <Image 
              src="https://images.pexels.com/photos/6551144/pexels-photo-6551144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Notre histoire" 
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300">
              Notre Histoire
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Dormesia est né d'une observation simple : malgré l'importance fondamentale du sommeil dans notre vie, beaucoup d'entre nous souffrent d'un sommeil de mauvaise qualité sans savoir comment y remédier.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Fondée en 2023 par une équipe de spécialistes du sommeil, nutritionnistes et psychologues, Dormesia a pour mission de démocratiser l'accès à l'information scientifique sur le sommeil et proposer des solutions concrètes et personnalisées.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Notre approche holistique combine les dernières recherches scientifiques avec des méthodes traditionnelles éprouvées pour vous offrir des conseils adaptés à votre profil unique.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-indigo-50 dark:bg-indigo-950/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Les principes qui guident notre approche et nos recommandations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">Rigueur Scientifique</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Toutes nos recommandations sont basées sur des études scientifiques récentes et validées par notre comité d'experts.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">Approche Personnalisée</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nous reconnaissons que chaque personne est unique, avec des besoins spécifiques qui méritent des solutions adaptées.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-400">Accessibilité</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Nous nous efforçons de rendre l'information sur le sommeil accessible à tous, dans un langage clair et avec des solutions pratiques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
            Notre Équipe d'Experts
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Des professionnels passionnés qui contribuent à notre mission d'améliorer votre sommeil.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-64">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-3">{member.role}</p>
                <p className="text-gray-700 dark:text-gray-300">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            Prêt à Améliorer Votre Sommeil?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Commencez dès aujourd'hui votre voyage vers un sommeil de meilleure qualité et une vie plus équilibrée.
          </p>
          <Button size="lg" asChild>
            <a href="/quiz" className="flex items-center">
              Faites Notre Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}