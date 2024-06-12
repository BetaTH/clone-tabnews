describe("GET to /api/v1/status", () => {
  it("should be able to return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const data = await response.json();

    const parsedUpdatedAt = new Date(data.updated_at).toISOString();
    expect(data.updated_at).toEqual(parsedUpdatedAt);

    expect(data.dependencies.database.version).toBe("16.0");
    expect(data.dependencies.database.max_connections).toBe(100);
    expect(data.dependencies.database.openend_connections).toBe(1);
  });
});
