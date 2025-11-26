"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

interface Tool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    status: "pending" | "approved" | "rejected";
    author_name: string;
    inputs: string;
    prompt_template: string;
    $createdAt: string;
}

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
                return;
            }

            // Check for admin label
            if (!user.labels || !user.labels.includes("admin")) {
                setLoading(false); // Stop loading to show access denied
                return;
            }

            fetchTools();
        }
    }, [user, authLoading, router]);

    const fetchTools = async () => {
        try {
            const response = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                [
                    Query.orderDesc("$createdAt"),
                    Query.limit(100)
                ]
            );
            setTools(response.documents as unknown as Tool[]);
        } catch (error) {
            console.error("Failed to fetch tools", error);
            alert(t("admin.error.fetch"));
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (toolId: string, status: "approved" | "rejected" | "pending") => {
        try {
            await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                toolId,
                { status }
            );
            
            // Update local state
            setTools(tools.map(t => t.$id === toolId ? { ...t, status } : t));
            
            if (status === "approved") alert(t("admin.success.approved"));
            else if (status === "rejected") alert(t("admin.success.rejected"));
        } catch (error) {
            console.error("Failed to update tool", error);
            alert(t("admin.error.update"));
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Access Denied View
    if (!user || !user.labels || !user.labels.includes("admin")) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-3xl font-bold text-danger mb-4">🚫 {t("admin.accessDenied")}</h1>
                <Link href="/">
                    <Button variant="ghost">{t("admin.backHome")}</Button>
                </Link>
            </div>
        );
    }

    const pendingTools = tools.filter(t => t.status === "pending");

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
            <div>
                <h1 className="text-3xl font-bold mb-2">{t("admin.title")}</h1>
                <p className="text-muted">{t("admin.subtitle")}</p>
            </div>

            {/* Admin Tools Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    🛠️ {t("admin.adminTools")}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/admin/video-generator">
                        <Card className="p-6 hover:border-accent transition-colors cursor-pointer h-full">
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">🎬</div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1">{t("admin.videoGenerator.title")}</h3>
                                    <p className="text-sm text-muted">{t("admin.videoGenerator.subtitle")}</p>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            </section>

            {/* Pending Tools Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    ⏳ {t("admin.pendingTools")} 
                    <Chip size="sm" variant="soft">{pendingTools.length}</Chip>
                </h2>
                
                {pendingTools.length === 0 ? (
                    <Card className="p-12 text-center border-dashed border-2 border-border bg-transparent shadow-none">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-xl font-bold mb-2">{t("admin.noPendingTools")}</h3>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {pendingTools.map((tool) => (
                            <Card key={tool.$id} className="p-6 border-l-4 border-l-warning">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold">{tool.name}</h3>
                                            <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground capitalize">
                                                {tool.platform}
                                            </span>
                                            <span className="text-xs text-muted">
                                                by {tool.author_name}
                                            </span>
                                        </div>
                                        <p className="text-muted">{tool.description}</p>
                                        
                                        <div className="bg-surface/50 p-3 rounded text-xs font-mono mt-2">
                                            <div className="mb-1 font-bold">Prompt Template:</div>
                                            <div className="line-clamp-2">{tool.prompt_template}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 shrink-0 min-w-[120px]">
                                        <Button 
                                            className="bg-green-600 text-white hover:bg-green-700"
                                            onPress={() => updateStatus(tool.$id, "approved")}
                                        >
                                            {t("admin.approve")}
                                        </Button>
                                        <Button 
                                            variant="danger"
                                            onPress={() => updateStatus(tool.$id, "rejected")}
                                        >
                                            {t("admin.reject")}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* All Tools Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    📚 {t("admin.allTools")}
                    <Chip size="sm" variant="soft">{tools.length}</Chip>
                </h2>

                <div className="grid gap-4">
                    {tools.map((tool) => (
                        <Card key={tool.$id} className="p-4">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold">{tool.name}</h3>
                                        <Chip 
                                            size="sm" 
                                            className={
                                                tool.status === 'approved' ? 'bg-success/20 text-success' : 
                                                tool.status === 'rejected' ? 'bg-danger/20 text-danger' : 
                                                'bg-warning/20 text-warning'
                                            }
                                        >
                                            {t(`admin.status.${tool.status}`)}
                                        </Chip>
                                    </div>
                                    <div className="text-xs text-muted flex gap-2">
                                        <span className="capitalize">{tool.platform}</span>
                                        <span>•</span>
                                        <span>{new Date(tool.$createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{tool.author_name}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {tool.status !== "approved" && (
                                        <Button 
                                            size="sm" 
                                            className="bg-green-600 text-white hover:bg-green-700"
                                            onPress={() => updateStatus(tool.$id, "approved")}
                                        >
                                            {t("admin.approve")}
                                        </Button>
                                    )}
                                    {tool.status !== "rejected" && (
                                        <Button 
                                            size="sm" 
                                            variant="danger"
                                            onPress={() => updateStatus(tool.$id, "rejected")}
                                        >
                                            {t("admin.reject")}
                                        </Button>
                                    )}
                                    {tool.status !== "pending" && (
                                        <Button 
                                            size="sm" 
                                            variant="ghost"
                                            onPress={() => updateStatus(tool.$id, "pending")}
                                        >
                                            {t("admin.actions.makePending")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
