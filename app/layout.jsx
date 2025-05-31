import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Dormesia | Expert du Sommeil",
  description:
    "Dormesia vous guide vers un sommeil de qualité avec des conseils d'experts, des astuces et des recommandations personnalisées.",
  keywords: "sommeil, dormir, insomnie, repos, bien-être, santé du sommeil",
  authors: [{ name: "Dormesia" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://dormesia.com",
    title: "Dormesia | Expert du Sommeil",
    description:
      "Dormesia vous guide vers un sommeil de qualité avec des conseils d'experts, des astuces et des recommandations personnalisées.",
    siteName: "Dormesia",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
