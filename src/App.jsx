import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPokemonList, fetchPokemonDetails } from "./services/api";
import PokemonCard from "./components/PokemanCard";
import PokemonModal from "./components/PokemonModal";
import logo from './assets/logos.png'

export default function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [type, setType] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemonList(page * 20);

      if (!data || !data.results) {
        throw new Error("Invalid API response");
      }

      const details = await Promise.all(
        data.results.map((p) => fetchPokemonDetails(p.url))
      );

      setPokemonDetails(details);
    } catch (err) {
      console.error(err);
      setError("Failed to load Pokémon. Please try again.");
      setPokemonDetails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const updated = prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredPokemon = pokemonDetails.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType = type
      ? p.types.some((t) => t.type.name === type)
      : true;

    return matchesSearch && matchesType;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-yellow-200 via-blue-200 to-green-200 p-4"
    >
     <div className="flex items-center justify-center gap-3">
  <img
    src={logo}
    alt="logo"
    className="w-10 h-10 animate-bounce mb-12"
  />

  <h1 className="text-4xl font-extrabold text-red-600 mb-12">
    Pokedex Lite
  </h1>
</div>

      <input
        type="text"
        placeholder="Search Pokemon..."
        className="w-full p-3 border-4 border-yellow-400 rounded-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 border-4 border-yellow-400 rounded-full mb-4"
      >
        <option value="">All Types</option>
        <option value="fire">🔥 Fire</option>
        <option value="water">💧 Water</option>
        <option value="grass">🌱 Grass</option>
        <option value="electric">⚡ Electric</option>
      </select>

      {error ? (
        <div className="text-red-600 font-bold text-center mt-10">
          {error}
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-semibold">Loading Pokémon...</p>
        </div>
      ) : (
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemon.map((p) => (
            <PokemonCard
              key={p.id}
              pokemon={p}
              isFavorite={favorites.includes(p.name)}
              toggleFavorite={toggleFavorite}
              onClick={() => setSelectedPokemon(p)}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-row sm:flex-row items-center justify-center gap-4 sm:gap-10 mt-4">

        <button className="px-4 py-2 bg-yellow-400 rounded-full flex items-center gap-2" onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ← Prev
        </button>

        <span className="text-lg font-semibold">
          Page {page}
        </span>

        <button className="px-4 py-2 bg-yellow-400 rounded-full flex items-center gap-2" onClick={() => setPage((p) => p + 1)}>
          Next →
        </button>

      </div>
    </motion.div>
  );
}