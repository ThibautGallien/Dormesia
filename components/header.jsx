"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon, SunIcon, MenuIcon, XIcon, SparklesIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À Propos", path: "/a-propos" },
    { name: "Articles", path: "/articles" },
    { name: "Quiz Sommeil", path: "/quiz", isSpecial: true },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MoonIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-playfair font-bold text-indigo-900 dark:text-indigo-300">
                Dormesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 relative ${
                  pathname === link.path
                    ? "text-indigo-700 dark:text-indigo-400"
                    : "text-gray-700 dark:text-gray-300"
                } ${
                  link.isSpecial
                    ? "px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 hover:text-white dark:hover:text-white font-semibold shadow-md"
                    : ""
                }`}
              >
                {link.name}
                {link.isSpecial && (
                  <SparklesIcon className="inline-block w-4 h-4 ml-1" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* CTA Button Desktop */}
            <Link
              href="/quiz"
              className="hidden md:inline-flex px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-sm shadow-md hover:shadow-lg"
            >
              Quiz Gratuit
              <SparklesIcon className="w-4 h-4 ml-1" />
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-indigo-100 dark:hover:bg-indigo-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col space-y-4 md:hidden py-4 border-t border-gray-200/20 dark:border-gray-700/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-3 py-2 font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md ${
                  pathname === link.path
                    ? "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950"
                    : "text-gray-700 dark:text-gray-300"
                } ${
                  link.isSpecial
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center">
                  {link.name}
                  {link.isSpecial && <SparklesIcon className="w-4 h-4 ml-2" />}
                </span>
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-2 border-t border-gray-200/20 dark:border-gray-700/20">
              <Link
                href="/quiz"
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Commencer le Quiz Gratuit
                <SparklesIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
