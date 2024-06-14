import { db } from "@/infra/database";

async function cleanDatabase() {
  await db.query("drop schema public cascade; create schema public;");
}
describe("POST to /api/v1/migrations", () => {
  beforeAll(cleanDatabase);
  it("should migrate pending migrations and return 201", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(response.status).toBe(201);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should migrate 0 pending migrations and return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(0);
  });
});
