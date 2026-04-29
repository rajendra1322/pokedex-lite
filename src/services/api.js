const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return res.json();
};

export const fetchPokemonDetails = async (url) => {
  const res = await fetch(url);
  return res.json();
};