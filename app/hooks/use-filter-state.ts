"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export type SortOption = "featured" | "popular" | "new" | "all";

export interface FilterState {
  platform: string | null;
  sort: SortOption;
  search: string;
}

const DEFAULT_SORT: SortOption = "featured";

export function useFilterState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterState: FilterState = useMemo(() => ({
    platform: searchParams.get("platform"),
    sort: (searchParams.get("sort") as SortOption) || DEFAULT_SORT,
    search: searchParams.get("q") || "",
  }), [searchParams]);

  const setFilter = useCallback((updates: Partial<FilterState>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.platform !== undefined) {
      if (updates.platform) {
        params.set("platform", updates.platform);
      } else {
        params.delete("platform");
      }
    }

    if (updates.sort !== undefined) {
      if (updates.sort !== DEFAULT_SORT) {
        params.set("sort", updates.sort);
      } else {
        params.delete("sort");
      }
    }

    if (updates.search !== undefined) {
      if (updates.search) {
        params.set("q", updates.search);
      } else {
        params.delete("q");
      }
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  return { filterState, setFilter };
}
