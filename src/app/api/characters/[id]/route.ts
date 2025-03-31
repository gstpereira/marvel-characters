import { NextRequest, NextResponse } from "next/server";
import { getCharacterById } from "@/app/api/characters/usecases/getCharacterById";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const character = await getCharacterById(params.id);
    return NextResponse.json(character);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
