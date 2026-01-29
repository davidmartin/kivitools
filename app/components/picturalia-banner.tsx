"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function PicturaliaBanner() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50 p-8 md:p-12 shadow-2xl">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm">
            ✨ {t("picturaliaBanner.new")}
          </div>
          <h3 className="mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            {t("picturaliaBanner.title")}
          </h3>
          <p className="mb-8 text-lg text-blue-100/80 leading-relaxed">
            {t("picturaliaBanner.description")}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="https://picturalia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-indigo-900 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("picturaliaBanner.cta")}
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
