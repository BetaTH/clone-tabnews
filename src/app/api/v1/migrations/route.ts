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
    migrationsTable: "pgmigrations",
  });
  return NextResponse.json(migrations, { status: 200 });
}

export async function POST(_: NextRequest) {
  console.log("post");
  const migrations = await migrationRunner({
    dir: join("src", "infra", "migrations"),
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  });
  return NextResponse.json(migrations, { status: 200 });
}
