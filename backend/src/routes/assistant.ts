import { Router } from "express";
import { z } from "zod";
import { answerElectionQuery } from "../services/contextEngine.js";
import { trackEvent } from "../services/analytics.js";

const router = Router();

const assistantSchema = z.object({
  query: z.string().min(2),
  selectedStage: z.string().optional(),
  profile: z.object({
    state: z.string(),
    district: z.string(),
    firstTimeVoter: z.boolean(),
    languagePreference: z.enum(["simple", "detailed"])
  })
});

router.post("/assistant/query", (request, response) => {
  const payload = assistantSchema.parse(request.body);
  const answer = answerElectionQuery(payload);
  trackEvent("assistant_query", {
    state: payload.profile.state,
    stage: payload.selectedStage ?? answer.stage
  });
  response.json(answer);
});

export default router;

