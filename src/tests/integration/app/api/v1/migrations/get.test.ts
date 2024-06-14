import { db } from "@/infra/database";

async function cleanDatabase() {
  await db.query("drop schema public cascade; create schema public;");
}

describe("GET to /api/v1/migrations", () => {
  beforeAll(cleanDatabase);
  it("should return pending migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
