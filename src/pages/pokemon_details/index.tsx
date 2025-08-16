import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePokemonById } from "../../hooks/pokemon/usePokemonById";
import { useDeletePokemon } from "../../hooks/pokemon/useDeletePokemon";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonById(id!);
  const {
    deletePokemon,
    loading: deleteLoading,
    error: deleteError,
  } = useDeletePokemon();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (!id) return;

    const success = await deletePokemon(id);
    if (success) {
      setIsDeleteDialogOpen(false);
      navigate(-1); // Volver a la lista después de eliminar
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
  //TODO: Extract alert as component
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 hover:bg-red-600"
                variant="destructive"
                disabled={deleteLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border border-gray-200 shadow-xl max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-900">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700">
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="font-semibold capitalize text-gray-900">
                    {pokemon.name}
                  </span>{" "}
                  from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {deleteError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">
              Error deleting Pokémon: {deleteError}
            </p>
          </div>
        )}

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
                      <Badge
                        key={type}
                        variant="outline"
                        className="capitalize"
                      >
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
      </div>
    </div>
  );
};

export default PokemonDetail;
