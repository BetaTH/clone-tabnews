import { Client, QueryConfig } from "pg";

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });
  await client.connect();
  return client;
}

async function query(queryConfig: string | QueryConfig, values?: any[]) {
  let client: Client;
  try {
    client = await getNewClient();
    const result = await client.query(queryConfig, values);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (client) await client.end();
  }
}

type dbReturn = {
  query: typeof query;
  getNewClient: typeof getNewClient;
};

export const db: dbReturn = {
  query,
  getNewClient,
};
