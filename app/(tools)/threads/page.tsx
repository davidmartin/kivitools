"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "@/app/components/platform-logo";

export default function ThreadsToolsPage() {
  const { t } = useLanguage();

  const tools = [
    {
      title: t("threadsPost.title"),
      description: t("threadsPost.description"),
      icon: "💬",
      href: "/threads/post-generator",
    },
    {
      title: t("threadsBio.title"),
      description: t("threadsBio.description"),
      icon: "✨",
      href: "/threads/bio-generator",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 rounded-full text-sm font-semibold mb-4">
            <PlatformLogo platform="threads" size={20} />
            Threads
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            {t("threads.page.title")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {t("threads.page.description")}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-surface border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 group"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-muted">{tool.description}</p>
            </Link>
          ))}
        </div>

        {/* Platform Info Section */}
        <div className="bg-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("threads.info.title")}
          </h2>
          <div className="text-muted whitespace-pre-line">
            {t("threads.info.description")}
          </div>
        </div>
      </div>
    </div>
  );
}
