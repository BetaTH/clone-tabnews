describe("GET to /api/v1/status", () => {
  it("should be able to return 200", async () => {
    const responso = await fetch("http://localhost:3000/api/v1/status");
    expect(responso.status).toBe(200);
  });
});
