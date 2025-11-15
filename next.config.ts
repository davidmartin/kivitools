import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizar imports de HeroUI
  transpilePackages: ["@heroui/react", "@heroui/styles"],

  // Opcional: Optimizar tamaño del bundle
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
};

export default nextConfig;
