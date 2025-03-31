import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  CharacterEvent,
  MarvelCharacterEvent,
  MarvelCharacterSerie,
} from "@/types";

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ts = new Date().getTime().toString();
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    const url = `https://gateway.marvel.com/v1/public/characters/${params.id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const res = await fetch(url);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar personagem." },
        { status: res.status }
      );
    }

    const json = await res.json();
    const char = json.data.results[0];

    const eventsUrl = `https://gateway.marvel.com/v1/public/characters/${params.id}/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=8`;
    const eventsRes = await fetch(eventsUrl);

    if (!eventsRes.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar eventos." },
        { status: eventsRes.status }
      );
    }

    const eventsJson = await eventsRes.json();
    const events = eventsJson.data.results.map((event: CharacterEvent) => ({
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

    return NextResponse.json(character);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
