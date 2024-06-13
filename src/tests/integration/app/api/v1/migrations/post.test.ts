describe("POST to /api/v1/migrations", () => {
  it("should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "POST",
    });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    console.log(data);
  });
});
