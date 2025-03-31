import { fetchCharacters } from "@/app/api/characters/services/marvel-api";
import {
  MarvelCharacter,
  MarvelCharacterEvent,
  MarvelCharacterSerie,
  TOTAL_PER_PAGE,
} from "@/types";

export async function listCharacters(page: number = 1, name: string = "") {
  const offset = (page - 1) * TOTAL_PER_PAGE;

  const data = await fetchCharacters({ limit: TOTAL_PER_PAGE, offset, name });

  return {
    results: data.results.map((char: MarvelCharacter) => ({
      id: char.id,
      name: char.name,
      image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      description: char.description || "Sem descrição.",
      series: char.series.items.map((item: MarvelCharacterSerie) => item.name),
      events: char.events.items.map((item: MarvelCharacterEvent) => item.name),
    })),
    total: data.total,
    offset: data.offset,
  };
}
