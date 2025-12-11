"use client";

import { useState, useEffect, use } from "react";
import { Button, Input, TextArea, Select, Label, ListBox } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTools, type ToolInput, type ParsedTool } from "@/contexts/ToolsContext";
import PlatformBadge from "@/app/components/platform-badge";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { LANGUAGES } from "@/types";

export default function CustomToolPage({ params }: { params: Promise<{ platform: string; toolId: string }> }) {
    const resolvedParams = use(params);
    const { t, language: uiLanguage } = useLanguage();
    const { getToolBySlugAndId, getToolById, loading: toolsLoading } = useTools();
    
    const [tool, setTool] = useState<ParsedTool | null>(null);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [turnstileToken, setTurnstileToken] = useState<string>("");

    useEffect(() => {
        const fetchTool = async () => {
            // First try to find in cache
            if (!toolsLoading) {
                // Try to match by slug-$id format
                let foundTool = getToolBySlugAndId(resolvedParams.toolId);
                
                // If not found, try to find by $id only (last segment)
                if (!foundTool) {
                    const parts = resolvedParams.toolId.split("-");
                    const possibleId = parts[parts.length - 1];
                    foundTool = getToolById(possibleId);
                }
                
                if (foundTool) {
                    setTool(foundTool);
                    // Initialize form values with defaults
                    const defaultValues: Record<string, any> = {};
                    foundTool.inputs.forEach(input => {
                        if (input.type === "language") {
                            defaultValues[input.id] = uiLanguage;
                        }
                    });
                    setFormValues(defaultValues);
                    setIsLoading(false);
                    return;
                }
            }
            
            // If not in cache, fetch from Appwrite directly
            try {
                // Try different lookup strategies
                const toolIdParts = resolvedParams.toolId.split("-");
                const possibleDocId = toolIdParts[toolIdParts.length - 1];
                
                // First try: lookup by document ID (last segment)
                try {
                    const doc = await databases.getDocument(
                        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                        "tools",
                        possibleDocId
                    );
                    
                    if (doc.status === "approved") {
                        const parsedTool: ParsedTool = {
                            ...doc as any,
                            inputs: JSON.parse(doc.inputs || "[]"),
                        };
                        setTool(parsedTool);
                        
                        // Initialize form values with defaults
                        const defaultValues: Record<string, any> = {};
                        parsedTool.inputs.forEach(input => {
                            if (input.type === "language") {
                                defaultValues[input.id] = uiLanguage;
                            }
                        });
                        setFormValues(defaultValues);
                        setIsLoading(false);
                        return;
                    }
                } catch {
                    // Document not found by ID, try slug query
                }

                // Second try: Query by slug
                const slug = toolIdParts.slice(0, -1).join("-") || resolvedParams.toolId;
                const response = await databases.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                    "tools",
                    [
                        Query.equal("slug", slug),
                        Query.equal("status", "approved"),
                        Query.limit(1)
                    ]
                );
                
                if (response.documents.length > 0) {
                    const doc = response.documents[0];
                    const parsedTool: ParsedTool = {
                        ...doc as any,
                        inputs: JSON.parse(doc.inputs || "[]"),
                    };
                    setTool(parsedTool);
                    
                    // Initialize form values with defaults
                    const defaultValues: Record<string, any> = {};
                    parsedTool.inputs.forEach(input => {
                        if (input.type === "language") {
                            defaultValues[input.id] = uiLanguage;
                        }
                    });
                    setFormValues(defaultValues);
                } else {
                    setError("Tool not found");
                }
            } catch (err) {
                console.error(err);
                setError("Tool not found");
            } finally {
                setIsLoading(false);
            }
        };

        if (!toolsLoading) {
            fetchTool();
        }
    }, [resolvedParams.toolId, toolsLoading, getToolBySlugAndId, getToolById, uiLanguage]);

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
                    toolId: tool.$id,
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
            alert(t("common.copied") || "Copied!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleReset = () => {
        setResult("");
        setTurnstileToken("");
        setError("");
    };

    // Render input based on type
    const renderInput = (input: ToolInput) => {
        switch (input.type) {
            case "textarea":
                return (
                    <TextArea
                        placeholder={input.placeholder}
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        rows={3}
                        disabled={isGenerating}
                        className="w-full"
                    />
                );
            
            case "select":
                // Handle options as either comma-separated string or array
                const selectOptions = Array.isArray(input.options) 
                    ? input.options 
                    : (typeof input.options === "string" ? input.options.split(",") : []);
                return (
                    <Select
                        selectedKey={formValues[input.id] || ""}
                        onSelectionChange={(key) => handleInputChange(input.id, key as string)}
                        isDisabled={isGenerating}
                        className="w-full"
                        placeholder={t("common.selectOption") || "Select an option"}
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {selectOptions.map(opt => (
                                    <ListBox.Item key={String(opt).trim()} id={String(opt).trim()} textValue={String(opt).trim()}>
                                        {String(opt).trim()}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                );
            
            case "language":
                return (
                    <Select
                        selectedKey={formValues[input.id] || uiLanguage}
                        onSelectionChange={(key) => handleInputChange(input.id, key as string)}
                        isDisabled={isGenerating}
                        className="w-full"
                    >
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {LANGUAGES.map((lang) => (
                                    <ListBox.Item key={lang.value} id={lang.value} textValue={t(lang.labelKey)}>
                                        {t(lang.labelKey)}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                );
            
            case "number":
                return (
                    <Input
                        type="number"
                        placeholder={input.placeholder}
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        disabled={isGenerating}
                        className="w-full"
                    />
                );
            
            default: // text
                return (
                    <Input
                        type="text"
                        placeholder={input.placeholder}
                        value={formValues[input.id] || ""}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        disabled={isGenerating}
                        className="w-full"
                    />
                );
        }
    };

    if (isLoading || toolsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted">{t("common.loading") || "Loading..."}</p>
                </div>
            </div>
        );
    }
    
    if (!tool) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        {t("common.notFound") || "Tool Not Found"}
                    </h1>
                    <p className="text-muted">
                        {t("common.notFoundDescription") || "The tool you're looking for doesn't exist or hasn't been approved yet."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <PlatformBadge platform={tool.platform as any} className="mb-4" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl">{tool.icon || "🛠️"}</span>
                        <h1 className="text-5xl font-bold text-foreground">
                            {tool.name}
                        </h1>
                    </div>
                    <p className="text-xl text-muted">
                        {tool.description}
                    </p>
                    <p className="text-sm text-muted mt-2">
                        {t("customTool.createdBy") || "Created by"}{" "}
                        <span className="font-semibold">{tool.author_name}</span>
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        {tool.inputs.map((input) => (
                            <div key={input.id}>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {input.label}
                                    {input.required && <span className="text-danger ml-1">*</span>}
                                </label>
                                {renderInput(input)}
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
                                {isGenerating 
                                    ? (t("common.generating") || "Generating...") 
                                    : (t("common.generate") || "Generate")}
                            </Button>
                        )}

                        {result && (
                            <Button
                                onPress={handleReset}
                                variant="ghost"
                                size="lg"
                                className="w-full"
                            >
                                {t("common.generateAgain") || "Generate Again"}
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
                                {t("common.result") || "Result"}
                            </label>
                            <div className="bg-background border border-border rounded-lg p-4 whitespace-pre-wrap">
                                {result}
                            </div>
                            <Button onPress={handleCopy} variant="ghost" size="sm" className="w-full">
                                {t("common.copyResult") || "Copy Result"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
