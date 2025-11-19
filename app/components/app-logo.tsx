import Image from "next/image";

interface AppLogoProps {
  className?: string;
  variant?: "default" | "compact";
}

export default function AppLogo({ className = "", variant = "default" }: AppLogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Glow effect behind the logo */}
      <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Image
        src={variant === "compact" ? "/logo.png" : "/logo-title.png"}
        alt="KiviTools"
        width={variant === "compact" ? 40 : 200}
        height={variant === "compact" ? 40 : 60}
        priority
        className={`
          relative z-10 object-contain dark:invert transition-all duration-300
          ${variant === "compact" ? "h-8 w-8" : "h-10 w-auto"}
          drop-shadow-sm group-hover:drop-shadow-md
        `}
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
