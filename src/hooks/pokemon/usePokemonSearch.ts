import { useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  ability?: string;
  type?: string;
  imageUrl?: string;
}

export const usePokemonSearch = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (query: string): Promise<void> => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(
        `${API_URL}/pokemons/${query.toLowerCase()}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Pokémon no encontrado");
        }
        throw new Error(`Error ${response.status}`);
      }

      const responseText = await response.text();
      console.log("Response TEXT:", responseText);

      const data = JSON.parse(responseText); // Parseamos manualmente
      console.log("Data parseada:", data);
      setPokemon(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemon,
    loading,
    error,
    searchPokemon,
  };
};
