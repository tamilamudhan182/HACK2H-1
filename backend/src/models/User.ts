import { z } from "zod";

export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean()
});

export const userProgressSchema = z.object({
  percentage: z.number().min(0).max(100),
  synced: z.boolean(),
  checklist: z.array(checklistItemSchema)
});

