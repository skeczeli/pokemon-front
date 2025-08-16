import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePokemonSearch } from "../../hooks/pokemon/usePokemonSearch";
import PokemonGrid from "../../components/pokemon/PokemonGrid";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { pokemons, loading, error, searchPokemon } = usePokemonSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    searchPokemon(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        <form
          onSubmit={handleSearch}
          className="flex gap-2 mb-8 max-w-2xl mx-auto"
        >
          <Input
            type="text"
            placeholder="Search for a Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-red-600 text-white"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? "Loading..." : <Search className="h-4 w-4" />}
          </Button>
        </form>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center mb-4 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Resultados en grid */}
        {pokemons && pokemons.length > 0 && (
          <div className="mt-8">
            <PokemonGrid pokemons={pokemons} />
          </div>
        )}

        {/* Estado vacío - solo si ya se buscó algo (pokemons es array vacío) */}
        {pokemons && pokemons.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 mt-8">
            No Pokémon found for "{searchTerm}"
          </div>
        )}

        {/* Estado inicial - cuando pokemons es null */}
        {pokemons === null && !loading && (
          <div className="text-center text-gray-500 mt-8">
            Find a Pokémon by name.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
