"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null;

  const toCamelCase = (str: string) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: t("nav.home"), href: "/" },
    ];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      let label = path;

      // Try to translate
      if (index === 0) {
        // Platform
        const key = `nav.${path}`;
        const translated = t(key);
        if (translated !== key) {
          label = translated;
        } else {
           // Fallback formatting
           label = path.charAt(0).toUpperCase() + path.slice(1);
        }
      } else if (index === 1) {
        // Tool
        const camelCase = toCamelCase(path);
        const key = `${camelCase}.title`;
        const translated = t(key);
        if (translated !== key) {
          label = translated;
        } else {
           // Fallback formatting
           label = path
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      } else {
        // Other segments
        label = path
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-surface border-b border-border py-3 px-4"
    >
      <ol className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted">/</span>
              )}
              {isLast ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-accent hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
