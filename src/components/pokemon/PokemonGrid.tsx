import React from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  id: string;
  name: string;
  type?: string;
}

interface PokemonGridProps {
  pokemons: Pokemon[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  if (pokemons.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="w-full sm:w-80 lg:w-72 max-w-sm">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
