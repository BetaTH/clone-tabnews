import { db } from "@/infra/database";
import { waitForAllServices } from "@/tests/orchestrator";

describe("GET to /api/v1/migrations", () => {
  beforeAll(async () => {
    await waitForAllServices();
    await db.query("drop schema public cascade; create schema public;");
  });
  it("should return pending migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });
});
