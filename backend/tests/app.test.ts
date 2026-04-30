import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";

const app = createApp();

test("GET /api/timeline returns milestones", async () => {
  const response = await request(app).get("/api/timeline");

  assert.equal(response.status, 200);
  assert.equal(response.body.milestones.length, 6);
});

test("POST /api/assistant/query returns contextual guidance", async () => {
  const response = await request(app)
    .post("/api/assistant/query")
    .send({
      query: "What ID do I need to vote?",
      selectedStage: "voting",
      profile: {
        state: "Tamil Nadu",
        district: "Chennai",
        firstTimeVoter: true,
        languagePreference: "simple"
      }
    });

  assert.equal(response.status, 200);
  assert.match(response.body.answer, /Tamil Nadu/i);
  assert.equal(response.body.stage, "voting");
});

