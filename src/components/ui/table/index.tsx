import Image from "next/image";

interface Character {
  name: string;
  image: string;
  series: string[];
  events: string[];
}

export default function CharacterTable({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <div className="mt-6 w-full">
      <div className="grid grid-cols-12 text-sm font-medium text-gray-400 px-4 py-2 border-b border-[#21262d]">
        <div className="col-span-4 font-bold text-2xl">Personagem</div>
        <div className="col-span-5 font-bold text-2xl">Séries</div>
        <div className="col-span-3 font-bold text-2xl">Eventos</div>
      </div>
      {characters.map((character, i) => (
        <div
          key={i}
          className="grid grid-cols-12 px-4 py-4 border rounded-md mb-3 border-[#334155] hover:bg-[#161b22] hover:cursor-pointer"
        >
          <div className="col-span-4 flex items-center gap-3">
            <Image
              src={character.image}
              alt={character.name}
              width={120}
              height={120}
              unoptimized
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-white text-sm font-medium leading-tight">
              {character.name}
            </span>
          </div>
          <div className="col-span-5 text-sm text-gray-300 whitespace-pre-line">
            {character.series.length > 0
              ? character.series.slice(0, 3).join("\n")
              : "Nenhuma série encontrada"}
          </div>
          <div className="col-span-3 text-sm text-gray-300">
            {character.events.length > 0
              ? character.events.slice(0, 3).join(", ")
              : "Nenhum evento encontrado"}
          </div>
        </div>
      ))}
    </div>
  );
}
