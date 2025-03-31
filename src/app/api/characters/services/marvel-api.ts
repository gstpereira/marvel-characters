// services/marvel-api.ts
import crypto from "crypto";
import {
  FetchCharactersParams,
  MarvelCharacterResponse,
  MarvelEventResponse,
} from "@/app/api/characters/types/character";

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

function getAuthParams() {
  const ts = Date.now().toString();
  const hash = crypto
    .createHash("md5")
    .update(ts + privateKey + publicKey)
    .digest("hex");
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
}

export async function fetchCharacter(
  id: string
): Promise<MarvelCharacterResponse> {
  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}?${getAuthParams()}`
  );
  const json = await res.json();
  return json.data.results[0];
}

export async function fetchCharacterEvents(
  id: string,
  limit = 8
): Promise<MarvelEventResponse[]> {
  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters/${id}/events?limit=${limit}&${getAuthParams()}`
  );
  const json = await res.json();
  return json.data.results;
}

export async function fetchCharacters({
  limit,
  offset,
  name,
}: FetchCharactersParams) {
  const base = "https://gateway.marvel.com/v1/public/characters";
  const search = name ? `&nameStartsWith=${encodeURIComponent(name)}` : "";

  const url = `${base}?limit=${limit}&offset=${offset}${search}&${getAuthParams()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar personagens da Marvel API.");
  }

  const json = await res.json();
  return json.data;
}
