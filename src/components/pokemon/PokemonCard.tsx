import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    number?: number;
    types?: string[];
    imageUrl?: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] transform"
      onClick={handleClick}
    >
      {/* Image */}
      {pokemon.imageUrl && (
        <div className="p-4 pb-2 flex justify-center">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-24 h-24 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <CardHeader className={`${pokemon.imageUrl ? "pt-2 pb-2" : "pb-2"}`}>
        <CardTitle className="text-lg capitalize truncate text-center">
          {pokemon.name}
        </CardTitle>
        {pokemon.number && (
          <p className="text-sm text-gray-500 text-center">#{pokemon.number}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-2 pt-0">
        {pokemon.types && pokemon.types.length > 0 && (
          <div className="flex gap-1 justify-center flex-wrap">
            {pokemon.types.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="capitalize text-xs"
              >
                {type}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
