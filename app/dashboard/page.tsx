"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

import { Copy, Check, Key } from "lucide-react";

interface UserTool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    status: "pending" | "approved" | "rejected";
    $createdAt: string;
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [tools, setTools] = useState<UserTool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchUserTools();
        }
    }, [user]);

    const fetchUserTools = async () => {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                [
                    Query.equal("author_id", user!.$id),
                    Query.orderDesc("$createdAt")
                ]
            );
            setTools(response.documents as unknown as UserTool[]);
        } catch (error) {
            console.error("Failed to fetch user tools", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (toolId: string) => {
        if (!confirm(t("dashboard.confirmDelete"))) return;

        try {
            await databases.deleteDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                toolId
            );
            setTools(tools.filter(t => t.$id !== toolId));
        } catch (error) {
            console.error("Failed to delete tool", error);
            alert(t("dashboard.errorDelete"));
        }
    };

    if (authLoading || (loading && user)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
                    <p className="text-muted">{t("dashboard.subtitle")}</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/api-access">
                        <Button variant="secondary" size="lg">
                            <Key className="w-4 h-4 mr-2" />
                            API
                        </Button>
                    </Link>
                    <Link href="/builder">
                        <Button variant="primary" size="lg">
                            {t("dashboard.createTool")}
                        </Button>
                    </Link>
                </div>
            </div>

            {tools.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2 border-border bg-transparent shadow-none">
                    <div className="text-6xl mb-4">🛠️</div>
                    <h3 className="text-xl font-bold mb-2">{t("dashboard.empty.title")}</h3>
                    <p className="text-muted mb-6">{t("dashboard.empty.description")}</p>
                    <Link href="/builder">
                        <Button variant="primary">
                            {t("dashboard.empty.button")}
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {tools.map((tool) => (
                        <Card key={tool.$id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold">{tool.name}</h3>
                                    <Chip 
                                        className={
                                            tool.status === 'approved' ? 'bg-success/20 text-success' : 
                                            tool.status === 'rejected' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                                        }
                                        size="sm"
                                        variant="soft"
                                    >
                                        {t(`dashboard.status.${tool.status}`)}
                                    </Chip>
                                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground capitalize">
                                        {tool.platform}
                                    </span>
                                </div>
                                <p className="text-muted text-sm">{tool.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0">
                                {tool.status === 'approved' && (
                                    <Link href={`/${tool.platform}/${tool.$id}`} target="_blank">
                                        <Button size="sm" variant="ghost">
                                            {t("dashboard.actions.view")}
                                        </Button>
                                    </Link>
                                )}
                                <Button 
                                    size="sm" 
                                    variant="danger"
                                    onPress={() => handleDelete(tool.$id)}
                                >
                                    {t("dashboard.actions.delete")}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
