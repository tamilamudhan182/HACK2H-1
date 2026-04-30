import { Router } from "express";
import { z } from "zod";
import { userProgressSchema } from "../models/User.js";
import { getProgress, toggleChecklist } from "../store/userProgressStore.js";

const router = Router();

router.get("/user/progress", (_request, response) => {
  response.json(userProgressSchema.parse(getProgress()));
});

router.post("/user/progress/toggle", (request, response) => {
  const { id } = z.object({ id: z.string() }).parse(request.body);
  response.json(userProgressSchema.parse(toggleChecklist(id)));
});

export default router;

