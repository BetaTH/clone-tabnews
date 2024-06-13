import migrationRunner from "node-pg-migrate";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
export const dynamic = "force-dynamic";
export async function GET(_: NextRequest) {
  const migrations = await migrationRunner({
    dir: join("src", "infra", "migrations"),
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    direction: "up",
    verbose: true,
  });
  return NextResponse.json([], { status: 200 });
}
