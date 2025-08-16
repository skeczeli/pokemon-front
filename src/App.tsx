import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PokemonDetail from "./pages/pokemon_details";
import CreatePokemon from "./pages/create_pokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/pokemon/create" element={<CreatePokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
