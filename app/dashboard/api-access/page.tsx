"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { Copy, Check, Eye, EyeOff, Trash2, RefreshCw, Key, ArrowLeft, AlertTriangle } from "lucide-react";

interface TokenInfo {
    id: string;
    name: string | null;
    createdAt: string;
    lastUsedAt: string | null;
    isActive: boolean;
    tokenPreview: string;
}

interface UsageInfo {
    used: number;
    remaining: number;
    limit: number;
    canRenew: boolean;
}

interface NewToken {
    token: string;
    name: string | null;
}

export default function ApiAccessPage() {
    const { user, loading: authLoading } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [usage, setUsage] = useState<UsageInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [renewing, setRenewing] = useState(false);
    const [newToken, setNewToken] = useState<NewToken | null>(null);
    const [showToken, setShowToken] = useState(false);
    const [copied, setCopied] = useState(false);
    const [tokenName, setTokenName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchTokensAndUsage();
        }
    }, [user]);

    const fetchTokensAndUsage = async () => {
        try {
            const response = await fetch("/api/v1/tokens");
            const data = await response.json();
            
            if (data.success) {
                setTokens(data.tokens);
                setUsage(data.usage);
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Failed to fetch tokens:", err);
            setError("Failed to load API data");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateToken = async () => {
        setCreating(true);
        setError("");
        
        try {
            const response = await fetch("/api/v1/tokens", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: tokenName || null })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setNewToken({ token: data.token, name: tokenName || null });
                setTokenName("");
                await fetchTokensAndUsage();
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Failed to create token:", err);
            setError("Failed to create token");
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteToken = async (tokenId: string) => {
        if (!confirm(t("apiAccess.confirmDelete"))) return;
        
        try {
            const response = await fetch(`/api/v1/tokens?tokenId=${tokenId}`, {
                method: "DELETE"
            });
            
            const data = await response.json();
            
            if (data.success) {
                await fetchTokensAndUsage();
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Failed to delete token:", err);
            setError("Failed to delete token");
        }
    };

    const handleRenewLimit = async () => {
        setRenewing(true);
        setError("");
        
        try {
            const response = await fetch("/api/v1/tokens", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "renew" })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setUsage(data.usage);
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error("Failed to renew limit:", err);
            setError("Failed to renew limit");
        } finally {
            setRenewing(false);
        }
    };

    const copyToken = async () => {
        if (newToken) {
            await navigator.clipboard.writeText(newToken.token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
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
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    {t("apiAccess.backToDashboard")}
                </Link>
                <h1 className="text-3xl font-bold mb-2">{t("apiAccess.title")}</h1>
                <p className="text-muted">{t("apiAccess.subtitle")}</p>
            </div>

            {error && (
                <Card className="p-4 mb-6 bg-danger/10 border-danger/20">
                    <p className="text-danger">{error}</p>
                </Card>
            )}

            {/* Usage Stats */}
            {usage && (
                <Card className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{t("apiAccess.usage.title")}</h2>
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="text-3xl font-bold text-foreground">{usage.remaining}</span>
                                    <span className="text-muted">/{usage.limit}</span>
                                </div>
                                <div className="text-sm text-muted">
                                    {t("apiAccess.usage.requestsRemaining")}
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="mt-3 w-full bg-border rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full transition-all ${
                                        usage.remaining === 0 ? 'bg-danger' : 
                                        usage.remaining < 20 ? 'bg-warning' : 'bg-success'
                                    }`}
                                    style={{ width: `${(usage.remaining / usage.limit) * 100}%` }}
                                />
                            </div>
                        </div>
                        
                        {/* Renew Button - Only shows when limit is exhausted */}
                        {usage.canRenew && (
                            <Button
                                variant="primary"
                                size="lg"
                                onPress={handleRenewLimit}
                                isDisabled={renewing}
                                className="shrink-0"
                            >
                                {renewing ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                        {t("apiAccess.usage.renewing")}
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        {t("apiAccess.usage.addMore")}
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                    
                    {usage.remaining === 0 && (
                        <div className="mt-4 p-3 bg-warning/10 rounded-lg flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-medium text-warning">{t("apiAccess.usage.limitReached")}</p>
                                <p className="text-muted">{t("apiAccess.usage.limitReachedDesc")}</p>
                            </div>
                        </div>
                    )}
                </Card>
            )}

            {/* New Token Alert */}
            {newToken && (
                <Card className="p-6 mb-8 bg-success/10 border-success/20">
                    <div className="flex items-start gap-3 mb-4">
                        <Key className="w-6 h-6 text-success shrink-0" />
                        <div>
                            <h3 className="font-bold text-success">{t("apiAccess.newToken.title")}</h3>
                            <p className="text-sm text-muted">{t("apiAccess.newToken.warning")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-background p-3 rounded-lg font-mono text-sm">
                        <code className="flex-1 break-all">
                            {showToken ? newToken.token : "•".repeat(64)}
                        </code>
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={() => setShowToken(!showToken)}
                        >
                            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={copyToken}
                        >
                            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3"
                        onPress={() => setNewToken(null)}
                    >
                        {t("apiAccess.newToken.dismiss")}
                    </Button>
                </Card>
            )}

            {/* Create Token */}
            <Card className="p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">{t("apiAccess.create.title")}</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder={t("apiAccess.create.namePlaceholder")}
                        className="flex-1 px-4 py-3 border border-border rounded-lg bg-surface text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button
                        variant="primary"
                        onPress={handleCreateToken}
                        isDisabled={creating || tokens.filter(t => t.isActive).length >= 5}
                    >
                        {creating ? t("apiAccess.create.creating") : t("apiAccess.create.button")}
                    </Button>
                </div>
                <p className="text-xs text-muted mt-2">
                    {t("apiAccess.create.hint")} ({tokens.filter(t => t.isActive).length}/5 {t("apiAccess.create.active")})
                </p>
            </Card>

            {/* Tokens List */}
            <Card className="p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">{t("apiAccess.tokens.title")}</h2>
                
                {tokens.length === 0 ? (
                    <div className="text-center py-8 text-muted">
                        <Key className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>{t("apiAccess.tokens.empty")}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tokens.map((token) => (
                            <div 
                                key={token.id} 
                                className={`p-4 rounded-lg border ${
                                    token.isActive ? 'border-border bg-surface' : 'border-border/50 bg-surface/50 opacity-60'
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium">
                                                {token.name || t("apiAccess.tokens.unnamed")}
                                            </span>
                                            <Chip
                                                size="sm"
                                                className={token.isActive ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted'}
                                            >
                                                {token.isActive ? t("apiAccess.tokens.active") : t("apiAccess.tokens.revoked")}
                                            </Chip>
                                        </div>
                                        <div className="text-xs text-muted font-mono">
                                            {token.tokenPreview}
                                        </div>
                                        <div className="text-xs text-muted mt-1">
                                            {t("apiAccess.tokens.created")}: {formatDate(token.createdAt)}
                                            {token.lastUsedAt && (
                                                <> • {t("apiAccess.tokens.lastUsed")}: {formatDate(token.lastUsedAt)}</>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {token.isActive && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onPress={() => handleDeleteToken(token.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            {t("apiAccess.tokens.delete")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* API Documentation */}
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">{t("apiAccess.docs.title")}</h2>
                <div className="bg-surface rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-muted">
{`# Example API Request
curl -X POST https://kivitools.com/api/v1/tools/tiktok/script-writer \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '{
    "topic": "productivity tips",
    "tone": "friendly",
    "duration": "30-60s",
    "language": "en"
  }'`}
                    </pre>
                </div>
                <div className="mt-4 text-sm text-muted">
                    <p className="mb-2"><strong>{t("apiAccess.docs.availableTools")}:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>TikTok: script-writer, video-ideas, hook-generator, hashtag-generator, username-generator, bio-generator</li>
                        <li>Instagram: caption-generator, bio-generator, hashtag-generator, story-ideas, reel-ideas</li>
                        <li>YouTube: title-generator, description-generator, script-generator, tag-generator, video-ideas</li>
                        <li>Twitter: tweet-generator, thread-maker, bio-generator</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
}
