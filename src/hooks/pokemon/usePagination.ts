import { useState, useCallback } from "react";

export interface UsePaginationReturn {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  updateTotal: (total: number) => void;
  setLimit: (limit: number) => void;
}

export const usePagination = (
  initialPage: number = 1,
  initialLimit: number = Number(import.meta.env.VITE_DEFAULT_PAGE_LIMIT ?? 10)
): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);
  const canGoNext = page < totalPages;
  const canGoPrev = page > 1;

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setPage((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setPage((prev) => prev - 1);
    }
  }, [canGoPrev]);

  const updateTotal = useCallback(
    (newTotal: number) => {
      setTotal(newTotal);
      const newTotalPages = Math.ceil(newTotal / limit);
      if (page > newTotalPages && newTotalPages > 0) {
        setPage(1);
      }
    },
    [limit, page]
  );

  const setLimit = useCallback(
    (newLimit: number) => {
      setLimitState(newLimit);
      const currentFirstItem = (page - 1) * limit + 1;
      const newPage = Math.ceil(currentFirstItem / newLimit);
      setPage(Math.max(1, newPage));
    },
    [page, limit]
  );

  return {
    page,
    limit,
    totalPages,
    total,
    canGoNext,
    canGoPrev,
    goToPage,
    goToNext,
    goToPrev,
    updateTotal,
    setLimit,
  };
};
