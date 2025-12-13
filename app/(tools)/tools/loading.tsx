export default function ToolsLoading() {
    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="h-10 w-64 bg-foreground/10 rounded-lg mx-auto mb-4 animate-pulse" />
                    <div className="h-6 w-96 bg-foreground/5 rounded-lg mx-auto animate-pulse" />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="h-12 w-64 bg-foreground/5 rounded-lg animate-pulse" />
                    <div className="h-12 w-48 bg-foreground/5 rounded-lg animate-pulse" />
                    <div className="h-12 w-36 bg-foreground/5 rounded-lg animate-pulse" />
                    <div className="h-12 w-36 bg-foreground/5 rounded-lg animate-pulse" />
                </div>

                {/* Grid of tool cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-surface rounded-2xl p-6 space-y-4 border border-border/50 animate-pulse"
                        >
                            {/* Platform badge */}
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 bg-foreground/10 rounded" />
                                <div className="h-4 w-16 bg-foreground/10 rounded" />
                            </div>
                            {/* Title */}
                            <div className="h-6 w-3/4 bg-foreground/10 rounded" />
                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-foreground/5 rounded" />
                                <div className="h-4 w-2/3 bg-foreground/5 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
