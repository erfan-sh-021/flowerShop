import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/database/db.json"); // مسیر درست رو چک کن

function readDatabase() {
  try {
    const file = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(file);
  } catch (err) {
    console.error("❌ Error reading db.json:", err);
    return { flowers: [], collections: [], articles: [] };
  }
}

function writeDatabase(data: any) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Error writing db.json:", err);
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const data = readDatabase();

    if (type === "flowers") {
      const start = (page - 1) * limit;
      const end = start + limit;
      return NextResponse.json({
        data: data.flowers.slice(start, end),
        totalCount: data.flowers.length,
      });
    }

    if (type === "collections") {
      return NextResponse.json({
        data: data.collections,
        totalCount: data.collections.length,
      });
    }

    if (type === "articles") {
      return NextResponse.json({
        data: data.articles,
        totalCount: data.articles.length,
      });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("❌ GET /api/data failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newFlower = await req.json();
    const data = readDatabase();
    data.flowers.push(newFlower);
    writeDatabase(data);

    return NextResponse.json(newFlower, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/data failed:", error);
    return NextResponse.json({ error: "Failed to add flower" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedFlower = await req.json();
    const data = readDatabase();
    data.flowers = data.flowers.map((f: any) =>
      f.id === updatedFlower.id ? updatedFlower : f
    );
    writeDatabase(data);

    return NextResponse.json(updatedFlower, { status: 200 });
  } catch (error) {
    console.error("❌ PUT /api/data failed:", error);
    return NextResponse.json(
      { error: "Failed to update flower" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const data = readDatabase();
    data.flowers = data.flowers.filter((f: any) => f.id !== id);
    writeDatabase(data);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE /api/data failed:", error);
    return NextResponse.json(
      { error: "Failed to delete flower" },
      { status: 500 }
    );
  }
}
