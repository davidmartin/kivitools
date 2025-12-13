export default function ToolLoading() {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header skeleton - matches actual layout */}
                <div className="text-center mb-12">
                    <div className="h-6 w-24 bg-foreground/10 rounded-full mx-auto mb-4 animate-pulse" />
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-foreground/10 rounded-lg animate-pulse" />
                        <div className="h-12 w-64 bg-foreground/10 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-6 w-80 bg-foreground/5 rounded-lg mx-auto animate-pulse" />
                    <div className="h-4 w-40 bg-foreground/5 rounded-lg mx-auto mt-2 animate-pulse" />
                </div>

                {/* Form skeleton */}
                <div className="bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    {/* Input 1 */}
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-12 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    </div>
                    
                    {/* Input 2 - textarea */}
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-24 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    </div>
                    
                    {/* Input 3 - select */}
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-12 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    </div>
                    
                    {/* Turnstile placeholder */}
                    <div className="h-16 w-full bg-foreground/5 rounded-lg animate-pulse" />
                    
                    {/* Button */}
                    <div className="h-12 w-full bg-primary/20 rounded-lg animate-pulse" />
                </div>
            </div>
        </div>
    );
}
