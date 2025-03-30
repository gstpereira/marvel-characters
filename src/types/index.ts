export interface CharacterEvent {
  title: string;
  image: string;
  description: string;
}

export interface Character {
  name: string;
  image: string;
  description: string;
  series: string[];
  events: string[];
  detailedEvents: CharacterEvent[];
}
