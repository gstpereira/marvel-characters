export interface MarvelCharacterResponse {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  series: { items: { name: string }[] };
  events: { items: { name: string }[] };
}

export interface MarvelEventResponse {
  title: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

export interface FetchCharactersParams {
  limit: number;
  offset: number;
  name?: string;
}

export interface CharacterEventResponse {
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
