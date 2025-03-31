"use client";

import Image from "next/image";
import { Character } from "@/types";
import { useRouter } from "next/navigation";

const CharacterTable = ({ characters }: { characters: Character[] }) => {
  const router = useRouter();

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <div className="hidden md:grid grid-cols-12 text-sm font-medium text-gray-400 px-4 py-2 border-b border-[#21262d]">
        <div className="col-span-4 font-bold text-xl">Personagem</div>
        <div className="col-span-5 font-bold text-xl">Séries</div>
        <div className="col-span-3 font-bold text-xl">Eventos</div>
      </div>

      {characters.map((character, i) => (
        <div
          key={i}
          onClick={() => router.push(`/characters/${character.id}`)}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 px-4 py-4 border rounded-md mb-3 border-[#334155] hover:bg-[#161b22] hover:cursor-pointer transition"
        >
          <div className="md:col-span-4 flex items-center gap-3">
            <Image
              src={character.image}
              alt={character.name}
              width={80}
              height={80}
              unoptimized
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-white text-sm md:text-base font-medium leading-tight text-balance">
              {character.name}
            </span>
          </div>

          <div className="md:col-span-5 text-sm md:text-base text-gray-300 whitespace-pre-line text-balance">
            {character.series.length > 0
              ? character.series.slice(0, 3).join("\n")
              : "Nenhuma série encontrada"}
          </div>

          <div className="md:col-span-3 text-sm md:text-base text-gray-300 text-balance">
            {character.events.length > 0
              ? character.events.slice(0, 3).join(", ")
              : "Nenhum evento encontrado"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterTable;
