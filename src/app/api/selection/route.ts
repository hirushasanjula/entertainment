import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/selection  { gender: "male" | "female" }
// Stores one row per visitor selection in MongoDB.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gender = body?.gender;

    if (gender !== "male" && gender !== "female") {
      return NextResponse.json(
        { error: "gender must be 'male' or 'female'" },
        { status: 400 }
      );
    }

    const selection = await prisma.selection.create({
      data: { gender },
    });

    return NextResponse.json({ id: selection.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save selection:", error);
    return NextResponse.json(
      { error: "Failed to save selection" },
      { status: 500 }
    );
  }
}
