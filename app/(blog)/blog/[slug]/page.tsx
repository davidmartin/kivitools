import { getPostBySlug, getAllPosts, getRelatedPosts, BlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Platform colors for badges
const platformColors: Record<string, string> = {
    tiktok: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    instagram: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    twitter: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    youtube: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    linkedin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    twitch: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    reddit: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    spotify: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    general: "bg-accent/10 text-accent",
};

// Generate JSON-LD schema for the blog post
function generateBlogPostingJsonLd(post: BlogPost, canonicalUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        author: {
            "@type": "Organization",
            name: "KiviTools",
            url: "https://kivitools.com",
        },
        publisher: {
            "@type": "Organization",
            name: "KiviTools",
            logo: {
                "@type": "ImageObject",
                url: "https://kivitools.com/logo.png",
            },
        },
        datePublished: post.date,
        dateModified: post.dateModified || post.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },
        image: post.coverImage || `https://kivitools.com/blog/${post.platform}.png`,
        inLanguage: post.language,
        keywords: post.keywords?.join(", ") || post.tags.join(", "),
    };
}

// T009: Enhanced generateMetadata with metaTitle/metaDescription overrides
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post no encontrado",
        };
    }

    const canonicalUrl = `https://kivitools.com/blog/${post.slug}`;
    const title = post.metaTitle || `${post.title} | KiviTools`;
    const description = post.metaDescription || post.excerpt;

    // T007: Build hreflang alternates for bilingual support
    const alternates: Metadata["alternates"] = {
        canonical: canonicalUrl,
        languages: {},
    };

    if (post.alternateSlug) {
        const alternateLang = post.language === "es" ? "en" : "es";
        alternates.languages = {
            [post.language]: canonicalUrl,
            [alternateLang]: `https://kivitools.com/blog/${post.alternateSlug}`,
        };
    }

    return {
        title,
        description,
        keywords: post.keywords?.join(", "),
        alternates,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: "article",
            url: canonicalUrl,
            publishedTime: post.date,
            modifiedTime: post.dateModified || post.date,
            authors: [post.author],
            locale: post.language === "es" ? "es_ES" : "en_US",
            images: [
                {
                    url: post.coverImage || `https://kivitools.com/blog/${post.platform}.png`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: [post.coverImage || `https://kivitools.com/blog/${post.platform}.png`],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// T008: RelatedPostsGrid component
function RelatedPostsGrid({ posts, language }: { posts: BlogPost[]; language: "es" | "en" }) {
    if (posts.length === 0) return null;

    const title = language === "es" ? "Artículos Relacionados" : "Related Articles";

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group bg-surface border border-border/50 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                    >
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${platformColors[post.platform] || platformColors.general}`}>
                                    {post.platform}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {post.readTime} min
                                </span>
                            </div>
                            <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.excerpt}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const canonicalUrl = `https://kivitools.com/blog/${post.slug}`;

    // T006: Generate JSON-LD schema
    const jsonLd = generateBlogPostingJsonLd(post, canonicalUrl);

    // T008: Get related posts for the grid
    const relatedPosts = getRelatedPosts(post.slug, post.platform, post.language, 3);

    // Localized strings
    const strings = {
        home: post.language === "es" ? "Inicio" : "Home",
        blog: "Blog",
        readTime: post.language === "es" ? "min de lectura" : "min read",
        by: post.language === "es" ? "Por" : "By",
        likedArticle: post.language === "es" ? "¿Te gustó este artículo?" : "Did you enjoy this article?",
        tryTool: post.language === "es"
            ? "Pon en práctica lo que aprendiste ahora mismo con nuestra herramienta gratuita."
            : "Put what you learned into practice right now with our free tool.",
    };

    return (
        <>
            {/* T006: JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 py-24 relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">
                            {strings.home}
                        </Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-foreground transition-colors">
                            {strings.blog}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
                    </div>

                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 uppercase tracking-wider ${platformColors[post.platform] || platformColors.general}`}>
                            {post.platform}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm flex-wrap">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime} {strings.readTime}</span>
                            <span>•</span>
                            <span>{strings.by} {post.author}</span>
                        </div>
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-invert max-w-none mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Related Tool CTA */}
                    {post.relatedTool && (
                        <div className="bg-surface border border-border/50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">
                                    {strings.likedArticle}
                                </h3>
                                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                    {strings.tryTool}
                                </p>
                                <Link
                                    href={post.relatedTool.link}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-foreground/20"
                                >
                                    {post.relatedTool.cta}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* T008: Related Posts Grid */}
                    <RelatedPostsGrid posts={relatedPosts} language={post.language} />
                </div>
            </div>
        </>
    );
}
