import { db } from "@/infra/database";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(_: NextRequest) {
  const result = await db.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  return NextResponse.json({ message: "Primeiro endpoint" }, { status: 200 });
}
