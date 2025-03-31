export const TOTAL_PER_PAGE = 10;

export interface CharacterEvent {
  title: string;
  image: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Character {
  id: number;
  name: string;
  image: string;
  description: string;
  series: string[];
  events: string[];
  detailedEvents: CharacterEvent[];
}

export interface MarvelCharacterSerie {
  name: string;
}

export interface MarvelCharacterEvent {
  name: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  series: { items: MarvelCharacterSerie[] };
  events: { items: MarvelCharacterEvent[] };
}
