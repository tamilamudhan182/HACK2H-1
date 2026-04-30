import type {
  AssistantReply,
  AssistantRequest,
  FaqItem,
  Milestone,
  ProgressPayload,
  ResourceLink
} from "@/lib/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getTimeline() {
  return request<{ milestones: Milestone[] }>("/timeline");
}

export function getFaqs() {
  return request<{ faqs: FaqItem[] }>("/faqs");
}

export function getResources() {
  return request<{ resources: ResourceLink[] }>("/resources");
}

export function getProgress() {
  return request<ProgressPayload>("/user/progress");
}

export function toggleChecklist(id: string) {
  return request<ProgressPayload>("/user/progress/toggle", {
    method: "POST",
    body: JSON.stringify({ id })
  });
}

export function syncGoogleTasks() {
  return request<{ status: string; message: string; syncedTasks: number; timestamp: string }>("/google/tasks/sync", {
    method: "POST"
  });
}

export function getCalendarLink(stageId: string) {
  return request<{ url: string }>("/google/calendar-link", {
    method: "POST",
    body: JSON.stringify({ stageId })
  });
}

export function getMapsLink(query: string) {
  return request<{ url: string }>("/google/maps-link", {
    method: "POST",
    body: JSON.stringify({ query })
  });
}

export function askAssistant(payload: AssistantRequest) {
  return request<AssistantReply>("/assistant/query", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

