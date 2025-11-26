 "use client";

import { useEffect, useRef } from "react";
import { useCookieConsentSafe } from "@/contexts/CookieConsentContext";

// Extend Window interface for AdSense
declare global {
  interface Window {
    adsbygoogle?: { push: (params: object) => void }[];
  }
}

interface AdSlotProps {
  slotId: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSlot({
  slotId,
  format = "auto",
  className = "",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adLoaded = useRef(false);
  const { preferences } = useCookieConsentSafe();

  useEffect(() => {
    // Only load ads if advertising consent is given
    if (!preferences?.advertising) return;
    
    // Only load ads once per component
    if (adLoaded.current) return;

    // Check if the ad element exists and doesn't already have an ad
    const adElement = adRef.current;
    if (!adElement) return;

    // Check if this specific ins element already has an ad loaded
    if (adElement.getAttribute("data-adsbygoogle-status")) {
      adLoaded.current = true;
      return;
    }

    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      }
    } catch (err) {
      // Silently ignore "already have ads" error - this is expected behavior
      if (err instanceof Error && err.message.includes("already have ads")) {
        adLoaded.current = true;
      } else {
        console.error("AdSense error:", err);
      }
    }
  }, [slotId, preferences?.advertising]);

  // Don't render if advertising consent is not given
  if (!preferences?.advertising) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense ID
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
