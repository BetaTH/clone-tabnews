import migrationRunner, { RunnerOption } from "node-pg-migrate";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { db } from "@/infra/database";
import { RunMigration } from "node-pg-migrate/dist/migration";
import { exec } from "node:child_process";
import { promisify } from "node:util";
export const dynamic = "force-dynamic";

const execAsync = promisify(exec);

const defaultMigrationOptions: Omit<RunnerOption, "databaseUrl" | "dbClient"> =
  {
    dir: join(process.cwd(), "src", "infra", "migrations","dist"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  async function compileMigrations() {
    console.log("Compilando arquivos TypeScript para JavaScript...");
    const tsConfigPath = join(process.cwd(),"pg-migrate.tsconfig.json")
    const tsMigrationsPath = join(process.cwd(), "src", "infra", "migrations");
    const distPath = join(process.cwd(), "src", "infra", "migrations", "dist");
  
    try {
      await execAsync(`tsc --project ${tsConfigPath}  --outDir ${distPath} --rootDir ${tsMigrationsPath}`);
      console.log("Compilação concluída com sucesso!");
    } catch (error) {
      console.error("Erro ao compilar os arquivos:", error);
      throw error;
    }
  }

export async function GET(_: NextRequest) {
  const dbClient = await db.getNewClient();
  let pedingMigrations: RunMigration[];
  try {
    await compileMigrations()
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
