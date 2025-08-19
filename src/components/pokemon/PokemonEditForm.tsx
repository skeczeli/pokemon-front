import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, X, Plus } from "lucide-react";
import type { Pokemon, CreatePokemonData } from "../../types/pokemon";

interface PokemonEditFormProps {
  pokemon: Pokemon;
  onSave: (data: CreatePokemonData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const PokemonEditForm = ({
  pokemon,
  onSave,
  onCancel,
  loading = false,
}: PokemonEditFormProps) => {
  const [formData, setFormData] = useState({
    name: pokemon.name,
    number: pokemon.number,
    types: [...pokemon.types],
    ability: pokemon.ability,
    imageUrl: pokemon.imageUrl,
  });
  const [newType, setNewType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addType = () => {
    if (
      newType.trim() &&
      !formData.types.includes(newType.trim().toLowerCase())
    ) {
      setFormData((prev) => ({
        ...prev,
        types: [...prev.types, newType.trim().toLowerCase()],
      }));
      setNewType("");
    }
  };

  const removeType = (typeToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      types: prev.types.filter((type) => type !== typeToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addType();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image */}
      <div className="flex justify-center">
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt={formData.name}
            className="w-48 h-48 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Name:
          </label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-lg"
            required
          />
        </div>

        {/* Number */}
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Number:
          </label>
          <Input
            type="number"
            value={formData.number}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                number: parseInt(e.target.value) || 0,
              }))
            }
            className="text-lg"
            min="1"
          />
        </div>

        {/* Types */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Types:
          </label>
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {formData.types.map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="capitalize flex items-center gap-1"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => removeType(type)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add new type..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addType}
                variant="outline"
                size="sm"
                disabled={!newType.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Ability */}
        <div>
          <label className="text-sm font-medium text-gray-600">Ability:</label>
          <Input
            value={formData.ability}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ability: e.target.value }))
            }
            className="text-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Apply Changes"}
        </Button>
      </div>
    </form>
  );
};
