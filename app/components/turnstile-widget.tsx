"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "@/contexts/LanguageContext";

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
}

export default function TurnstileWidget({
  onSuccess,
  onError,
}: TurnstileWidgetProps) {
  const { language } = useLanguage();

  return (
    <div className="flex justify-center my-4">
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
        onSuccess={onSuccess}
        onError={onError}
        options={{
          theme: "light",
          size: "normal",
          language: language === "es" ? "es" : "en",
        }}
      />
    </div>
  );
}
