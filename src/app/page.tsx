"use client";

import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Character } from "@/types";
import { SearchInput } from "@/components/ui/search";
import CharacterTable from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CharacterSearch() {
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data, isLoading } = useSWR(
    `/api/characters?page=${currentPage}&name=${encodeURIComponent(search)}`,
    fetcher
  );

  console.log(data);

  const characters: Character[] = data?.results ?? [];
  const total: number = data?.total ?? 0;
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Busca de Personagens</h1>
        </header>

        <SearchInput
          placeholder="Digite um nome para pesquisar"
          className="mb-4"
          onDebounce={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />

        {isLoading ? (
          <p className="text-center">Carregando...</p>
        ) : !selectedCharacter ? (
          <>
            <CharacterTable characters={characters} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <div>
            <Button onClick={() => setSelectedCharacter(null)} className="mb-4">
              Voltar
            </Button>
            <div className="flex gap-6 items-center mb-8">
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                width={120}
                height={120}
                className="rounded-md"
              />
              <div>
                <h1 className="text-3xl font-bold">{selectedCharacter.name}</h1>
                <p className="text-sm text-gray-400 max-w-2xl mt-2">
                  {selectedCharacter.description}
                </p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCharacter.detailedEvents.map((event, i) => (
                <Card key={i} className="bg-[#161b22]">
                  <CardContent className="p-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={300}
                      height={160}
                      className="rounded-md w-full h-auto"
                    />
                    <h3 className="mt-2 font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
