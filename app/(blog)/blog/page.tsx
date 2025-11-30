"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { getPostsByLanguage } from "@/lib/blog-data";

export default function BlogPage() {
  const { t, language } = useLanguage();
  // Blog only supports es/en - default to es for other languages
  const blogLanguage = language === "en" ? "en" : "es";
  const posts = getPostsByLanguage(blogLanguage);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6 border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t("blog.badge")}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            {t("blog.description")}
          </p>
        </div>

        {/* Content Area */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative bg-surface border border-border/50 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium uppercase tracking-wider">
                      {post.platform}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime} min {t("blog.readTime")}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-medium text-foreground mt-auto">
                    {t("blog.readMore")}
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-surface rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-border/50 transform rotate-3 transition-transform hover:rotate-0 duration-300">
              <span className="text-4xl">✍️</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t("blog.empty.title")}
            </h2>
            <p className="text-xl text-muted max-w-md mb-10">
              {t("blog.empty.description")}
            </p>
            <Link
              href="/#tools"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-foreground/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("blog.cta.button")}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
