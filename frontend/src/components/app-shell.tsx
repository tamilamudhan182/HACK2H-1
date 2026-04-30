"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { Checklist } from "@/components/checklist";
import { FaqSection } from "@/components/faq-section";
import { HeroPanel } from "@/components/hero-panel";
import { ResourceHub } from "@/components/resource-hub";
import { StageDetailCard } from "@/components/stage-detail-card";
import { Timeline } from "@/components/timeline";
import { defaultProfile } from "@/lib/default-profile";
import {
  getFaqs,
  getProgress,
  getResources,
  getTimeline,
  syncGoogleTasks,
  toggleChecklist
} from "@/lib/api";
import type { ProgressPayload, UserProfile } from "@/lib/types";

const AssistantSidebar = dynamic(
  () => import("@/components/assistant-sidebar"),
  {
    ssr: false
  }
);

const taskMap: Record<string, string> = {
  registration: "register",
  nomination: "find-booth",
  campaign: "find-booth",
  voting: "cast-vote"
};

export function AppShell() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const { data: timelineData } = useSWR("timeline", getTimeline);
  const { data: faqData } = useSWR("faqs", getFaqs);
  const { data: resourceData } = useSWR("resources", getResources);
  const { data: progress, mutate: mutateProgress } = useSWR<ProgressPayload>(
    "progress",
    getProgress
  );

  const milestones = useMemo(() => timelineData?.milestones ?? [], [timelineData]);
  const [selectedStageId, setSelectedStageId] = useState<string | undefined>();

  const selectedStage = useMemo(() => {
    return (
      milestones.find((milestone) => milestone.id === selectedStageId) ??
      milestones[0]
    );
  }, [milestones, selectedStageId]);

  async function handleToggleChecklist(id: string) {
    const next = await toggleChecklist(id);
    await mutateProgress(next, { revalidate: false });
  }

  async function handleTaskAction(title: string) {
    const matchedStage = milestones.find((item) => item.title === title || item.id === title);
    const taskId = matchedStage ? taskMap[matchedStage.id] : undefined;

    if (taskId) {
      await handleToggleChecklist(taskId);
    }
  }

  async function handleSync() {
    const result = await syncGoogleTasks();
    return result.summary;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-mesh">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(4,8,18,0.18),_rgba(4,8,18,0.88))]" />
      <div className="absolute left-[-12%] top-20 h-72 w-72 rounded-full bg-coral/15 blur-3xl" />
      <div className="absolute bottom-10 right-[-10%] h-80 w-80 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-[1480px] flex-col gap-8 px-5 py-6 md:px-8 lg:px-10">
        <HeroPanel profile={profile} onProfileChange={setProfile} />

        <div className="grid gap-8 xl:grid-cols-[1.45fr_0.8fr]">
          <section className="space-y-6">
            <Timeline
              milestones={milestones}
              selectedId={selectedStage?.id}
              onSelect={setSelectedStageId}
            />
            <StageDetailCard
              milestone={selectedStage}
              onTaskAction={handleTaskAction}
            />
          </section>

          <AssistantSidebar
            profile={profile}
            selectedStage={selectedStage}
            onHighlightStage={setSelectedStageId}
          />
        </div>

        <section className="grid gap-8 lg:grid-cols-2">
          <Checklist
            progress={progress}
            onToggle={handleToggleChecklist}
            onSync={handleSync}
          />
          <FaqSection faqs={faqData?.faqs ?? []} profile={profile} />
        </section>

        <ResourceHub resources={resourceData?.resources ?? []} />
      </div>
    </main>
  );
}

