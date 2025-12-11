"use client";

import Link from "next/link";
import { Card } from "@heroui/react";
import { useTools } from "@/contexts/ToolsContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppwriteToolsListProps {
  platform: string;
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * Componente que muestra las tools de Appwrite para una plataforma
 * Reemplaza los arrays hardcodeados en las páginas hub
 */
export default function AppwriteToolsList({ 
  platform, 
  gradientFrom = "purple-500",
  gradientTo = "pink-500"
}: AppwriteToolsListProps) {
  const { getToolsByPlatform, loading } = useTools();
  const { language } = useLanguage();
  
  // Obtener tools filtradas por plataforma e idioma
  const tools = getToolsByPlatform(platform)
    .filter(tool => tool.language === language);
  
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface/50 rounded-2xl h-48 border border-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      {tools.map((tool) => {
        // Construir URL dinámica: /platform/slug-$id
        const href = `/${platform}/${tool.slug}-${tool.$id}`;
        
        return (
          <Link key={tool.$id} href={href} className="group block h-full">
            <Card className="glass-card h-full border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2">
              <Card.Header className="pt-8 px-8">
                <div className="flex items-start justify-between w-full mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-linear-to-br from-${gradientFrom}/20 to-${gradientTo}/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 border border-white/10`}>
                    {tool.icon}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-muted group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <Card.Title className={`text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-${gradientFrom} group-hover:to-${gradientTo} transition-all duration-300`}>
                  {tool.name}
                </Card.Title>
              </Card.Header>
              <Card.Content className="px-8 pb-8">
                <Card.Description className="text-muted text-lg leading-relaxed">
                  {tool.description}
                </Card.Description>
              </Card.Content>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
