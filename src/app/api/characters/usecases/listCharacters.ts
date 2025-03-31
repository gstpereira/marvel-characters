import { fetchCharacters } from "@/app/api/characters/services/marvel-api";
import {
  MarvelCharacter,
  MarvelCharacterEvent,
  MarvelCharacterSerie,
  TOTAL_PER_PAGE,
} from "@/types";

type Input = {
  page: number;
  name: string;
};

export const listCharacters = async (input: Input) => {
  const offset = (input.page - 1) * TOTAL_PER_PAGE;

  const data = await fetchCharacters({
    limit: TOTAL_PER_PAGE,
    offset,
    name: input.name,
  });

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
};
