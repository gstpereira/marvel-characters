"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Character } from "@/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CharacterDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: character, isLoading } = useSWR<Character>(
    `/api/characters/${params.id}`,
    fetcher
  );

  if (isLoading)
    return <div className="text-white text-center p-8">Carregando...</div>;
  if (!character)
    return (
      <div className="text-white text-center p-8">
        Personagem não encontrado.
      </div>
    );

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-center bg-[#161b22] mb-8">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="object-cover"
          unoptimized
        />
        <div className="p-6 flex flex-col justify-center align-self-center">
          <h1 className="text-3xl font-bold mb-2 text-white">
            {character.name}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            {character.description || "Nenhuma descrição disponível."}
          </p>
        </div>
      </div>
      <div className="min-h-[95vh] text-white px-8 pt-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {character.detailedEvents.map((event, i) => (
              <Card key={i} className="bg-[#161b22] mb-5">
                <div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={300}
                    height={160}
                    className="w-full h-auto object-cover rounded-t-md border-red-500 border-b-4"
                    unoptimized
                  />
                  <div className="p-4">
                    <h3 className="mt-1 font-bold text-base mb-6">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-snug">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
