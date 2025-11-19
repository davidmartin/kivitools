"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import Link from "next/link";
import { Card } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomTool {
    $id: string;
    name: string;
    description: string;
    author_name: string;
    platform: string;
}

export default function CustomToolsList({ platform }: { platform: string }) {
    const { t } = useLanguage();
    const [tools, setTools] = useState<CustomTool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                    "tools",
                    [
                        Query.equal("platform", platform),
                        Query.equal("status", "approved"),
                        Query.limit(10),
                        Query.orderDesc("$createdAt")
                    ]
                );
                setTools(response.documents as unknown as CustomTool[]);
            } catch (error) {
                console.error("Failed to fetch custom tools", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, [platform]);

    if (loading) return <div className="text-center py-8">Loading community tools...</div>;
    if (tools.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {t("common.communityTools")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link key={tool.$id} href={`/${platform}/${tool.$id}`}>
                        <Card className="p-6 h-full hover:shadow-lg transition-shadow border border-border">
                            <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                            <p className="text-muted text-sm mb-4 line-clamp-2">{tool.description}</p>
                            <div className="text-xs text-muted mt-auto">
                                {t("common.by")} <span className="font-medium text-primary">{tool.author_name}</span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
