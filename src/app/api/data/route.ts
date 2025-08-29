import { NextResponse } from "next/server";
import data from "@/database/db.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  if (type === "collections") {
    return NextResponse.json({
      data: data.collections,
      totalCount: data.collections.length,
    });
  }

  if (type === "flowers") {
    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = data.flowers.slice(start, end);
    return NextResponse.json({
      data: paginatedData,
      totalCount: data.flowers.length,
    });
  }

  return NextResponse.json(
    { error: "Invalid type. Use 'collections' or 'flowers'" },
    { status: 400 }
  );
}
