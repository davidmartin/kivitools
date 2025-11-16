"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Card } from "@heroui/react";

interface BlogPost {
  slug: string;
  platform: "tiktok" | "instagram" | "twitter" | "general";
  readTime: number;
}

export default function BlogPage() {
  const { t } = useLanguage();

  const posts: BlogPost[] = [
    {
      slug: "como-escribir-guiones-virales-tiktok-2025",
      platform: "tiktok",
      readTime: 8,
    },
    {
      slug: "mejores-hashtags-tiktok-2025",
      platform: "tiktok",
      readTime: 10,
    },
    {
      slug: "caption-generator-instagram-guia-completa",
      platform: "instagram",
      readTime: 7,
    },
    {
      slug: "como-crear-hilos-virales-twitter",
      platform: "twitter",
      readTime: 6,
    },
    {
      slug: "herramientas-ia-redes-sociales-gratis",
      platform: "general",
      readTime: 12,
    },
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
      case "instagram":
        return "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400";
      case "twitter":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
      default:
        return "bg-surface text-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
          📚 {t("blog.badge")}
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-4">
          {t("blog.title")}
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {t("blog.description")}
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <Card.Content className="p-6">
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPlatformColor(
                      post.platform
                    )}`}
                  >
                    {t(`blog.platform.${post.platform}`)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  {t(`blog.posts.${post.slug}.title`)}
                </h2>
                <p className="text-muted mb-4 line-clamp-3">
                  {t(`blog.posts.${post.slug}.excerpt`)}
                </p>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{post.readTime} min {t("blog.readTime")}</span>
                  <span className="text-accent hover:underline">
                    {t("blog.readMore")} →
                  </span>
                </div>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-surface rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {t("blog.cta.title")}
        </h2>
        <p className="text-muted mb-6">{t("blog.cta.description")}</p>
        <Link
          href="/#tools"
          className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors"
        >
          {t("blog.cta.button")}
        </Link>
      </div>
    </div>
  );
}
