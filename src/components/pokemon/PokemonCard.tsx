import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemon: {
    id: string;
    name: string;
    type?: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:scale-[1.02] transform"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg capitalize truncate">
          {pokemon.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">ID: {pokemon.id}</p>
        {pokemon.type && (
          <Badge variant="secondary" className="capitalize">
            {pokemon.type}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
