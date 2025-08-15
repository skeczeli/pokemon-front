import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePokemonSearch } from "../../hooks/pokemon/usePokemonSearch";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { pokemon, loading, error, searchPokemon } = usePokemonSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPokemon(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Buscando..." : <Search className="h-4 w-4" />}
          </Button>
        </form>

        {/* Error */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Resultado */}
        {pokemon && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold capitalize mb-2">
              {pokemon.name}
            </h2>
            <p>ID: {pokemon.id}</p>
            {pokemon.type && <p>Tipo: {pokemon.type}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
