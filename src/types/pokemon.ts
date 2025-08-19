export interface Pokemon {
  id: string;
  name: string;
  number: number;
  types: string[];
  ability: string;
  imageUrl: string;
}

export interface CreatePokemonData {
  name: string;
  number: number;
  types: string[];
  ability: string;
}
