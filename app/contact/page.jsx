"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit contenir au moins 5 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      // TODO: Intégrer avec ActiveCampaign et système d'email
      // Pour le moment, simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      form.reset();

      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
      title: "Email",
      info: "contact@dormesia.com",
      subtitle: "Réponse sous 24-48h",
    },
  ];

  const faqs = [
    {
      question: "Combien de temps avant d'observer des améliorations?",
      answer:
        "La plupart des gens observent des améliorations dans les 2 à 3 semaines suivant la mise en place des recommandations, mais cela varie selon les individus.",
    },
    {
      question: "Vos conseils remplacent-ils une consultation médicale?",
      answer:
        "Non, nos conseils sont informatifs et complémentaires. Si vous souffrez de troubles du sommeil chroniques, consultez un professionnel de santé.",
    },
    {
      question: "Proposez-vous des consultations individuelles?",
      answer:
        "Pas pour le moment, mais nous travaillons à développer ce service. Inscrivez-vous à notre newsletter pour être informé des nouvelles offres.",
    },
    {
      question: "Comment savoir quel oreiller ou matelas me convient?",
      answer:
        "Notre quiz de sommeil vous aide à identifier vos besoins spécifiques et vous propose des recommandations personnalisées.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6585823/pexels-photo-6585823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Vous avez des questions sur votre sommeil? Notre équipe d'experts
              est là pour vous aider.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
                Besoin d'Aide ou d'Informations?
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Notre équipe d'experts en sommeil est disponible pour répondre à
                toutes vos questions et vous accompagner vers un sommeil de
                meilleure qualité.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full flex-shrink-0">
                    <div className="text-indigo-600 dark:text-indigo-400">
                      {contact.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{contact.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {contact.info}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Votre adresse email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Le sujet de votre message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-playfair font-bold text-indigo-900 dark:text-indigo-300 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Vous avez une question? Consultez nos réponses aux questions les
            plus courantes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-lg"
            >
              <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
