import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LimitSelector from "./LimitSelector";

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  onPageChange: (page: number) => void;
  currentLimit: number;
  onLimitChange: (limit: number) => void;
  totalItems?: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  canGoNext,
  canGoPrev,
  onPageChange,
  currentLimit,
  onLimitChange,
  totalItems,
}) => {
  if (totalPages <= 1 && !totalItems) {
    return null;
  }

  const startItem = (page - 1) * currentLimit + 1;
  const endItem = totalItems
    ? Math.min(page * currentLimit, totalItems)
    : page * currentLimit;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Info de resultados */}
      {totalItems && (
        <div className="text-sm text-gray-600">
          Showing {startItem}-{endItem} of {totalItems} Pokémon
        </div>
      )}

      {/* Controles de navegación */}
      <div className="flex items-center gap-4">
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {/* Página anterior */}
            <Button
              variant="outline"
              onClick={() => onPageChange(page - 1)}
              disabled={!canGoPrev}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            {/* Indicador de página */}
            <span className="text-sm text-gray-600 px-2">
              Page {page} of {totalPages}
            </span>

            {/* Página siguiente */}
            <Button
              variant="outline"
              onClick={() => onPageChange(page + 1)}
              disabled={!canGoNext}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Selector de límite por página */}
        <LimitSelector
          currentLimit={currentLimit}
          onLimitChange={onLimitChange}
        />
      </div>
    </div>
  );
};

export default PaginationControls;
