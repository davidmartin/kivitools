"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "@/app/components/platform-logo";

export default function FacebookPage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("facebookPost.title"),
      description: t("facebookPost.description"),
      icon: "📝",
      href: "/facebook/post-generator",
    },
    {
      title: t("facebookPageBio.title"),
      description: t("facebookPageBio.description"),
      icon: "📄",
      href: "/facebook/page-bio",
    },
    {
      title: t("facebookAdCopy.title"),
      description: t("facebookAdCopy.description"),
      icon: "📣",
      href: "/facebook/ad-copy",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <PlatformLogo platform="facebook" size="xl" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("nav.facebook")} <span className="text-blue-500">{t("nav.tools")}</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("facebook.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block bg-surface rounded-2xl p-6 border border-border hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted">{tool.description}</p>
            </Link>
          ))}
        </div>

        {/* Platform Info */}
        <div className="bg-surface rounded-2xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("facebook.info.title")}
          </h2>
          <p className="text-muted whitespace-pre-line">
            {t("facebook.info.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
