export interface ResponseFetchPokemon {
  species: {
    name: string;
    url: string;
  };
  order: number;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

const fetchPokemon = async (
  id: number,
  url?: string
): Promise<ResponseFetchPokemon | null> => {
  const urlFetchPokemon = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  if (url !== undefined && url !== urlFetchPokemon) {
    return null;
  }
  const response = await fetch(urlFetchPokemon);
  if (!response.ok) {
    return null;
  }
  return await response.json();
};

export default fetchPokemon;
