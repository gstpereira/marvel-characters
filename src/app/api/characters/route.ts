import { NextRequest, NextResponse } from "next/server";
import { listCharacters } from "./usecases/listCharacters";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const name = searchParams.get("name") || "";

    const data = await listCharacters(page, name);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
