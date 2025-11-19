"use client";

import { useState } from "react";
import { Button, Input, Select, TextArea, Card } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { databases } from "@/lib/appwrite-client";
import { ID, Permission, Role, Query } from "appwrite";
import { useRouter } from "next/navigation";
import PlatformBadge from "@/app/components/platform-badge";

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

export default function BuilderPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    // Tool Basic Info
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [platform, setPlatform] = useState("tiktok");
    const [customPlatform, setCustomPlatform] = useState("");
    const [slug, setSlug] = useState("");
    const [slugError, setSlugError] = useState("");
    const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
    
    // Inputs Configuration
    const [inputs, setInputs] = useState<ToolInput[]>([
        { id: "topic", label: "Topic", type: "text", placeholder: "e.g. Artificial Intelligence", required: true }
    ]);

    // AI Configuration
    const [promptTemplate, setPromptTemplate] = useState("");

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

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t("builder.loginRequired")}</h1>
                <Button onPress={() => router.push("/login")}>{t("builder.login")}</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">{t("builder.title")}</h1>

            <div className="grid gap-8">
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
