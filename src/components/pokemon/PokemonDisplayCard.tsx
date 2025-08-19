import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { Pokemon } from "../../types/pokemon";

const PokemonDisplayCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl capitalize flex items-center justify-between">
          {pokemon.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image */}
        {pokemon.imageUrl && (
          <div className="flex justify-center">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="w-48 h-48 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">ID:</label>
            <p className="text-lg break-all">{pokemon.id}</p>
          </div>

          {pokemon.number && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Number:
              </label>
              <p className="text-lg">#{pokemon.number}</p>
            </div>
          )}

          {pokemon.types && pokemon.types.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Types:
              </label>
              <div className="flex gap-2 mt-1">
                {pokemon.types.map((type) => (
                  <Badge key={type} variant="outline" className="capitalize">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {pokemon.ability && (
            <div>
              <label className="text-sm font-medium text-gray-600">
                Ability:
              </label>
              <p className="text-lg capitalize">{pokemon.ability}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonDisplayCard;
