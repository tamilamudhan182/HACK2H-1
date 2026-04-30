import { Router } from "express";
import { faqs } from "../data/faqData.js";
import { milestones, resources } from "../data/electionData.js";
import { stepSchema } from "../models/Step.js";

const router = Router();

router.get("/timeline", (_request, response) => {
  const validated = milestones.map((milestone) => stepSchema.parse(milestone));
  response.json({ milestones: validated });
});

router.get("/faqs", (_request, response) => {
  response.json({ faqs });
});

router.get("/resources", (_request, response) => {
  response.json({ resources });
});

export default router;

