import React, { useEffect, useState } from "react";
import PokemonGrid from "../pokemon/PokemonGrid";
import PaginationControls from "./PaginationControls";
import PaginatedSearch from "./PaginatedSearch";
import { usePagination } from "../../hooks/pokemon/usePagination";
import paginationConfig from "../../config/pagination.config";
import type { Pokemon } from "../../types/pokemon";

export interface PaginatedListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedListProps {
  onFetchData: (params: {
    page: number;
    limit: number;
    search?: string;
  }) => Promise<PaginatedListResponse<Pokemon>>;
  loading: boolean;
  error: string | null;
}

const PaginatedList: React.FC<PaginatedListProps> = ({
  onFetchData,
  loading,
  error,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  const pagination = usePagination(1, paginationConfig.defaultLimit);

  const loadData = async () => {
    console.log("📦 Loading data with:", {
      page: pagination.page,
      limit: pagination.limit,
      search: activeSearch,
    });

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(activeSearch.trim() && { search: activeSearch.trim() }),
      };

      const response = await onFetchData(params);
      console.log("📨 API response:", response);

      setPokemons(response.items);
      pagination.updateTotal(response.total);
    } catch (err) {
      console.error("Error loading Pokemon data:", err);
      setPokemons([]);
      pagination.updateTotal(0);
    }
  };

  useEffect(() => {
    if (hasSearched) {
      loadData();
    }
  }, [pagination.page, pagination.limit]);

  const handleSearch = (term: string) => {
    console.log("🔍 Searching for:", term);

    setActiveSearch(term);
    pagination.goToPage(1);
    setHasSearched(true);

    const searchData = async () => {
      try {
        const params = {
          page: 1,
          limit: pagination.limit,
          ...(term.trim() && { search: term.trim() }),
        };

        const response = await onFetchData(params);
        setPokemons(response.items);
        pagination.updateTotal(response.total);
      } catch (err) {
        console.error("Error searching:", err);
        setPokemons([]);
        pagination.updateTotal(0);
      }
    };

    searchData();
  };

  const hasResults = pokemons.length > 0;
  const showEmptyState = hasSearched && !hasResults && !loading && !error;
  const showInitialState = !hasSearched;

  return (
    <div className="space-y-6">
      {/* Búsqueda */}
      <PaginatedSearch
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center mb-4 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Resultados CON PAGINACIÓN */}
      {hasResults && (
        <div className="space-y-6">
          <PokemonGrid pokemons={pokemons} />

          <PaginationControls
            page={pagination.page}
            totalPages={pagination.totalPages}
            canGoNext={pagination.canGoNext}
            canGoPrev={pagination.canGoPrev}
            onPageChange={pagination.goToPage}
            currentLimit={pagination.limit}
            onLimitChange={pagination.setLimit}
            totalItems={pagination.total}
          />
        </div>
      )}

      {/* Estado vacío */}
      {showEmptyState && (
        <div className="text-center text-gray-500 mt-8">
          <div className="max-w-md mx-auto">
            <p className="text-lg mb-2">No Pokémon found</p>
            {activeSearch.trim() && (
              <p className="text-sm">No results for "{activeSearch}"</p>
            )}
          </div>
        </div>
      )}

      {/* Estado inicial */}
      {showInitialState && (
        <div className="text-center text-gray-500 mt-8">
          <div className="max-w-md mx-auto">
            <p className="text-lg mb-2">Welcome to the Pokédex!</p>
            <p className="text-sm">
              Search for a Pokémon by name to get started.
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 mt-8">
          <div className="max-w-md mx-auto">
            <p className="text-lg">Loading Pokémon...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedList;
