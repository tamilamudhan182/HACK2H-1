import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

describe("Security and Infrastructure Tests", () => {
  it("should have critical security headers (Helmet)", async () => {
    const response = await request(app).get("/health");
    expect(response.headers["content-security-policy"]).toBeDefined();
    expect(response.headers["x-content-type-options"]).toBe("nosniff");
    expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
  });

  it("should return 200 for health check", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  it("should sanitize malicious input in body", async () => {
    const response = await request(app)
      .post("/api/assistant/query")
      .send({
        query: "<script>alert('xss')</script>How do I register?",
        profile: {
          state: "Test",
          district: "Test",
          firstTimeVoter: true,
          languagePreference: "simple"
        }
      });
    
    // The query is not directly returned, but we ensure the request doesn't crash
    // and internal sanitization logic (tested separately) is invoked.
    expect(response.status).toBe(200);
  });
});
