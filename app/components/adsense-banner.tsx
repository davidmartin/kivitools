"use client";

import { useEffect } from "react";

interface AdSenseBannerProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
    responsive?: boolean;
    className?: string;
}

/**
 * AdSense Banner Component
 * 
 * Use this component to place ads in controlled locations.
 * 
 * IMPORTANT: To use manual ads instead of Auto Ads:
 * 1. Go to AdSense Dashboard > Ads > By site
 * 2. Turn OFF "Auto ads" for kivitools.com
 * 3. Create ad units and get their slot IDs
 * 4. Use this component with the slot IDs
 * 
 * Example slots to create in AdSense:
 * - "tool-page-bottom" - Below tool content
 * - "sidebar" - For sidebar placement
 * - "in-feed" - Between content items
 */
export default function AdSenseBanner({
    slot,
    format = "auto",
    responsive = true,
    className = "",
}: AdSenseBannerProps) {
    useEffect(() => {
        try {
            // Push ad after component mounts
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, []);

    return (
        <div className={`ad-container overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2958996148094482"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
}

/**
 * Placeholder component to show where ads will appear
 * Use during development or when AdSense is not configured
 */
export function AdPlaceholder({ className = "" }: { className?: string }) {
    if (process.env.NODE_ENV === "production") {
        return null;
    }
    
    return (
        <div 
            className={`ad-container bg-muted/20 border-2 border-dashed border-muted/40 rounded-lg flex items-center justify-center text-muted text-sm ${className}`}
            style={{ minHeight: "90px" }}
        >
            [Ad Space - Configure in AdSense]
        </div>
    );
}
