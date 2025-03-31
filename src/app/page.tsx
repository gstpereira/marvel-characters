"use client";

import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { TOTAL_PER_PAGE, type Character } from "@/types";
import { SearchInput } from "@/components/ui/search";
import CharacterTable from "@/components/ui/table";
import Pagination from "@/components/ui/pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CharacterSearch: NextPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const { data, isLoading } = useSWR(
    `/api/characters?page=${currentPage}&name=${encodeURIComponent(search)}`,
    fetcher
  );

  const characters: Character[] = data?.results ?? [];
  const total: number = data?.total ?? 0;
  const totalPages = Math.ceil(total / TOTAL_PER_PAGE);

  return (
    <>
      <div className="min-h-[80vh] text-white p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Busca de Personagens</h1>
          </header>

          <SearchInput
            placeholder="Digite um nome para pesquisar"
            title="Nome do personagem"
            className="mb-4"
            onDebounce={(value) => {
              if (value !== search) {
                setSearch(value);
                setCurrentPage(1);
              }
            }}
          />

          {isLoading ? (
            <p className="text-center">Carregando...</p>
          ) : (
            <div ref={tableRef}>
              <CharacterTable characters={characters} />
            </div>
          )}
        </div>
      </div>
      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default CharacterSearch;
