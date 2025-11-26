"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { useCookieConsentSafe } from "@/contexts/CookieConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookieBanner() {
  const { needsRenewal, acceptAll, rejectNonEssential, openPreferences } = useCookieConsentSafe();
  const { t } = useLanguage();

  // Don't render if consent is not needed
  if (!needsRenewal) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <Card className="max-w-4xl mx-auto bg-surface border border-border shadow-xl">
        <Card.Header className="pb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍪</span>
            <Card.Title className="text-lg font-bold text-foreground">
              {t("cookies.banner.title")}
            </Card.Title>
          </div>
        </Card.Header>
        <Card.Content className="py-2">
          <p className="text-muted text-sm leading-relaxed">
            {t("cookies.banner.description")}
          </p>
          <Link
            href="/cookie-policy"
            className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1 mt-2"
          >
            {t("cookies.banner.moreInfo")} →
          </Link>
        </Card.Content>
        <Card.Footer className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="ghost"
            size="md"
            onPress={openPreferences}
            className="w-full sm:w-auto"
          >
            {t("cookies.banner.customize")}
          </Button>
          <Button
            variant="secondary"
            size="md"
            onPress={rejectNonEssential}
            className="w-full sm:w-auto"
          >
            {t("cookies.banner.rejectNonEssential")}
          </Button>
          <Button
            variant="primary"
            size="md"
            onPress={acceptAll}
            className="w-full sm:w-auto"
          >
            {t("cookies.banner.acceptAll")}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
