import { useState } from "react";

interface Pokemon {
  id: string;
  name: string;
  ability?: string;
  type?: string;
  imageUrl?: string;
}

export const usePokemonSearch = () => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (query?: string): Promise<void> => {
    if (!query || !query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const url = `${API_URL}/pokemons?search=${encodeURIComponent(query)}`;

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pokémon not found");
        }
        throw new Error(`Error ${response.status}`);
      }

      const responseText = await response.text();
      console.log("Response TEXT:", responseText);

      const data = JSON.parse(responseText);
      console.log("Data:", data);

      setPokemons(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllPokemons = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const url = `${API_URL}/pokemons`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      setPokemons(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemons,
    loading,
    error,
    searchPokemon,
    getAllPokemons,
  };
};
