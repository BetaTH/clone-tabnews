import { Client, ClientBase, QueryConfig } from "pg";

async function query(queryConfig: string | QueryConfig, values?: any[]) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(queryConfig, values);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    await client.end();
  }
}

export const db: {
  query: typeof query;
} = {
  query,
};
