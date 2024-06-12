import { Client, QueryConfig } from "pg";

async function query(queryConfig: string | QueryConfig, values?: any[]) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
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

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
