import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePokemonById } from "../../hooks/pokemon/usePokemonById";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonById(id!);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Button onClick={handleBack} variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Pokémon not found</h2>
              <p className="text-gray-600">Couldn't find Pokémon by ID: {id}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Button onClick={handleBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl capitalize flex items-center justify-between">
              {pokemon.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">ID:</label>
              <p className="text-lg">{pokemon.id}</p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PokemonDetail;
