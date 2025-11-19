"use client";

import { useEffect, useState } from "react";
import { Card, Chip } from "@heroui/react";
import Link from "next/link";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    slug: string;
    status: "pending" | "approved" | "rejected";
}

export default function LatestTools() {
    const { t } = useLanguage();
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestTools();
    }, []);

    const fetchLatestTools = async () => {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                [
                    Query.equal("status", "approved"),
                    Query.orderDesc("$createdAt"),
                    Query.limit(6)
                ]
            );
            setTools(response.documents as unknown as Tool[]);
        } catch (error) {
            console.error("Failed to fetch latest tools", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="tools" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            {t("home.latestTools.title")}
                        </h2>
                        <p className="text-xl text-muted max-w-2xl mx-auto">
                            {t("home.latestTools.description")}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="glass-card h-48 border-white/10 bg-white/5 animate-pulse">
                                <Card.Content />
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (tools.length === 0) return null;

    return (
        <section id="tools" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {t("home.latestTools.title")}
                    </h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        {t("home.latestTools.description")}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <Link
                            key={tool.$id}
                            href={`/${tool.platform}/${tool.slug || tool.$id}`}
                            className="group block h-full"
                        >
                            <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <Card.Header>
                                    <div className="w-full">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold backdrop-blur-md border border-primary/20 capitalize">
                                                {tool.platform}
                                            </div>
                                        </div>
                                        <Card.Title className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {tool.name}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                                <Card.Content>
                                    <Card.Description className="text-muted text-base line-clamp-3">
                                        {tool.description}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
