export type UserProfile = {
  state: string;
  district: string;
  firstTimeVoter: boolean;
  languagePreference: "simple" | "detailed";
};

export type MilestoneAction = {
  label: string;
  kind: "calendar" | "maps" | "tasks";
};

export type Milestone = {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  windowLabel: string;
  stage: string;
  eligibility: string[];
  learnMore: string[];
  boothQuery: string;
  actions: MilestoneAction[];
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type ProgressPayload = {
  percentage: number;
  synced: boolean;
  checklist: ChecklistItem[];
};

export type FaqItem = {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
};

export type ResourceLink = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
};

export type AssistantReply = {
  answer: string;
  stage?: string;
  actions?: Array<{
    label: string;
    type: "open-url" | "highlight-stage";
    value: string;
  }>;
  source: "seeded" | "official-link";
};

export type AssistantRequest = {
  query: string;
  selectedStage?: string;
  profile: UserProfile;
};

