"use client";

import { Button, Card, Switch, Label } from "@heroui/react";
import { useCookieConsentSafe } from "@/contexts/CookieConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { COOKIE_CATEGORIES } from "@/types/cookie-consent";

export default function CookiePreferencesModal() {
  const {
    preferences,
    isPreferencesOpen,
    closePreferences,
    updatePreferences,
  } = useCookieConsentSafe();
  const { t } = useLanguage();

  // Local state for toggles
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [advertisingEnabled, setAdvertisingEnabled] = useState(false);

  // Sync local state with preferences when modal opens
  useEffect(() => {
    if (isPreferencesOpen && preferences) {
      setAnalyticsEnabled(preferences.analytics);
      setAdvertisingEnabled(preferences.advertising);
    }
  }, [isPreferencesOpen, preferences]);

  // Handle save
  const handleSave = () => {
    updatePreferences({
      analytics: analyticsEnabled,
      advertising: advertisingEnabled,
    });
    closePreferences();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to saved preferences
    if (preferences) {
      setAnalyticsEnabled(preferences.analytics);
      setAdvertisingEnabled(preferences.advertising);
    }
    closePreferences();
  };

  // Don't render if not open
  if (!isPreferencesOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <Card className="relative max-w-lg w-full bg-surface border border-border shadow-2xl animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto">
        <Card.Header>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <Card.Title className="text-xl font-bold text-foreground">
              {t("cookies.preferences.title")}
            </Card.Title>
          </div>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* Essential Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {t("cookies.preferences.essential.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("cookies.preferences.essential.description")}
                </p>
              </div>
              <Switch isSelected isDisabled aria-label={t("cookies.preferences.essential.title")}>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
            <div className="text-xs text-muted bg-surface-secondary rounded-lg p-2">
              {COOKIE_CATEGORIES[0].cookies.map((cookie) => (
                <span key={cookie.name} className="mr-2">
                  • {cookie.name}
                </span>
              ))}
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {t("cookies.preferences.analytics.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("cookies.preferences.analytics.description")}
                </p>
              </div>
              <Switch
                isSelected={analyticsEnabled}
                onChange={setAnalyticsEnabled}
                aria-label={t("cookies.preferences.analytics.title")}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
            <div className="text-xs text-muted bg-surface-secondary rounded-lg p-2">
              {COOKIE_CATEGORIES[1].cookies.map((cookie) => (
                <span key={cookie.name} className="mr-2">
                  • {cookie.name}
                </span>
              ))}
            </div>
          </div>

          {/* Advertising Cookies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {t("cookies.preferences.advertising.title")}
                </h3>
                <p className="text-sm text-muted">
                  {t("cookies.preferences.advertising.description")}
                </p>
              </div>
              <Switch
                isSelected={advertisingEnabled}
                onChange={setAdvertisingEnabled}
                aria-label={t("cookies.preferences.advertising.title")}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
            <div className="text-xs text-muted bg-surface-secondary rounded-lg p-2">
              {COOKIE_CATEGORIES[2].cookies.map((cookie) => (
                <span key={cookie.name} className="mr-2">
                  • {cookie.name}
                </span>
              ))}
            </div>
          </div>
        </Card.Content>

        <Card.Footer className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="ghost" size="md" onPress={handleCancel}>
            {t("cookies.preferences.cancel")}
          </Button>
          <Button variant="primary" size="md" onPress={handleSave}>
            {t("cookies.preferences.save")}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
