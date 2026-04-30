import { Router } from "express";
import { z } from "zod";
import { answerElectionQuery } from "../services/contextEngine.js";
import { trackEvent } from "../services/analytics.js";

import { GoogleAIService } from "../services/googleAI.js";
import { GoogleCloudLogger } from "../services/googleCloudLogging.js";

const router = Router();
const googleAI = GoogleAIService.getInstance();
const cloudLogger = GoogleCloudLogger.getInstance();

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

router.post("/assistant/query", async (request, response) => {
  const payload = assistantSchema.parse(request.body);
  
  cloudLogger.log('INFO', 'AI Assistant Query Received', { query: payload.query });

  const aiResponse = await googleAI.generateCivicResponse(payload.query, payload);
  const contextAnswer = answerElectionQuery(payload);

  trackEvent("assistant_query", {
    state: payload.profile.state,
    stage: payload.selectedStage ?? contextAnswer.stage
  });

  response.json({
    ...contextAnswer,
    text: aiResponse // Enhanced with Google Gemini AI
  });
});

export default router;

