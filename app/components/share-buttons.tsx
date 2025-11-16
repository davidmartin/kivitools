"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export default function ShareButtons({
  url,
  title,
  description,
  className = "",
}: ShareButtonsProps) {
  const { t } = useLanguage();

  const fullUrl = url.startsWith("http") ? url : `https://kivitools.com${url}`;
  const shareText = description || title;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${fullUrl}`
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      fullUrl
    )}&text=${encodeURIComponent(title)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert(t("share.copied"));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        aria-label={t("share.twitter")}
      >
        🐦 Twitter
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        aria-label={t("share.facebook")}
      >
        📘 Facebook
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        aria-label={t("share.linkedin")}
      >
        💼 LinkedIn
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        aria-label={t("share.whatsapp")}
      >
        💬 WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-surface hover:bg-accent-hover border border-border text-foreground rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        aria-label={t("share.copy")}
      >
        📋 {t("share.copy")}
      </button>
    </div>
  );
}
