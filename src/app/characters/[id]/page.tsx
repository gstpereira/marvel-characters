"use client";

import useSWR from "swr";
import Image from "next/image";
import { NextPage } from "next";
import type { Character } from "@/types";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/lib/utils";

interface CharacterPageProps {
  params: { id: string };
}

const CharacterDetailsPage: NextPage<CharacterPageProps> = ({
  params,
}: CharacterPageProps) => {
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
      <div className="flex flex-col md:flex-row gap-6 items-center bg-[#161b22] rounded-md mb-8 animate-fade-in">
        <div className="w-full max-w-[300px]">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="rounded-md object-cover w-full h-auto"
            unoptimized
          />
        </div>
        <div className="flex-1 text-center md:text-left md:p-6 text-balance">
          <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-2 text-white">
            {character.name}
          </h1>
          <p className="text-gray-200 text-base leading-relaxed text-balance">
            {character.description || "Nenhuma descrição disponível."}
          </p>
        </div>
      </div>

      <div className="min-h-[95vh] text-white px-4 md:px-8 pt-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-300 text-balance">
            Eventos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {character.detailedEvents.map((event, i) => (
              <Card
                key={i}
                className="bg-[#161b22] mb-5 transition duration-300 hover:scale-[1.01] hover:shadow-md"
              >
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
                    <h3 className="mt-1 font-bold text-base mb-4 text-balance">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-snug text-balance">
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
};

export default CharacterDetailsPage;
