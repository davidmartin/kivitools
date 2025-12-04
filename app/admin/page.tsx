"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { databases } from "@/lib/appwrite-client";
import { Query } from "appwrite";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

interface ToolInput {
    id: string;
    label: string;
    type: "text" | "textarea" | "select" | "number";
    placeholder?: string;
    options?: string;
    required: boolean;
}

interface Tool {
    $id: string;
    name: string;
    slug: string;
    description: string;
    platform: string;
    status: "pending" | "approved" | "rejected";
    author_id: string;
    author_name: string;
    inputs: string;
    prompt_template: string;
    $createdAt: string;
}

interface EditingTool {
    $id: string;
    name: string;
    slug: string;
    description: string;
    platform: string;
    inputs: ToolInput[];
    prompt_template: string;
}

export default function AdminPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Edit modal state
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState<EditingTool | null>(null);
    const [saving, setSaving] = useState(false);

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

    // Open edit modal with tool data
    const openEditModal = (tool: Tool) => {
        let parsedInputs: ToolInput[] = [];
        try {
            parsedInputs = JSON.parse(tool.inputs || "[]");
        } catch {
            parsedInputs = [];
        }
        
        setEditingTool({
            $id: tool.$id,
            name: tool.name,
            slug: tool.slug || "",
            description: tool.description,
            platform: tool.platform,
            inputs: parsedInputs,
            prompt_template: tool.prompt_template,
        });
        setEditModalOpen(true);
    };

    // Save edited tool
    const saveEditedTool = async () => {
        if (!editingTool) return;
        
        setSaving(true);
        try {
            await databases.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                "tools",
                editingTool.$id,
                {
                    name: editingTool.name,
                    slug: editingTool.slug,
                    description: editingTool.description,
                    platform: editingTool.platform,
                    inputs: JSON.stringify(editingTool.inputs),
                    prompt_template: editingTool.prompt_template,
                }
            );
            
            // Update local state
            setTools(tools.map(t => t.$id === editingTool.$id ? {
                ...t,
                name: editingTool.name,
                slug: editingTool.slug,
                description: editingTool.description,
                platform: editingTool.platform,
                inputs: JSON.stringify(editingTool.inputs),
                prompt_template: editingTool.prompt_template,
            } : t));
            
            alert(t("admin.success.saved") || "Tool saved successfully!");
            setEditModalOpen(false);
            setEditingTool(null);
        } catch (error) {
            console.error("Failed to save tool", error);
            alert(t("admin.error.save") || "Failed to save tool");
        } finally {
            setSaving(false);
        }
    };

    // Update editing tool field
    const updateEditingField = (field: keyof EditingTool, value: any) => {
        if (!editingTool) return;
        setEditingTool({ ...editingTool, [field]: value });
    };

    // Update input in editing tool
    const updateEditingInput = (index: number, field: keyof ToolInput, value: any) => {
        if (!editingTool) return;
        const newInputs = [...editingTool.inputs];
        newInputs[index] = { ...newInputs[index], [field]: value };
        setEditingTool({ ...editingTool, inputs: newInputs });
    };

    // Add input to editing tool
    const addEditingInput = () => {
        if (!editingTool) return;
        const newId = `input_${editingTool.inputs.length + 1}`;
        setEditingTool({
            ...editingTool,
            inputs: [...editingTool.inputs, {
                id: newId,
                label: `Input ${editingTool.inputs.length + 1}`,
                type: "text",
                required: true,
            }]
        });
    };

    // Remove input from editing tool
    const removeEditingInput = (index: number) => {
        if (!editingTool) return;
        setEditingTool({
            ...editingTool,
            inputs: editingTool.inputs.filter((_, i) => i !== index)
        });
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
                                        <div className="flex items-center gap-3 flex-wrap">
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
                                    
                                    <div className="flex flex-col gap-2 shrink-0 min-w-[140px]">
                                        <Button 
                                            variant="secondary"
                                            onPress={() => openEditModal(tool)}
                                        >
                                            👁️ {t("admin.viewDetails") || "View Details"}
                                        </Button>
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
                                    <div className="flex items-center gap-3 mb-1 flex-wrap">
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
                                    <div className="text-xs text-muted flex gap-2 flex-wrap">
                                        <span className="capitalize">{tool.platform}</span>
                                        <span>•</span>
                                        <span>{new Date(tool.$createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{tool.author_name}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <Button 
                                        size="sm" 
                                        variant="secondary"
                                        onPress={() => openEditModal(tool)}
                                    >
                                        ✏️ {t("admin.edit") || "Edit"}
                                    </Button>
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

            {/* Edit Tool Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setEditModalOpen(false);
                            setEditingTool(null);
                        }}
                    />
                    
                    {/* Dialog */}
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-xl">
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                ✏️ {t("admin.editTool") || "Edit Tool"}
                            </h2>
                            <button
                                onClick={() => {
                                    setEditModalOpen(false);
                                    setEditingTool(null);
                                }}
                                className="text-muted hover:text-foreground p-2 rounded-lg hover:bg-surface transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {editingTool && (
                                <>
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg border-b border-border pb-2">
                                            {t("admin.editModal.basicInfo") || "Basic Information"}
                                        </h3>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    {t("admin.editModal.name") || "Name"}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTool.name}
                                                    onChange={(e) => updateEditingField("name", e.target.value)}
                                                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    {t("admin.editModal.slug") || "Slug (URL)"}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={editingTool.slug}
                                                    onChange={(e) => updateEditingField("slug", e.target.value)}
                                                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface font-mono text-sm"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                {t("admin.editModal.platform") || "Platform"}
                                            </label>
                                            <input
                                                type="text"
                                                value={editingTool.platform}
                                                onChange={(e) => updateEditingField("platform", e.target.value)}
                                                className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                {t("admin.editModal.description") || "Description"}
                                            </label>
                                            <textarea
                                                value={editingTool.description}
                                                onChange={(e) => updateEditingField("description", e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-border rounded-lg bg-surface resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Inputs */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-border pb-2">
                                            <h3 className="font-bold text-lg">
                                                {t("admin.editModal.inputs") || "Form Inputs"}
                                            </h3>
                                            <Button size="sm" variant="secondary" onPress={addEditingInput}>
                                                + {t("admin.editModal.addInput") || "Add Input"}
                                            </Button>
                                        </div>
                                        
                                        {editingTool.inputs.length === 0 ? (
                                            <p className="text-muted text-sm italic">
                                                {t("admin.editModal.noInputs") || "No inputs defined"}
                                            </p>
                                        ) : (
                                            <div className="space-y-4">
                                                {editingTool.inputs.map((input, index) => (
                                                    <Card key={index} className="p-4 bg-surface/50">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <span className="text-sm font-medium text-muted">
                                                                Input #{index + 1}
                                                            </span>
                                                            <Button 
                                                                size="sm" 
                                                                variant="ghost" 
                                                                className="text-danger"
                                                                onPress={() => removeEditingInput(index)}
                                                            >
                                                                🗑️
                                                            </Button>
                                                        </div>
                                                        <div className="grid md:grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-xs font-medium mb-1">ID</label>
                                                                <input
                                                                    type="text"
                                                                    value={input.id}
                                                                    onChange={(e) => updateEditingInput(index, "id", e.target.value)}
                                                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background font-mono"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium mb-1">Label</label>
                                                                <input
                                                                    type="text"
                                                                    value={input.label}
                                                                    onChange={(e) => updateEditingInput(index, "label", e.target.value)}
                                                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium mb-1">Type</label>
                                                                <select
                                                                    value={input.type}
                                                                    onChange={(e) => updateEditingInput(index, "type", e.target.value)}
                                                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                                                >
                                                                    <option value="text">Text</option>
                                                                    <option value="textarea">Textarea</option>
                                                                    <option value="number">Number</option>
                                                                    <option value="select">Select</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium mb-1">Placeholder</label>
                                                                <input
                                                                    type="text"
                                                                    value={input.placeholder || ""}
                                                                    onChange={(e) => updateEditingInput(index, "placeholder", e.target.value)}
                                                                    className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                                                />
                                                            </div>
                                                            {input.type === "select" && (
                                                                <div className="md:col-span-2">
                                                                    <label className="block text-xs font-medium mb-1">
                                                                        Options (comma separated)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={input.options || ""}
                                                                        onChange={(e) => updateEditingInput(index, "options", e.target.value)}
                                                                        className="w-full px-2 py-1 text-sm border border-border rounded bg-background"
                                                                        placeholder="Option1, Option2, Option3"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={input.required}
                                                                    onChange={(e) => updateEditingInput(index, "required", e.target.checked)}
                                                                    className="rounded"
                                                                />
                                                                <label className="text-xs">Required</label>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Prompt Template */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-lg border-b border-border pb-2">
                                            {t("admin.editModal.promptTemplate") || "AI Prompt Template"}
                                        </h3>
                                        
                                        {editingTool.inputs.length > 0 && (
                                            <div className="text-xs text-muted bg-surface/50 p-2 rounded">
                                                <span className="font-medium">Available variables: </span>
                                                {editingTool.inputs.map((input, i) => (
                                                    <code key={i} className="mx-1 px-1 bg-accent/20 rounded">
                                                        {`{{${input.id}}}`}
                                                    </code>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <textarea
                                            value={editingTool.prompt_template}
                                            onChange={(e) => updateEditingField("prompt_template", e.target.value)}
                                            rows={10}
                                            className="w-full px-3 py-2 border border-border rounded-lg bg-surface font-mono text-sm resize-none"
                                            placeholder="You are an expert... Use {{variable}} to reference inputs."
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        
                        {/* Footer */}
                        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex justify-end gap-3">
                            <Button 
                                variant="ghost" 
                                onPress={() => {
                                    setEditModalOpen(false);
                                    setEditingTool(null);
                                }}
                            >
                                {t("common.cancel") || "Cancel"}
                            </Button>
                            <Button 
                                variant="primary"
                                onPress={saveEditedTool}
                                isDisabled={saving}
                            >
                                {saving 
                                    ? (t("common.saving") || "Saving...") 
                                    : (t("common.save") || "Save Changes")
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
