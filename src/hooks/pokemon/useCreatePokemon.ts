import { useState } from "react";

interface CreatePokemonData {
  name: string;
  number: number;
  types: string[];
  ability: string;
}

interface Pokemon {
  id: string;
  name: string;
  number?: number;
  types?: string[];
  ability?: string;
  imageUrl?: string;
}

export const useCreatePokemon = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPokemon = async (
    pokemonData: CreatePokemonData
  ): Promise<Pokemon | null> => {
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(`${API_URL}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemonData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Invalid data provided");
        } else if (response.status === 409) {
          const errorData = await response.json();
          throw new Error(errorData.message || "This Pokémon already exists");
        }
        throw new Error(`Error ${response.status}`);
      }

      const newPokemon = await response.json();
      return newPokemon;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPokemon,
    loading,
    error,
  };
};
