"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface PicturaliaProTipProps {
  platform: "instagram" | "tiktok" | "pinterest" | "default";
}

export default function PicturaliaProTip({ platform }: PicturaliaProTipProps) {
  const { t } = useLanguage();

  const getLinkText = () => {
    switch (platform) {
      case "instagram":
        return t("proTip.instagram.link");
      case "tiktok":
        return t("proTip.tiktok.link");
      case "pinterest":
        return t("proTip.pinterest.link");
      default:
        return t("proTip.default.link");
    }
  };

  return (
    <div className="my-12 relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-2 text-purple-400 font-bold uppercase tracking-wider text-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            {t("proTip.title")}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {t(`proTip.${platform}.heading`)}
          </h3>
          <p className="text-muted md:max-w-xl">
            {t(`proTip.${platform}.description`)}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <a 
            href="https://picturalia.com" 
            className="group inline-flex items-center justify-center px-6 py-3 bg-white text-purple-900 font-bold rounded-xl transition-all hover:bg-purple-50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span>{getLinkText()}</span>
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-3xl -z-10" />
    </div>
  );
}
