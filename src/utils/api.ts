import { Pokemon } from '../types/pokemon';

export const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  const res = await fetch(url);
  return await res.json();
};