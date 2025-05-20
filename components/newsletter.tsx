"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      
      toast({
        title: "Inscription réussie!",
        description: "Vous recevrez désormais nos conseils pour un meilleur sommeil.",
      });
    }, 1000);
  };

  return (
    <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-8 md:p-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
          Recevez Nos Conseils Sommeil
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Inscrivez-vous à notre newsletter pour recevoir chaque semaine des conseils, astuces et études pour améliorer votre sommeil.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </form>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Nous respectons votre vie privée. Désabonnez-vous à tout moment.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;