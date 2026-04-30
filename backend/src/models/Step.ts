import { z } from "zod";

export const stepSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  windowLabel: z.string(),
  stage: z.string(),
  eligibility: z.array(z.string()),
  learnMore: z.array(z.string()),
  boothQuery: z.string(),
  actions: z.array(
    z.object({
      label: z.string(),
      kind: z.enum(["calendar", "maps", "tasks"])
    })
  ),
  calendarStart: z.string(),
  calendarEnd: z.string()
});

