import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePokemonList } from "../../hooks/pokemon/usePokemonList";
import SimplePaginatedList from "../../components/pokemon/PaginatedList";

const Home = () => {
  const { fetchPokemonList, loading, error } = usePokemonList();

  const navigate = useNavigate();

  const handleCreatePokemon = () => {
    navigate("/pokemon/create");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        {/* Botón para crear Pokémon */}
        <div className="text-center mb-8">
          <Button
            onClick={handleCreatePokemon}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Pokémon
          </Button>
        </div>

        {/* Lista paginada simple */}
        <SimplePaginatedList
          onFetchData={fetchPokemonList}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Home;
