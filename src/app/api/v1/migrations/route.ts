import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
export const dynamic = "force-dynamic";

const defaultMigrationOptions: RunnerOption = {
  dir: join("src", "infra", "migrations"),
  databaseUrl: process.env.DATABASE_URL,
  dryRun: true,
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

export async function GET(_: NextRequest) {
  const pedingMigrations = await migrationRunner({
    ...defaultMigrationOptions,
  });
  return NextResponse.json(pedingMigrations, { status: 200 });
}

export async function POST(_: NextRequest) {
  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
  });
  return NextResponse.json(migratedMigrations, {
    status: migratedMigrations.length === 0 ? 200 : 201,
  });
}
