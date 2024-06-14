import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { db } from "@/infra/database";
import { RunMigration } from "node-pg-migrate/dist/migration";
export const dynamic = "force-dynamic";

const defaultMigrationOptions: Omit<RunnerOption, "databaseUrl" | "dbClient"> =
  {
    dir: join(process.cwd(), "src", "infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

export async function GET(_: NextRequest) {
  const dbClient = await db.getNewClient();
  let pedingMigrations: RunMigration[];
  try {
    pedingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    if (dbClient) await dbClient.end();
  }

  return NextResponse.json(pedingMigrations, { status: 200 });
}

export async function POST(_: NextRequest) {
  const dbClient = await db.getNewClient();
  let migratedMigrations: RunMigration[];
  try {
    migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
      dbClient,
    });
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await dbClient.end();
  }
  return NextResponse.json(migratedMigrations, {
    status: migratedMigrations.length === 0 ? 200 : 201,
  });
}
