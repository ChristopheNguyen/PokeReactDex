export interface ResponseFetchPokedex {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const fetchPokedex = async (
  offset: number,
  limit: number
): Promise<ResponseFetchPokedex | null> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    return null;
  }
  return await response.json();
};

export default fetchPokedex;
