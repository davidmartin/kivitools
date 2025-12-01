"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsentSafe } from "@/contexts/CookieConsentContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { openPreferences } = useCookieConsentSafe();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">
              {t("nav.title")}
            </h3>
            <p className="text-sm text-muted">
              {t("footer.aboutText")}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.tools")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tiktok/script-writer"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.tiktokScript")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.instagramCaption")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.twitterThread")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.cookiePolicy")}
                </Link>
              </li>
              <li>
                <button
                  onClick={openPreferences}
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.cookieSettings")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact-us"
                  className="text-sm text-muted hover:text-accent transition-colors"
                >
                  {t("footer.contactUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          {/* Powered by DeepSeek Badge */}
          <div className="flex justify-center mb-4">
            <Link
              href="/about/technology"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                viewBox="0 0 122 122"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="122" height="122" rx="16" fill="currentColor" fillOpacity="0.1"/>
                <path d="M61 25C41.118 25 25 41.118 25 61s16.118 36 36 36 36-16.118 36-36S80.882 25 61 25zm0 8c15.464 0 28 12.536 28 28S76.464 89 61 89 33 76.464 33 61s12.536-28 28-28z" fill="currentColor"/>
                <path d="M61 45c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zm0 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z" fill="currentColor"/>
                <circle cx="61" cy="61" r="4" fill="currentColor"/>
              </svg>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("footer.poweredBy")} {t("footer.deepseek")}
              </span>
            </Link>
          </div>
          <p className="text-center text-sm text-muted">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
