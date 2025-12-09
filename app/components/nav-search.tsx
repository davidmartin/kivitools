"use client";

/**
 * NavSearch Component
 * Compact search bar for the navigation header.
 * Searches official tools and shows dropdown with results.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { SearchResult } from "@/types/search";
import {
  searchOfficialTools,
  debounce,
} from "@/lib/search-utils";
import SearchResultItem from "./search-result-item";

const DEBOUNCE_MS = 200;
const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 8;

export default function NavSearch() {
  const { t } = useLanguage();
  const router = useRouter();

  // State
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mount check for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update dropdown position when opening or on scroll/resize
  useEffect(() => {
    function updatePosition() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: Math.max(rect.width, 320),
        });
      }
    }

    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // Search function
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length < MIN_QUERY_LENGTH) {
        setResults([]);
        return;
      }

      const officialResults = searchOfficialTools(searchQuery, t, MAX_RESULTS);
      setResults(officialResults);
    },
    [t]
  );

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((q: string) => performSearch(q), DEBOUNCE_MS),
    [performSearch]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.length >= MIN_QUERY_LENGTH) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    router.push(result.href);
  };

  // Handle Enter key to go to /tools with search
  const handleSearchSubmit = () => {
    if (query.trim().length >= MIN_QUERY_LENGTH) {
      setIsOpen(false);
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "ArrowDown" || event.key === "Enter") {
        if (query.length >= MIN_QUERY_LENGTH) {
          setIsOpen(true);
        }
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        } else if (query.trim().length >= MIN_QUERY_LENGTH) {
          // If no result selected, search in /tools page
          handleSearchSubmit();
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const shouldShowDropdown = isOpen && query.length >= MIN_QUERY_LENGTH && isMounted;

  // Dropdown content (rendered via portal for z-index)
  const dropdownContent = shouldShowDropdown ? createPortal(
    <div
      id="nav-search-results"
      ref={resultsRef}
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        zIndex: 9999,
      }}
      className="
        bg-surface border border-border rounded-xl
        shadow-2xl overflow-hidden
        max-h-[400px] overflow-y-auto
      "
      role="listbox"
    >
      {results.length === 0 ? (
        <div className="px-4 py-8 text-center text-muted text-sm">
          {t("search.noResults")}
        </div>
      ) : (
        <>
          {results.map((result, index) => (
            <div key={result.id} data-index={index}>
              <SearchResultItem
                result={result}
                isSelected={index === selectedIndex}
                onClick={() => handleResultClick(result)}
              />
            </div>
          ))}
          
          {/* View All Results Link */}
          <div className="border-t border-border bg-surface-soft">
            <button
              onClick={handleSearchSubmit}
              className="w-full px-4 py-3 text-sm text-accent hover:bg-accent-soft/30 transition-colors text-center font-medium"
            >
              Ver todos los resultados en /tools →
            </button>
          </div>
        </>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none text-base">
          🔍
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= MIN_QUERY_LENGTH && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("search.placeholder")}
          aria-label={t("search.placeholder")}
          aria-expanded={isOpen}
          aria-controls="nav-search-results"
          aria-autocomplete="list"
          role="combobox"
          className="
            w-48 lg:w-64 xl:w-80
            pl-10 pr-4 py-2.5
            text-sm text-foreground
            bg-surface border border-border
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
            focus:bg-surface focus:w-80
            placeholder:text-muted
            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        />
      </div>

      {/* Dropdown via Portal */}
      {dropdownContent}
    </div>
  );
}
