// App.tsx con React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PokemonDetail from "./pages/pokemon_details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
