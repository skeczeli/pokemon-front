import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCreatePokemon } from "../../hooks/pokemon/useCreatePokemon";

const CreatePokemon = () => {
  const navigate = useNavigate();
  const { createPokemon, loading, error } = useCreatePokemon();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    ability: "",
  });

  const [types, setTypes] = useState<string[]>([]);
  const [currentType, setCurrentType] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addType = () => {
    if (
      currentType.trim() &&
      !types.includes(currentType.toLowerCase()) &&
      types.length < 3
    ) {
      setTypes((prev) => [...prev, currentType.toLowerCase()]);
      setCurrentType("");
    }
  };

  const removeType = (typeToRemove: string) => {
    setTypes((prev) => prev.filter((type) => type !== typeToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    const pokemonData = {
      name: formData.name.toLowerCase().trim(),
      number: parseInt(formData.number),
      types: types,
      ability: formData.ability.trim(),
    };

    const newPokemon = await createPokemon(pokemonData);

    if (newPokemon) navigate(`/pokemon/${newPokemon.id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Button onClick={handleBack} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Plus className="h-8 w-8" />
              Create a new Pokémon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error */}
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="pikachu"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="lowercase"
                />
              </div>

              {/* Number */}
              <div className="space-y-2">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  placeholder="25"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="1000"
                />
              </div>

              {/* Types */}
              <div className="space-y-2">
                <Label>Types</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="electric"
                    value={currentType}
                    onChange={(e) => setCurrentType(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addType();
                      }
                    }}
                    className="lowercase"
                  />
                  <Button
                    type="button"
                    onClick={addType}
                    disabled={!currentType.trim() || types.length >= 3}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>

                {/* Added types */}
                {types.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {types.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="capitalize cursor-pointer"
                        onClick={() => removeType(type)}
                      >
                        {type} ×
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  Maximum 3 types. Click on a type to remove it.
                </p>
              </div>

              {/* Ability */}
              <div className="space-y-2">
                <Label htmlFor="ability">Ability</Label>
                <Input
                  id="ability"
                  name="ability"
                  type="text"
                  placeholder="static"
                  value={formData.ability}
                  onChange={handleInputChange}
                  className="lowercase"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.name.trim() ||
                    !formData.ability.trim() ||
                    types.length === 0
                  }
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? "Creating..." : "Create Pokémon"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePokemon;
