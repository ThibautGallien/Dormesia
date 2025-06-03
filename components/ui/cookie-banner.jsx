"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CookieIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CookieBanner({
  variant = "default",
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax";
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback();
  };

  const decline = () => {
    setIsOpen(false);
    document.cookie =
      "cookieConsent=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=Lax";
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback();
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("cookieConsent=")) {
        setIsOpen(false);
        setTimeout(() => {
          setHide(true);
        }, 700);
      }
    } catch (e) {
      console.log("Cookie banner error: ", e);
    }
  }, []);

  return variant === "small" ? (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <Card className="shadow-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <CookieIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  Nous utilisons des cookies pour améliorer votre expérience.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={close}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              onClick={accept}
              size="sm"
              className="flex-1 h-8 rounded-full"
            >
              Accepter
            </Button>
            <Button
              onClick={decline}
              variant="outline"
              size="sm"
              className="flex-1 h-8 rounded-full"
            >
              Refuser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div
      className={cn(
        "fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100",
        hide && "hidden"
      )}
    >
      <Card className="shadow-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CookieIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Gestion des cookies
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dormesia - Expert du sommeil
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={close}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-foreground">
              Nous utilisons des cookies pour vous garantir la meilleure
              expérience sur notre site web. Ces cookies nous aident à améliorer
              nos services et à personnaliser votre expérience.
            </p>
            <p className="text-xs text-muted-foreground">
              Pour plus d'informations sur notre utilisation des cookies,
              consultez notre{" "}
              <a
                href="/politique-confidentialite"
                className="text-primary hover:underline"
              >
                politique de confidentialité
              </a>
              .
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={accept} className="flex-1" size="sm">
              Accepter tous les cookies
            </Button>
            <Button
              onClick={decline}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              Refuser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
