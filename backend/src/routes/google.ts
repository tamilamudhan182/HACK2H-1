import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { buildCalendarLink } from "../services/googleCalendar.js";
import { getGuideDocument } from "../services/googleDrive.js";
import { buildMapsLink } from "../services/googleMaps.js";
import { syncChecklistToGoogleTasks } from "../services/googleTasks.js";

const router = Router();

router.post("/google/calendar-link", (request: Request, response: Response) => {
  const { stageId } = z.object({ stageId: z.string() }).parse(request.body);
  response.json({ url: buildCalendarLink(stageId) });
});

router.post("/google/maps-link", (request: Request, response: Response) => {
  const { query } = z.object({ query: z.string() }).parse(request.body);
  response.json({ url: buildMapsLink(query) });
});

router.post("/google/tasks/sync", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const result = await syncChecklistToGoogleTasks();
    response.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/google/guide", (_request: Request, response: Response) => {
  response.json({ url: getGuideDocument() });
});

export default router;
