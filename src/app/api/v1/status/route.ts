import { db } from "@/infra/database";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(_: NextRequest) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = (await db.query("SHOW server_version;")).rows[0]
    .server_version;
  const databaseMaxConnections = (await db.query("SHOW max_connections;"))
    .rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = (
    await db.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    })
  ).rows[0].count;

  return NextResponse.json(
    {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersion,
          max_connections: parseInt(databaseMaxConnections),
          openend_connections: databaseOpenedConnections,
        },
      },
    },
    { status: 200 },
  );
}
