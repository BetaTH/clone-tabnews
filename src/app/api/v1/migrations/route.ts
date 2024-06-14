import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { db } from "@/infra/database";
export const dynamic = "force-dynamic";

const defaultMigrationOptions: Omit<RunnerOption, "databaseUrl" | "dbClient"> =
  {
    dir: join("src", "infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

export async function GET(_: NextRequest) {
  const dbClient = await db.getNewClient();
  const pedingMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dbClient,
  });
  await dbClient.end();
  return NextResponse.json(pedingMigrations, { status: 200 });
}

export async function POST(_: NextRequest) {
  const dbClient = await db.getNewClient();
  const migratedMigrations = await migrationRunner({
    ...defaultMigrationOptions,
    dryRun: false,
    dbClient,
  });
  await dbClient.end();
  return NextResponse.json(migratedMigrations, {
    status: migratedMigrations.length === 0 ? 200 : 201,
  });
}
