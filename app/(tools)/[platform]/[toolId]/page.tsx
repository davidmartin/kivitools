"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import PlatformBadge from "@/app/components/platform-badge";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { notFound } from "next/navigation";

interface ToolInput {
    id: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    placeholder?: string;
    options?: string;
    required: boolean;
}

interface CustomTool {
    $id: string;
    name: string;
    description: string;
    platform: string;
    inputs: string; // JSON string
    author_name: string;
}

export default function CustomToolPage({ params }: { params: Promise<{ platform: string; toolId: string }> }) {
    const resolvedParams = use(params);
    const { t } = useLanguage();
    const [tool, setTool] = useState<CustomTool | null>(null);
    const [inputs, setInputs] = useState<ToolInput[]>([]);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    useEffect(() => {
        const fetchTool = async () => {
            try {
                // Query by slug instead of document ID
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                    "tools",
                    [
                        Query.equal("slug", resolvedParams.toolId),
                        Query.equal("status", "approved"),
                        Query.limit(1)
                    ]
                );
                
                if (response.documents.length === 0) {
                    setError("Tool not found");
                    return;
                }
                
                const doc = response.documents[0];
                setTool(doc as unknown as CustomTool);
                setInputs(JSON.parse(doc.inputs));
            } catch (err) {
                console.error(err);
                setError("Tool not found");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTool();
    }, [resolvedParams.toolId]);

    const handleInputChange = (id: string, value: any) => {
        setFormValues(prev => ({ ...prev, [id]: value }));
    };

    const handleGenerate = async () => {
        if (!turnstileToken) {
            setError(t("turnstile.failed"));
            return;
        }
        
        if (!tool) {
            setError("Tool not found");
            return;
        }

        setIsGenerating(true);
        setError("");
        setResult("");

        try {
            const response = await fetch("/api/custom-tool/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    toolId: tool.$id, // Use the actual document ID, not the slug
                    inputs: formValues,
                    turnstileToken
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to generate content");
            }

            setResult(data.result);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result);
            alert("Copied!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (isLoading) return <div className="p-20 text-center">Loading tool...</div>;
    if (!tool) return <div className="p-20 text-center text-red-500">Tool not found</div>;

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <PlatformBadge platform={tool.platform as any} className="mb-4" />
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        {tool.name}
                    </h1>
                    <p className="text-xl text-muted">
                        {tool.description}
                    </p>
                    <p className="text-sm text-muted mt-2">
                        Created by <span className="font-semibold">{tool.author_name}</span>
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        {inputs.map((input) => (
                            <div key={input.id}>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {input.label}
                                </label>
                                {input.type === "textarea" ? (
                                    <textarea
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
                                        placeholder={input.placeholder}
                                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                                        rows={3}
                                    />
                                ) : input.type === "select" ? (
                                    <select
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
                                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    >
                                        <option value="">Select an option</option>
                                        {input.options?.split(",").map(opt => (
                                            <option key={opt.trim()} value={opt.trim()}>{opt.trim()}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={input.type}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground"
                                        placeholder={input.placeholder}
                                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}

                        <TurnstileWidget
                            onSuccess={(token) => setTurnstileToken(token)}
                            onError={() => setError(t("turnstile.failed"))}
                        />

                        {!result && (
                            <Button
                                onPress={handleGenerate}
                                isDisabled={isGenerating || !turnstileToken}
                                variant="secondary"
                                size="lg"
                                className="w-full"
                            >
                                {isGenerating ? "Generating..." : "Generate"}
                            </Button>
                        )}

                        {result && (
                            <Button
                                onPress={() => { setResult(""); setTurnstileToken(""); }}
                                variant="ghost"
                                size="lg"
                                className="w-full"
                            >
                                Generate Again
                            </Button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-foreground">
                                Result
                            </label>
                            <div className="bg-background border border-border rounded-lg p-4 whitespace-pre-wrap">
                                {result}
                            </div>
                            <Button onPress={handleCopy} variant="ghost" size="sm" className="w-full">
                                Copy Result
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
