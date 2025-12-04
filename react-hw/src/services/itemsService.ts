export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}
export interface CharactersResponse {
  results: Character[];
}

const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function searchItems(query: string): Promise<Character[]> {
  const url = query ? `${BASE_URL}/?name=${query}` : BASE_URL;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  const data: CharactersResponse = await res.json();
  return data.results;
}

export async function getById(id: string): Promise<Character> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Character not found");
  }

  return res.json();
}
