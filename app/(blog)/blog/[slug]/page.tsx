"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Button, Card, Separator } from "@heroui/react";
import { use } from "react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const validSlugs = [
  "como-escribir-guiones-virales-tiktok-2025",
  "mejores-hashtags-tiktok-2025",
  "caption-generator-instagram-guia-completa",
  "como-crear-hilos-virales-twitter",
  "herramientas-ia-redes-sociales-gratis",
];

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { t } = useLanguage();
  const { slug } = use(params);

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const getRelatedTool = (slug: string) => {
    if (slug.includes("tiktok-2025") || slug.includes("guiones-virales")) {
      return "/tiktok/script-writer";
    }
    if (slug.includes("hashtags-tiktok")) {
      return "/tiktok/hashtag-generator";
    }
    if (slug.includes("instagram")) {
      return "/instagram/caption-generator";
    }
    if (slug.includes("twitter")) {
      return "/twitter/thread-maker";
    }
    return "/";
  };

  const shareUrl = `https://kivitools.com/blog/${slug}`;
  const shareTitle = t(`blog.posts.${slug}.title`);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm text-muted mb-8">
        <Link href="/" className="hover:text-accent">
          {t("nav.title")}
        </Link>
        {" / "}
        <Link href="/blog" className="hover:text-accent">
          {t("blog.title")}
        </Link>
        {" / "}
        <span className="text-foreground">{t(`blog.posts.${slug}.title`)}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          {t(`blog.posts.${slug}.title`)}
        </h1>
        <div className="flex items-center gap-4 text-muted mb-6">
          <time dateTime="2025-11-16">{t(`blog.posts.${slug}.date`)}</time>
          <span>•</span>
          <span>{t(`blog.posts.${slug}.readTime`)} min</span>
          <span>•</span>
          <span className="text-accent font-semibold">
            {t(`blog.posts.${slug}.category`)}
          </span>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareTitle
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-surface hover:bg-accent-hover border border-border rounded-lg text-sm font-medium transition-colors"
          >
            🐦 Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-surface hover:bg-accent-hover border border-border rounded-lg text-sm font-medium transition-colors"
          >
            📘 Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-surface hover:bg-accent-hover border border-border rounded-lg text-sm font-medium transition-colors"
          >
            💼 LinkedIn
          </a>
        </div>
      </header>

      <Separator className="mb-12" />

      {/* Article Content */}
      <div className="prose prose-lg max-w-none text-foreground">
        <div
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: t(`blog.posts.${slug}.content`),
          }}
        />
      </div>

      {/* Related Tool CTA */}
      <Card className="my-12 bg-accent/5 border-accent/20">
        <Card.Content className="p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            {t("blog.relatedTool.title")}
          </h3>
          <p className="text-muted mb-6">{t("blog.relatedTool.description")}</p>
          <Link
            href={getRelatedTool(slug)}
            className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors"
          >
            {t("blog.relatedTool.button")} →
          </Link>
        </Card.Content>
      </Card>

      {/* Newsletter Signup */}
      <Card className="my-12 bg-surface">
        <Card.Content className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            {t("blog.newsletter.title")}
          </h3>
          <p className="text-muted mb-6">{t("blog.newsletter.description")}</p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder={t("blog.newsletter.placeholder")}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />
            <Button variant="primary">{t("blog.newsletter.button")}</Button>
          </div>
        </Card.Content>
      </Card>

      {/* Share Again */}
      <div className="text-center py-8">
        <p className="text-muted mb-4">{t("blog.shareAgain")}</p>
        <div className="flex justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareTitle
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 hover:bg-accent-hover rounded-lg text-sm font-medium transition-colors"
          >
            🐦 Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 hover:bg-accent-hover rounded-lg text-sm font-medium transition-colors"
          >
            📘 Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 hover:bg-accent-hover rounded-lg text-sm font-medium transition-colors"
          >
            💼 LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
