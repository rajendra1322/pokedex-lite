const PokemonCard = ({ pokemon, isFavorite, toggleFavorite, onClick }) => {
  const id = pokemon.url.split("/")[6];

  return (
    <div
  onClick={onClick}
  className="relative bg-white border-4 border-yellow-300 rounded-2xl shadow-lg p-4 hover:scale-105 transition cursor-pointer"
>

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        className="mx-auto w-24 h-24"
      />

      <h2 className="text-center capitalize font-bold mt-2">
        {pokemon.name}
      </h2>

      <button
  onClick={(e) => {
    e.stopPropagation();
    toggleFavorite(pokemon.name);
  }}
  className="absolute top-2 right-5 text-2xl ransition transform hover:scale-110 active:scale-90"
>
  {isFavorite ? "❤️" : "🤍"}
</button>
<div className="flex justify-center gap-2 mt-2">
  {pokemon.types?.map((t, i) => (
    <span
      key={i}
      className="bg-blue-200 px-2 py-1 rounded text-xs capitalize"
    >
      {t.type.name}
    </span>
  ))}
</div>

    </div>
  );
};

export default PokemonCard;