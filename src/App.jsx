import { useEffect, useState } from "react";
import { fetchPokemonList } from "./services/api";
import PokemonCard from "./components/PokemanCard";
import PokemonModal from "./components/PokemonModal";
import { fetchPokemonDetails } from "./services/api";


export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [type, setType] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState([]);
  

  useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchPokemonList(page * 20);

     
      const details = await Promise.all(
        data.results.map((p) => fetchPokemonDetails(p.url))
      );

      setPokemonDetails(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [page]);
  const filteredPokemon = pokemonDetails.filter((p) => {
  const matchesSearch = p.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesType = type
    ? p.types.some((t) => t.type.name === type)
    : true;

  return matchesSearch && matchesType;
});
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const toggleFavorite = (name) => {
  setFavorites((prev) => {
    if (prev.includes(name)) {
      return prev.filter((f) => f !== name);
    } else {
      return [...prev, name];
    }
  });
};
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-blue-200 to-green-200 p-4">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-red-600 drop-shadow-lg">
         Pokedex Lite
      </h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        className="w-full p-3 border-4 border-yellow-400 rounded-full shadow-lg mb-4 focus:outline-none focus:ring-4 focus:ring-yellow-300"
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
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-3">
          <div className="w-14 h-14 border-4 border-yellow-400 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-lg font-bold text-blue-600">Loading Pokémon...</p>
        </div>

      ) : (



        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemon.map((p, index) => (
  <PokemonCard
    key={index}
    pokemon={{
      name: p.name,
      url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
    }}
    isFavorite={favorites.includes(p.name)}
    toggleFavorite={toggleFavorite}
    onClick={() => setSelectedPokemon(p)}
  />
))}
        </div>

      )}
      {selectedPokemon && (
  <PokemonModal
    pokemon={selectedPokemon}
    onClose={() => setSelectedPokemon(null)}
  />
)}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-yellow-400 px-4 py-2 rounded-full shadow hover:bg-yellow-500"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          ⬅ Prev
        </button>

        <span className="font-bold text-lg">
          Page {page + 1}
        </span>

        <button
          className="bg-yellow-400 px-4 py-2 rounded-full shadow hover:bg-yellow-500"
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}