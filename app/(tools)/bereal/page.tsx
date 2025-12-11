"use client";

import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomToolsList from "@/app/components/custom-tools-list";
import AppwriteToolsList from "@/app/components/appwrite-tools-list";

export default function BerealToolsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gray-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-black/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-gray-800 to-gray-900 blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <PlatformLogo platform="bereal" size="xl" className="relative z-10" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.bereal")} <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-800 to-gray-900">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("bereal.page.description")}
          </p>
        </div>

        {/* Tools Grid - From Appwrite */}
        <AppwriteToolsList 
          platform="bereal" 
          gradientFrom="gray-800" 
          gradientTo="gray-900" 
        />

        {/* Custom User Tools */}
        <CustomToolsList platform="bereal" />
      </div>
    </div>
  );
}
