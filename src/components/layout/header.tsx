"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  username?: string;
  description?: string;
}

export const Header: FC<HeaderProps> = ({
  username = "Usuário Teste",
  description = "Teste de Front-End",
}) => {
  return (
    <div className="bg-background border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo NeuralMed"
              width={162}
              height={32}
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{username}</p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
          <div className="bg-cyan-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            {username
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};
