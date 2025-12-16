"use client";

import PlatformLogo from "@/app/components/platform-logo";
import { useLanguage } from "@/contexts/LanguageContext";
import AppwriteToolsList from "@/app/components/appwrite-tools-list";

export default function AIWritingToolsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full blur-[100px] animate-float-slow opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-violet-500/20 rounded-full blur-[120px] animate-float-slow opacity-40" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20 relative z-10">
          <div className="inline-flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-violet-500 blur-xl opacity-50 animate-pulse-glow rounded-full" />
              <div className="relative z-10 text-6xl">✍️</div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 animate-slide-up tracking-tight">
            {t("nav.aiWriting")} <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-violet-500">{t("nav.tools")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            {t("aiWriting.page.description")}
          </p>
        </div>

        {/* Tools Grid - From Appwrite */}
        <AppwriteToolsList 
          platform="ai-writing" 
          gradientFrom="indigo-500" 
          gradientTo="violet-500" 
        />
      </div>
    </div>
  );
}
