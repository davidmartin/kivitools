"use client";

import { useState, useEffect, use, Suspense } from "react";
import { Button, Input, TextArea, Select, Label, ListBox } from "@heroui/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTools, type ToolInput, type ParsedTool } from "@/contexts/ToolsContext";
import PlatformBadge from "@/app/components/platform-badge";
import TurnstileWidget from "@/app/components/turnstile-widget";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { LANGUAGES } from "@/types";

// Helper functions to support both old (name) and new (id/label) input formats
const getInputId = (input: ToolInput): string => input.id || input.name || "";
const getInputLabel = (input: ToolInput): string => input.label || input.name || "";

// Smart placeholder generator based on input name/label when placeholder is not provided
const getInputPlaceholder = (input: ToolInput, t: (key: string) => string): string => {
    // If placeholder is already defined, use it
    if (input.placeholder) return input.placeholder;
    
    // Generate smart placeholder based on input name/id
    const inputName = (input.id || input.name || "").toLowerCase();
    const inputLabel = (input.label || input.name || "").toLowerCase();
    
    // Common placeholders based on input type/name
    const placeholderMap: Record<string, string> = {
        // Topic variations
        "topic": t("placeholder.topic") || "e.g., How to start a podcast, Best morning routines...",
        "tema": t("placeholder.topic") || "ej., Cómo empezar un podcast, Mejores rutinas matutinas...",
        "subject": t("placeholder.topic") || "e.g., The topic you want to create content about...",
        "theme": t("placeholder.topic") || "e.g., The main theme or idea...",
        
        // Title variations
        "title": t("placeholder.title") || "e.g., My Amazing Video Title",
        "titulo": t("placeholder.title") || "ej., Mi Título Increíble",
        
        // Description variations  
        "description": t("placeholder.description") || "e.g., A brief description of your content...",
        "descripcion": t("placeholder.description") || "ej., Una breve descripción de tu contenido...",
        
        // Content variations
        "content": t("placeholder.content") || "e.g., Enter your content here...",
        "text": t("placeholder.content") || "e.g., Enter your text here...",
        "script": t("placeholder.content") || "e.g., Your script or text...",
        
        // Keywords
        "keywords": t("placeholder.keywords") || "e.g., keyword1, keyword2, keyword3",
        "hashtags": t("placeholder.hashtags") || "e.g., #trending #viral #content",
        
        // Target/Audience
        "audience": t("placeholder.audience") || "e.g., Young professionals, Students, Parents...",
        "target": t("placeholder.audience") || "e.g., Your target audience...",
        
        // Style/Tone
        "style": t("placeholder.style") || "e.g., Professional, Casual, Funny...",
        "mood": t("placeholder.style") || "e.g., Energetic, Calm, Inspiring...",
        
        // Name/Brand
        "name": t("placeholder.name") || "e.g., Your name or brand...",
        "brand": t("placeholder.name") || "e.g., Your brand name...",
        
        // URL
        "url": t("placeholder.url") || "e.g., https://example.com",
        "link": t("placeholder.url") || "e.g., https://your-link.com",
    };
    
    // Try to find a matching placeholder
    for (const [key, placeholder] of Object.entries(placeholderMap)) {
        if (inputName.includes(key) || inputLabel.includes(key)) {
            return placeholder;
        }
    }
    
    // Default fallback based on type
    switch (input.type) {
        case "textarea":
            return t("placeholder.textarea") || "Enter your text here...";
        case "number":
            return t("placeholder.number") || "Enter a number...";
        default:
            return t("placeholder.default") || "Enter value...";
    }
};

// Optimized loading skeleton to prevent CLS
function ToolSkeleton() {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header skeleton */}
                <div className="text-center mb-12">
                    <div className="h-6 w-24 bg-foreground/10 rounded-full mx-auto mb-4 animate-pulse" />
                    <div className="h-12 w-64 bg-foreground/10 rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-foreground/5 rounded-lg mx-auto animate-pulse" />
                </div>
                {/* Form skeleton */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="h-4 w-20 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-12 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-24 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-24 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-12 w-full bg-primary/20 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
    );
}

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
                            defaultValues[getInputId(input)] = uiLanguage;
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
                                defaultValues[getInputId(input)] = uiLanguage;
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
                            defaultValues[getInputId(input)] = uiLanguage;
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
        const inputId = getInputId(input);
        const smartPlaceholder = getInputPlaceholder(input, t);
        
        switch (input.type) {
            case "textarea":
                return (
                    <TextArea
                        placeholder={smartPlaceholder}
                        value={formValues[inputId] || ""}
                        onChange={(e) => handleInputChange(inputId, e.target.value)}
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
                        selectedKey={formValues[inputId] || ""}
                        onSelectionChange={(key) => handleInputChange(inputId, key as string)}
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
                        selectedKey={formValues[inputId] || uiLanguage}
                        onSelectionChange={(key) => handleInputChange(inputId, key as string)}
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
                        placeholder={smartPlaceholder}
                        value={formValues[inputId] || ""}
                        onChange={(e) => handleInputChange(inputId, e.target.value)}
                        disabled={isGenerating}
                        className="w-full"
                    />
                );
            
            default: // text
                return (
                    <Input
                        type="text"
                        placeholder={smartPlaceholder}
                        value={formValues[inputId] || ""}
                        onChange={(e) => handleInputChange(inputId, e.target.value)}
                        disabled={isGenerating}
                        className="w-full"
                    />
                );
        }
    };

    if (isLoading || toolsLoading) {
        return <ToolSkeleton />;
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
            {/* Main tool container - protected from auto-ads insertion */}
            <div 
                className="max-w-4xl mx-auto" 
                data-nosnippet 
                data-ad-slot-exclude="true"
            >
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

                {/* Main Card - no-ads zone */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6 relative z-10 tool-content-protected">
                    <div className="space-y-4">
                        {tool.inputs.map((input) => (
                            <div key={getInputId(input)}>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {getInputLabel(input)}
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
