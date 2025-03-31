import {
  fetchCharacter,
  fetchCharacterEvents,
} from "@/app/api/characters/services/marvel-api";
import { MarvelCharacterEvent, MarvelCharacterSerie } from "@/types";
import { CharacterEventResponse } from "@/app/api/characters/types/character";

export const getCharacterById = async (id: string) => {
  const char = await fetchCharacter(id);
  const eventsJson = await fetchCharacterEvents(id, 8);

  const events = eventsJson.map((event: CharacterEventResponse) => ({
    ...event,
    title: event.title,
    image: `${event.thumbnail.path}.${event.thumbnail.extension}`,
    description: event.description || "Evento retirado da API da Marvel.",
  }));

  const character = {
    name: char.name,
    image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
    description: char.description || "Sem descrição.",
    series: char.series.items.map((item: MarvelCharacterSerie) => item.name),
    events: char.events.items.map((item: MarvelCharacterEvent) => item.name),
    detailedEvents: events,
  };

  return { ...character, detailedEvents: events };
};
