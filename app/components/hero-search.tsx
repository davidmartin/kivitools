"use client";

/**
 * HeroSearch Component
 * Feature: 016-hero-tool-search
 *
 * Main search bar component for the homepage hero section.
 * Searches official tools (client-side) and community tools (via API).
 * Shows auto-create CTA when results are few or none.
 * Uses React Portal for proper z-index handling above hero buttons.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { HeroSearchProps, SearchResult } from "@/types/search";
import {
  searchOfficialTools,
  searchCommunityTools,
  mergeSearchResults,
  debounce,
  areFewResults,
  getBuilderUrlWithQuery,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
} from "@/lib/search-utils";
import SearchResultItem from "./search-result-item";
import CreateToolCTA from "./create-tool-cta";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 10;
const MAX_OFFICIAL_RESULTS = 7;
const MAX_COMMUNITY_RESULTS = 5;

export default function HeroSearch({
  className = "",
  placeholder,
  onNavigate,
}: HeroSearchProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  // State
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommunityLoading, setIsCommunityLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
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

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
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
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: rect.width,
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
    async (searchQuery: string) => {
      if (searchQuery.length < MIN_QUERY_LENGTH) {
        setResults([]);
        setIsLoading(false);
        setIsCommunityLoading(false);
        setSearchError(null);
        return;
      }

      setIsLoading(true);
      setSearchError(null);

      try {
        // Search official tools (client-side) - immediate results
        const officialResults = searchOfficialTools(searchQuery, t, MAX_OFFICIAL_RESULTS);
        
        // Show official results immediately
        setResults(officialResults);
        setIsLoading(false);

        // Search community tools (API) - async with loading state
        setIsCommunityLoading(true);
        
        try {
          const communityResults = await searchCommunityTools(searchQuery, MAX_COMMUNITY_RESULTS);
          
          // Merge results: official tools appear first (with bonus), then community
          if (communityResults.length > 0) {
            const mergedResults = mergeSearchResults(
              officialResults,
              communityResults,
              MAX_RESULTS
            );
            setResults(mergedResults);
          }
        } catch (communityError) {
          console.error("Community search error:", communityError);
          // Keep official results on community search failure
        } finally {
          setIsCommunityLoading(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setSearchError(t("search.error") || "Search failed. Please try again.");
        setIsLoading(false);
        setIsCommunityLoading(false);
      }
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
      // Show recent searches when input is empty but focused
      if (value.length === 0) {
        setRecentSearches(getRecentSearches());
      }
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    saveRecentSearch(query);
    setIsOpen(false);
    setQuery("");

    if (onNavigate) {
      onNavigate(result.href);
    } else {
      router.push(result.href);
    }
  };

  // Handle create tool click
  const handleCreateToolClick = async () => {
    saveRecentSearch(query);
    setIsOpen(false);

    if (user) {
      // Authenticated user: redirect to builder with query param
      // The builder will call the auto-create API to get AI-generated config
      const builderUrl = getBuilderUrlWithQuery(query);
      if (onNavigate) {
        onNavigate(builderUrl);
      } else {
        router.push(builderUrl);
      }
    } else {
      // Unauthenticated user: save query to sessionStorage, redirect to login
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kivi_create_tool_query", query);
        sessionStorage.setItem("kivi_create_tool_language", language);
      }
      router.push(`/login?createTool=${encodeURIComponent(query)}`);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    performSearch(search);
  };

  // Handle clear recent searches
  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
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

  // Determine if we show prominent CTA (few results)
  const showProminentCTA = areFewResults(results.length);
  const showResults = query.length >= MIN_QUERY_LENGTH;
  const showRecentSearches = query.length === 0 && recentSearches.length > 0;
  const showKeyboardHint = query.length === 0 && recentSearches.length === 0 && !isLoading;

  // Determine if dropdown should be open
  const shouldShowDropdown = isOpen && (showResults || showRecentSearches || showKeyboardHint);

  // Dropdown content (rendered via portal for z-index)
  const dropdownContent = shouldShowDropdown && isMounted ? createPortal(
    <div
      id="search-results"
      ref={resultsRef}
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
        zIndex: 9999,
      }}
      className="
        bg-background border border-border rounded-lg
        shadow-xl overflow-hidden
        max-h-[400px] overflow-y-auto
      "
      role="listbox"
    >
      {/* Loading State */}
      {isLoading && (
        <div className="px-4 py-8 text-center text-muted">
          {t("search.loading")}
        </div>
      )}

      {/* Error State */}
      {searchError && !isLoading && (
        <div className="px-4 py-6 text-center">
          <p className="text-red-500 dark:text-red-400 mb-2">{searchError}</p>
          <button
            type="button"
            onClick={() => performSearch(query)}
            className="text-sm text-accent hover:underline"
          >
            {t("common.retry") || "Try again"}
          </button>
        </div>
      )}

      {/* Recent Searches (when empty query) */}
      {showRecentSearches && !isLoading && !searchError && (
        <>
          <div className="px-4 py-2 flex items-center justify-between border-b border-border">
            <span className="text-xs font-medium text-muted uppercase tracking-wide">
              {t("search.recentSearches")}
            </span>
            <button
              type="button"
              onClick={handleClearRecentSearches}
              className="text-xs text-accent hover:underline"
            >
              {t("search.clearRecent")}
            </button>
          </div>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleRecentSearchClick(search)}
              className="
                w-full px-4 py-2 text-left text-sm min-h-12
                hover:bg-surface transition-colors
                flex items-center gap-2
              "
            >
              <span className="text-muted">🕐</span>
              <span className="text-foreground">{search}</span>
            </button>
          ))}
        </>
      )}

      {/* Search Results */}
      {showResults && !isLoading && !searchError && (
        <>
          {results.length === 0 && !isCommunityLoading ? (
            // No Results
            <div className="px-4 py-8 text-center">
              <p className="text-muted mb-2">{t("search.noResults")}</p>
              <p className="text-sm text-muted/70">
                {t("search.trySearching")}
              </p>
            </div>
          ) : (
            // Results List
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
              
              {/* Community Loading Skeleton */}
              {isCommunityLoading && (
                <div className="px-4 py-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span className="animate-pulse">🔄</span>
                    <span>{t("search.loading")}</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Create Tool CTA */}
          {query.length >= MIN_QUERY_LENGTH && !isCommunityLoading && (
            <CreateToolCTA
              query={query}
              isProminent={showProminentCTA}
              onClick={handleCreateToolClick}
            />
          )}
        </>
      )}

      {/* Keyboard hint (shown when focused but not typing) */}
      {showKeyboardHint && (
        <div className="px-4 py-6 text-center">
          <p className="text-muted text-sm">
            {t("search.trySearching")}
          </p>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input */}
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none z-10">
          🔍
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t("search.placeholder")}
          aria-label={t("search.placeholder")}
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
          className="
            w-full pl-12 pr-12 py-4 
            text-lg text-foreground
            bg-surface border-2 border-border 
            rounded-xl
            focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
            placeholder:text-muted
            transition-all duration-200
            min-h-12
          "
        />
        {(isLoading || isCommunityLoading) && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted animate-spin z-10">
            ⏳
          </div>
        )}
      </div>

      {/* Dropdown via Portal (renders at body level for proper z-index) */}
      {dropdownContent}
    </div>
  );
}
