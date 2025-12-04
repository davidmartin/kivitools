"use client";

import { useState, useEffect, Suspense } from "react";
import { Button, Input, Select, TextArea, Card, Spinner } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { databases } from "@/lib/appwrite-client";
import { ID, Permission, Role, Query } from "appwrite";
import { useRouter, useSearchParams } from "next/navigation";
import PlatformBadge from "@/app/components/platform-badge";
import type { AutoCreateConfig } from "@/types/search";

interface ToolInput {
    id: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    placeholder?: string;
    options?: string; // Comma separated for UI
    required: boolean;
}

const PLATFORMS = [
    "tiktok", "instagram", "twitter", "snapchat", "youtube", 
    "reddit", "discord", "twitch", "suno", "elevenlabs", 
    "forocoches", "linkedin"
];

// Loading fallback component
function BuilderLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <Spinner size="lg" />
                <p className="text-muted mt-4">Loading builder...</p>
            </div>
        </div>
    );
}

// Main content component that uses useSearchParams
function BuilderContent() {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [autoCreateLoading, setAutoCreateLoading] = useState(false);
    
    // Tool Basic Info
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [platform, setPlatform] = useState("tiktok");
    const [customPlatform, setCustomPlatform] = useState("");
    const [slug, setSlug] = useState("");
    const [slugError, setSlugError] = useState("");
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    
    // AI Assistant state
    const [showAssistant, setShowAssistant] = useState(true);
    const [assistantQuery, setAssistantQuery] = useState("");
    const [assistantLoading, setAssistantLoading] = useState(false);
    
    // Inputs Configuration
    const [inputs, setInputs] = useState<ToolInput[]>([
        { id: "topic", label: "Topic", type: "text", placeholder: "e.g. Artificial Intelligence", required: true }
    ]);

    // AI Configuration
    const [promptTemplate, setPromptTemplate] = useState("");

    // Auto-create from URL params (Feature: 016-hero-tool-search)
    useEffect(() => {
        const query = searchParams.get("query");
        const urlPlatform = searchParams.get("platform");

        if (query && query.length >= 3) {
            // Hide assistant when coming from URL params
            setShowAssistant(false);
            
            // Call auto-create API to get AI-generated config
            setAutoCreateLoading(true);

            fetch("/api/tools/auto-create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query,
                    language: language as "en" | "es",
                    suggestedPlatform: urlPlatform || undefined,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.config) {
                        const config: AutoCreateConfig = data.config;

                        // Pre-fill form with AI-generated config
                        setName(config.name);
                        setDescription(config.description);
                        
                        // Set platform (check if it's in our list)
                        if (PLATFORMS.includes(config.platform)) {
                            setPlatform(config.platform);
                        } else {
                            setPlatform("other");
                            setCustomPlatform(config.platform);
                        }

                        setPromptTemplate(config.promptTemplate);
                        setInputs(config.inputs);

                        // Generate slug from name
                        const generatedSlug = config.name
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "")
                            .slice(0, 36);
                        setSlug(generatedSlug);
                    }
                })
                .catch((error) => {
                    console.error("Auto-create error:", error);
                })
                .finally(() => {
                    setAutoCreateLoading(false);
                });
        }
    }, [searchParams, language]);

    const addInput = () => {
        const newId = `input_${inputs.length + 1}`;
        setInputs([...inputs, { 
            id: newId, 
            label: `Input ${inputs.length + 1}`, 
            type: "text", 
            required: true 
        }]);
    };

    const updateInput = (index: number, field: keyof ToolInput, value: any) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], [field]: value };
        setInputs(newInputs);
    };

    const removeInput = (index: number) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    // AI Assistant: Generate tool config from description
    const handleAssistantGenerate = async () => {
        if (!assistantQuery.trim() || assistantQuery.length < 10) return;
        
        setAssistantLoading(true);
        
        try {
            const response = await fetch("/api/tools/auto-create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: assistantQuery,
                    language: language as "en" | "es",
                }),
            });
            
            const data = await response.json();
            
            if (data.success && data.config) {
                const config: AutoCreateConfig = data.config;

                // Pre-fill form with AI-generated config
                setName(config.name);
                setDescription(config.description);
                
                // Set platform (check if it's in our list)
                if (PLATFORMS.includes(config.platform)) {
                    setPlatform(config.platform);
                } else {
                    setPlatform("other");
                    setCustomPlatform(config.platform);
                }

                setPromptTemplate(config.promptTemplate);
                setInputs(config.inputs);

                // Generate slug from name
                const generatedSlug = config.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "")
                    .slice(0, 36);
                setSlug(generatedSlug);
                
                // Hide assistant after successful generation
                setShowAssistant(false);
            }
        } catch (error) {
            console.error("Assistant error:", error);
        } finally {
            setAssistantLoading(false);
        }
    };

    const checkSlugAvailability = async (value: string) => {
        if (!value) {
            setSlugError("");
            setSlugAvailable(null);
            return;
        }

        // Validate format: lowercase, numbers, hyphens, underscores
        if (!/^[a-z0-9-_]+$/.test(value)) {
            setSlugError(t("builder.error.slugInvalid"));
            setSlugAvailable(false);
            return;
        }

        if (value.length > 36) {
            setSlugError(t("builder.error.slugInvalid"));
            setSlugAvailable(false);
            return;
        }

        try {
            // Try to get document with this ID
            await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                value
            );
            // If successful, it exists -> Not available
            setSlugError(t("builder.error.slugTaken"));
            setSlugAvailable(false);
        } catch (error: any) {
            // If 404, it doesn't exist -> Available
            if (error.code === 404) {
                setSlugError("");
                setSlugAvailable(true);
            } else {
                console.error(error);
            }
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSlug(value);
        setSlugAvailable(null); // Reset status while typing
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const finalPlatform = platform === "other" ? customPlatform : platform;
            if (!finalPlatform.trim()) {
                throw new Error(t("builder.errorPlatform"));
            }

            if (!slug || !slugAvailable) {
                throw new Error(slugError || t("builder.error.slugInvalid"));
            }
            
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                slug, // Use slug as Document ID
                {
                    name,
                    description,
                    platform: finalPlatform.toLowerCase(),
                    inputs: JSON.stringify(inputs),
                    prompt_template: promptTemplate,
                    status: "pending",
                    author_name: user.name,
                    author_id: user.$id,
                    slug
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            );

            alert(t("builder.success"));
            router.push("/dashboard"); // We'll create this later
        } catch (error: any) {
            console.error(error);
            alert(t("builder.error") + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Get query from URL to show context
    const urlQuery = searchParams.get("query");

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">🔐</span>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        {t("builder.loginRequired")}
                    </h1>
                    
                    {urlQuery && (
                        <div className="mb-6">
                            <p className="text-muted mb-2">
                                {t("builder.loginToCreate") || "Sign in to create:"}
                            </p>
                            <div className="inline-block px-4 py-2 bg-surface border border-border rounded-lg">
                                <span className="text-foreground font-medium">"{urlQuery}"</span>
                            </div>
                        </div>
                    )}
                    
                    <p className="text-muted mb-6">
                        {t("builder.loginDescription") || "Create an account or sign in to start building your own AI-powered tools."}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                            onPress={() => router.push(urlQuery ? `/login?createTool=${encodeURIComponent(urlQuery)}` : "/login")}
                            variant="primary"
                            size="lg"
                        >
                            {t("builder.login")}
                        </Button>
                        <Button 
                            onPress={() => router.push("/register")}
                            variant="secondary"
                            size="lg"
                        >
                            {t("builder.register") || "Create Account"}
                        </Button>
                    </div>
                    
                    <p className="mt-6 text-xs text-muted/70">
                        {t("builder.loginHint") || "It only takes 30 seconds to sign up! 🚀"}
                    </p>
                </div>
            </div>
        );
    }

    // Show loading state while auto-creating from URL params
    if (autoCreateLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    {/* Animated Logo/Icon */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 mx-auto bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-5xl">🛠️</span>
                        </div>
                        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-accent/30 border-t-accent animate-spin" />
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-foreground mb-3">
                        {t("builder.autoCreating.title") || "Creating your tool..."}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-muted mb-6">
                        {t("builder.autoCreating.description") || "Our AI is crafting the perfect tool based on your request. This usually takes 5-10 seconds."}
                    </p>
                    
                    {/* Progress Steps */}
                    <div className="space-y-3 text-left bg-surface rounded-lg p-4 border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                            <span className="text-sm text-foreground">{t("builder.autoCreating.step1") || "Analyzing your request"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                            </div>
                            <span className="text-sm text-foreground">{t("builder.autoCreating.step2") || "Generating tool configuration"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center text-muted text-xs">3</div>
                            <span className="text-sm text-muted">{t("builder.autoCreating.step3") || "Preparing the builder"}</span>
                        </div>
                    </div>
                    
                    {/* Fun message */}
                    <p className="mt-6 text-xs text-muted/70 italic">
                        {t("builder.autoCreating.funMessage") || "☕ Grab a coffee... actually, we'll be done before the kettle boils!"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">{t("builder.title")}</h1>

            <div className="grid gap-8">
                {/* AI Assistant Section */}
                {showAssistant && (
                    <Card className="p-6 border-2 border-dashed border-accent/50 bg-accent/5">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-3">
                                <span className="text-3xl">🤖</span>
                            </div>
                            <h2 className="text-xl font-bold text-foreground">
                                {t("builder.assistant.title") || "Not sure where to start?"}
                            </h2>
                            <p className="text-muted mt-1">
                                {t("builder.assistant.subtitle") || "Describe what you want to create and I'll fill out the form for you!"}
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <textarea
                                value={assistantQuery}
                                onChange={(e) => setAssistantQuery(e.target.value)}
                                placeholder={t("builder.assistant.placeholder") || "e.g. 'I want a tool that generates catchy Instagram captions for food bloggers' or 'A TikTok script writer for fitness content'"}
                                className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-foreground resize-none focus:ring-2 focus:ring-accent focus:border-transparent"
                                rows={3}
                                disabled={assistantLoading}
                            />
                            
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button
                                    onPress={handleAssistantGenerate}
                                    variant="primary"
                                    size="lg"
                                    isDisabled={assistantLoading || assistantQuery.trim().length < 10}
                                    className="min-w-[200px]"
                                >
                                    {assistantLoading ? (
                                        <>
                                            <Spinner size="sm" className="mr-2" />
                                            {t("builder.assistant.generating") || "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            ✨ {t("builder.assistant.generate") || "Generate Tool Config"}
                                        </>
                                    )}
                                </Button>
                                <Button
                                    onPress={() => setShowAssistant(false)}
                                    variant="ghost"
                                    size="lg"
                                >
                                    {t("builder.assistant.skip") || "I'll do it manually"}
                                </Button>
                            </div>
                            
                            <p className="text-center text-xs text-muted/70">
                                {t("builder.assistant.hint") || "💡 Tip: Be specific! The more detail you give, the better the result."}
                            </p>
                        </div>
                    </Card>
                )}
                
                {/* Show/Hide Assistant Toggle (when hidden) */}
                {!showAssistant && (
                    <div className="text-center">
                        <button
                            onClick={() => setShowAssistant(true)}
                            className="text-sm text-accent hover:underline"
                        >
                            🤖 {t("builder.assistant.showAgain") || "Need help? Let AI fill the form"}
                        </button>
                    </div>
                )}

                {/* Basic Info */}
                <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">{t("builder.basicInfo.title")}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">{t("builder.basicInfo.toolName")}</label>
                            <input 
                                className="w-full px-4 py-2 border border-border rounded-lg bg-surface"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t("builder.basicInfo.toolNamePlaceholder")}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">{t("builder.basicInfo.platform")}</label>
                            <select 
                                className="w-full px-4 py-2 border border-border rounded-lg bg-surface"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                            >
                                {PLATFORMS.map(p => (
                                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                                ))}
                                <option value="other">{t("builder.basicInfo.otherPlatform")}</option>
                            </select>
                            {platform === "other" && (
                                <input 
                                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-surface"
                                    value={customPlatform}
                                    onChange={(e) => setCustomPlatform(e.target.value)}
                                    placeholder={t("builder.basicInfo.customPlatformPlaceholder")}
                                />
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("builder.basicInfo.slug")}
                            <span className="text-xs text-muted ml-2 font-normal">
                                (kivitools.com/{platform === "other" ? (customPlatform || "platform") : platform}/<span className="font-bold">{slug || "your-tool-id"}</span>)
                            </span>
                        </label>
                        <div className="relative">
                            <input 
                                className={`w-full px-4 py-2 border rounded-lg bg-surface ${
                                    slugError ? "border-red-500 focus:ring-red-500" : 
                                    slugAvailable === true ? "border-green-500 focus:ring-green-500" : 
                                    "border-border"
                                }`}
                                value={slug}
                                onChange={handleSlugChange}
                                onBlur={(e) => checkSlugAvailability(e.target.value)}
                                placeholder={t("builder.basicInfo.slugPlaceholder")}
                            />
                            {slugAvailable === true && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                    ✓
                                </div>
                            )}
                        </div>
                        {slugError && <p className="text-xs text-red-500 mt-1">{slugError}</p>}
                        {slugAvailable === true && <p className="text-xs text-green-500 mt-1">{t("builder.success.slugAvailable")}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t("builder.basicInfo.description")}</label>
                        <textarea 
                            className="w-full px-4 py-2 border border-border rounded-lg bg-surface"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t("builder.basicInfo.descriptionPlaceholder")}
                            rows={2}
                        />
                    </div>
                </Card>

                {/* Inputs Configuration */}
                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{t("builder.inputs.title")}</h2>
                        <Button size="sm" onPress={addInput}>{t("builder.inputs.addInput")}</Button>
                    </div>
                    
                    <div className="space-y-4">
                        {inputs.map((input, idx) => (
                            <div key={idx} className="p-4 border border-border rounded-lg bg-background/50 relative">
                                <button 
                                    onClick={() => removeInput(idx)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-medium">{t("builder.inputs.id")}</label>
                                        <input 
                                            className="w-full px-2 py-1 text-sm border border-border rounded bg-surface"
                                            value={input.id}
                                            onChange={(e) => updateInput(idx, "id", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium">{t("builder.inputs.label")}</label>
                                        <input 
                                            className="w-full px-2 py-1 text-sm border border-border rounded bg-surface"
                                            value={input.label}
                                            onChange={(e) => updateInput(idx, "label", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium">{t("builder.inputs.type")}</label>
                                        <select 
                                            className="w-full px-2 py-1 text-sm border border-border rounded bg-surface"
                                            value={input.type}
                                            onChange={(e) => updateInput(idx, "type", e.target.value)}
                                        >
                                            <option value="text">{t("builder.inputs.typeText")}</option>
                                            <option value="textarea">{t("builder.inputs.typeTextarea")}</option>
                                            <option value="number">{t("builder.inputs.typeNumber")}</option>
                                            <option value="select">{t("builder.inputs.typeSelect")}</option>
                                        </select>
                                    </div>
                                    {input.type === "select" && (
                                        <div className="md:col-span-3">
                                            <label className="text-xs font-medium">{t("builder.inputs.options")}</label>
                                            <input 
                                                className="w-full px-2 py-1 text-sm border border-border rounded bg-surface"
                                                value={input.options || ""}
                                                onChange={(e) => updateInput(idx, "options", e.target.value)}
                                                placeholder={t("builder.inputs.optionsPlaceholder")}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Prompt Configuration */}
                <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">{t("builder.prompt.title")}</h2>
                    <p className="text-sm text-muted">
                        {t("builder.prompt.helpText")}
                        <br />
                        {t("builder.prompt.availableVariables")} {inputs.map(i => <span key={i.id} className="mx-1 font-mono text-primary">{`{{${i.id}}}`}</span>)}
                    </p>
                    <textarea 
                        className="w-full px-4 py-3 border border-border rounded-lg bg-surface font-mono text-sm h-64"
                        value={promptTemplate}
                        onChange={(e) => setPromptTemplate(e.target.value)}
                        placeholder={t("builder.prompt.placeholder")}
                    />
                </Card>

                <Button 
                    size="lg" 
                    variant="primary" 
                    className="w-full" 
                    onPress={handleSave}
                    isDisabled={loading}
                >
                    {loading ? t("builder.submitting") : t("builder.submit")}
                </Button>
            </div>
        </div>
    );
}

// Wrapper component with Suspense boundary
export default function BuilderPage() {
    return (
        <Suspense fallback={<BuilderLoading />}>
            <BuilderContent />
        </Suspense>
    );
}
