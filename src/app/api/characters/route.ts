import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;

interface MarvelCharacterSerie {
  name: string;
}

interface MarvelCharacterEvent {
  name: string;
}

interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
  series: { items: MarvelCharacterSerie[] };
  events: { items: MarvelCharacterEvent[] };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const name = searchParams.get("name")
      ? `&nameStartsWith=${encodeURIComponent(searchParams.get("name") || "")}`
      : "";

    const limit = 10;
    const offset = (page - 1) * limit;

    const ts = new Date().getTime().toString();
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    const baseUrl = "https://gateway.marvel.com/v1/public/characters";
    const url = `${baseUrl}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}${name}`;

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro na chamada à API da Marvel." },
        { status: res.status }
      );
    }

    const json = await res.json();
    const results = json.data.results || [];

    console.log(results);

    const characters = results.map((char: MarvelCharacter) => ({
      id: char.id,
      name: char.name,
      image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      description: char.description || "Sem descrição.",
      series: char.series.items.map((item: MarvelCharacterSerie) => item.name),
      events: char.events.items.map((item: MarvelCharacterEvent) => item.name),
      detailedEvents: char.events.items
        .slice(0, 3)
        .map((item: MarvelCharacterEvent) => ({
          title: item.name,
          image: "/images/marvel-event-placeholder.png",
          description: "Evento retirado da API da Marvel.",
        })),
    }));

    return NextResponse.json({
      results: characters,
      total: json.data.total,
      offset: json.data.offset,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
