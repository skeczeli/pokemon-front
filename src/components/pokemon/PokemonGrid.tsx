import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../../types/pokemon";

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
