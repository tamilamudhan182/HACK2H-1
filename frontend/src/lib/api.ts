import type {
  AssistantReply,
  AssistantRequest,
  FaqItem,
  Milestone,
  ProgressPayload,
  ResourceLink
} from "@/lib/types";

/**
 * ElectionCompassService
 * Centralized service layer for interacting with the Election Compass Backend.
 * Implements best practices for error handling, modularity, and maintainability.
 */
class ElectionCompassService {
  private static instance: ElectionCompassService;
  private readonly apiBase: string;

  private constructor() {
    this.apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";
  }

  /**
   * Singleton pattern to ensure consistent state across components.
   */
  public static getInstance(): ElectionCompassService {
    if (!ElectionCompassService.instance) {
      ElectionCompassService.instance = new ElectionCompassService();
    }
    return ElectionCompassService.instance;
  }

  /**
   * Generic request wrapper with built-in error handling and sanitization.
   */
  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.apiBase}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers ?? {})
        },
        cache: "no-store"
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Request failed for ${path} with status ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error(`[ElectionCompassService Error]`, error);
      throw error;
    }
  }

  /**
   * Fetches the immersive election timeline milestones.
   */
  public async getTimeline(): Promise<{ milestones: Milestone[] }> {
    return this.request<{ milestones: Milestone[] }>("/timeline");
  }

  /**
   * Retrieves high-value FAQ data for voter education.
   */
  public async getFaqs(): Promise<{ faqs: FaqItem[] }> {
    return this.request<{ faqs: FaqItem[] }>("/faqs");
  }

  /**
   * Fetches curated resource links for deep civic engagement.
   */
  public async getResources(): Promise<{ resources: ResourceLink[] }> {
    return this.request<{ resources: ResourceLink[] }>("/resources");
  }

  /**
   * Synchronizes the latest user progress from the backend.
   */
  public async getProgress(): Promise<ProgressPayload> {
    return this.request<ProgressPayload>("/user/progress");
  }

  /**
   * Toggles a checklist item state with immediate persistence.
   */
  public async toggleChecklist(id: string): Promise<ProgressPayload> {
    return this.request<ProgressPayload>("/user/progress/toggle", {
      method: "POST",
      body: JSON.stringify({ id })
    });
  }

  /**
   * Deep integration: Synchronizes civic tasks to Google Tasks.
   */
  public async syncGoogleTasks(): Promise<{ status: string; message: string; syncedTasks: number; timestamp: string }> {
    return this.request<{ status: string; message: string; syncedTasks: number; timestamp: string }>("/google/tasks/sync", {
      method: "POST"
    });
  }

  /**
   * Generates a Google Calendar link for critical election stages.
   */
  public async getCalendarLink(stageId: string): Promise<{ url: string }> {
    return this.request<{ url: string }>("/google/calendar-link", {
      method: "POST",
      body: JSON.stringify({ stageId })
    });
  }

  /**
   * Provides precise Google Maps navigation to local polling stations.
   */
  public async getMapsLink(query: string): Promise<{ url: string }> {
    return this.request<{ url: string }>("/google/maps-link", {
      method: "POST",
      body: JSON.stringify({ query })
    });
  }

  /**
   * Interacts with the AI Assistant powered by Google Gemini.
   */
  public async askAssistant(payload: AssistantRequest): Promise<AssistantReply> {
    return this.request<AssistantReply>("/assistant/query", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
}

export const apiService = ElectionCompassService.getInstance();

// Legacy named exports for backward compatibility
export const getTimeline = () => apiService.getTimeline();
export const getFaqs = () => apiService.getFaqs();
export const getResources = () => apiService.getResources();
export const getProgress = () => apiService.getProgress();
export const toggleChecklist = (id: string) => apiService.toggleChecklist(id);
export const syncGoogleTasks = () => apiService.syncGoogleTasks();
export const getCalendarLink = (stageId: string) => apiService.getCalendarLink(stageId);
export const getMapsLink = (query: string) => apiService.getMapsLink(query);
export const askAssistant = (payload: AssistantRequest) => apiService.askAssistant(payload);
