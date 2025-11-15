"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

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
          <p className="text-center text-sm text-muted">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
