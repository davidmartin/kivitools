"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import Link from "next/link";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformLogo from "./platform-logo";
import type { Platform } from "@/types";

interface Tool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    slug: string;
    language: string;
    status: "pending" | "approved" | "rejected";
}

export default function LatestTools() {
    const { t, language } = useLanguage();
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestTools();
    }, [language]);

    const fetchLatestTools = async () => {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                [
                    Query.equal("status", "approved"),
                    Query.equal("language", language),
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
                                        <div className="flex items-center gap-3 mb-4">
                                            <PlatformLogo
                                                platform={tool.platform as Platform}
                                                size="sm"
                                            />
                                            <span className="text-sm font-medium text-muted capitalize">
                                                {tool.platform}
                                            </span>
                                            <span className="ml-auto px-2 py-0.5 bg-accent/20 text-accent rounded text-xs font-medium">
                                                {t("home.latestTools.new")}
                                            </span>
                                        </div>
                                        <Card.Title className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {tool.name}
                                        </Card.Title>
                                    </div>
                                </Card.Header>
                                <Card.Content>
                                    <Card.Description className="text-muted text-base line-clamp-2">
                                        {tool.description}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Link>
                    ))}
                </div>
                
                <div className="text-center mt-10">
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-foreground rounded-full font-medium transition-all hover:scale-105"
                    >
                        {t("home.latestTools.viewAll")}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
