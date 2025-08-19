import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePokemonById } from "../../hooks/pokemon/usePokemonById";
import { useDeletePokemon } from "../../hooks/pokemon/useDeletePokemon";
import { useUpdatePokemon } from "../../hooks/pokemon/useUpdatePokemon";
import PokemonDisplayCard from "@/components/pokemon/PokemonDisplayCard";
import DeleteAlert from "@/components/pokemon/DeleteAlert";
import { PokemonEditForm } from "@/components/pokemon/PokemonEditForm";
import type { CreatePokemonData } from "../../types/pokemon";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonById(id!);
  const {
    deletePokemon,
    loading: deleteLoading,
    error: deleteError,
  } = useDeletePokemon();
  const {
    updatePokemon,
    loading: updateLoading,
    error: updateError,
  } = useUpdatePokemon();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (!id) return;

    const success = await deletePokemon(id);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSave = async (data: CreatePokemonData) => {
    if (!id) return;

    const success = await updatePokemon(id, data);
    if (success) {
      setIsEditing(false);
      navigate(`/`); // cheap solution al problema de reload. Dsp averigüo cómo usar tanStack query
    }
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
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {!isEditing && (
            <div className="flex gap-2">
              <Button
                onClick={handleEdit}
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <DeleteAlert
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                handleDelete={handleDelete}
                deleteLoading={deleteLoading}
                pokemon={pokemon}
              />
            </div>
          )}
        </div>

        {/* Show error messages */}
        {deleteError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              Error deleting Pokémon: {deleteError}
            </p>
          </div>
        )}

        {updateError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              Error updating Pokémon: {updateError}
            </p>
          </div>
        )}

        {/* Conditional rendering: Edit form or Display card */}
        {isEditing ? (
          <Card>
            <CardContent className="p-6">
              <PokemonEditForm
                pokemon={pokemon}
                onSave={handleSave}
                onCancel={handleCancelEdit}
                loading={updateLoading}
              />
            </CardContent>
          </Card>
        ) : (
          <PokemonDisplayCard pokemon={pokemon} />
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
