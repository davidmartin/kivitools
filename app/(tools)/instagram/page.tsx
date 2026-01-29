"use client";

import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomToolsList from "@/app/components/custom-tools-list";
import AppwriteToolsList from "@/app/components/appwrite-tools-list";
import PicturaliaProTip from "@/app/components/picturalia-pro-tip";

export default function InstagramToolsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-orange-500/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-orange-500 blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <PlatformLogo platform="instagram" size="xl" className="relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.instagram")} <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-500">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("instagram.page.description")}
          </p>
        </div>

        {/* Tools Grid - From Appwrite */}
        <AppwriteToolsList
          platform="instagram"
          gradientFrom="pink-500"
          gradientTo="orange-500"
        />

        {/* SEO Cross-Promotion */}
        <PicturaliaProTip platform="instagram" />

        {/* Custom User Tools */}
        <CustomToolsList platform="instagram" />
      </div>
    </div>
  );
}
