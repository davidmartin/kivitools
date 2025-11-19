import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post no encontrado",
        };
    }

    return {
        title: `${post.title} | KiviTools`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 py-24 relative z-10">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Inicio
                    </Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-foreground transition-colors">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
                </div>

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-6 uppercase tracking-wider">
                        {post.platform}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime} min de lectura</span>
                        <span>•</span>
                        <span>Por {post.author}</span>
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
                                ¿Te gustó este artículo?
                            </h3>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Pon en práctica lo que aprendiste ahora mismo con nuestra herramienta gratuita.
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
            </div>
        </div>
    );
}
