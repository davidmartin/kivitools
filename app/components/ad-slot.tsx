"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    // Cargar anuncios cuando el componente se monta
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Reemplazar con tu ID de AdSense
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
