"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Card, Separator } from "@heroui/react";
import { use } from "react";
import { notFound } from "next/navigation";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const validSlugs: string[] = [];

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <article className="max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-12 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-accent transition-colors">
            {t("nav.title")}
          </Link>
          <span className="text-muted/50">/</span>
          <Link href="/blog" className="hover:text-accent transition-colors">
            {t("blog.title")}
          </Link>
          <span className="text-muted/50">/</span>
          <span className="text-foreground font-medium truncate">
            {t(`blog.posts.${slug}.title`)}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            {t(`blog.posts.${slug}.title`)}
          </h1>
          <div className="flex items-center gap-4 text-muted text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                {t(`blog.posts.${slug}.category`)}
              </span>
            </div>
            <span>·</span>
            <time dateTime="2025-11-16">
              {t(`blog.posts.${slug}.date`)}
            </time>
            <span>·</span>
            <span>
              {t(`blog.posts.${slug}.readTime`)} min read
            </span>
          </div>
        </header>

        {/* Share Buttons (Sticky on Desktop) */}
        <div className="flex gap-2 mb-12 border-y border-border/40 py-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareTitle
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-foreground transition-colors"
            title="Share on Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-foreground transition-colors"
            title="Share on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-foreground transition-colors"
            title="Share on LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
          </a>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg md:prose-xl max-w-none 
          text-foreground/90 
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
          prose-li:leading-relaxed prose-li:mb-2 prose-li:text-lg
          prose-strong:font-bold prose-strong:text-foreground
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-foreground/80 prose-blockquote:my-8
        ">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components if needed, e.g. for the button
              a: ({ node, ...props }) => {
                if (props.href?.includes('hashtag-generator')) {
                  return (
                    <div className="my-8 text-center">
                      <Link
                        href={props.href}
                        className="inline-block px-6 py-3 bg-foreground text-background font-bold rounded-lg hover:scale-105 transition-transform no-underline"
                      >
                        {props.children}
                      </Link>
                    </div>
                  );
                }
                return <a {...props} />;
              }
            }}
          >
            {t(`blog.posts.${slug}.content`)}
          </ReactMarkdown>
        </div>

        {/* Related Tool CTA */}
        <Card className="my-20 bg-gradient-to-br from-surface to-accent/5 border-accent/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Card.Content className="p-10 text-center relative z-10">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {t("blog.relatedTool.title")}
            </h3>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              {t("blog.relatedTool.description")}
            </p>
            <Link
              href={getRelatedTool(slug)}
              className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
            >
              {t("blog.relatedTool.button")}
              <span className="ml-2">→</span>
            </Link>
          </Card.Content>
        </Card>

        {/* Share Again */}
        <div className="text-center py-12 border-t border-border/50">
          <p className="text-lg text-muted mb-6 font-medium">{t("blog.shareAgain")}</p>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareTitle
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-surface hover:bg-blue-500/10 hover:text-blue-500 border border-border rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-surface hover:bg-blue-600/10 hover:text-blue-600 border border-border rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-surface hover:bg-blue-700/10 hover:text-blue-700 border border-border rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
