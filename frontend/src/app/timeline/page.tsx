import { TimelineClient } from "@/components/TimelineClient";
import { getTimeline } from "@/lib/api";
import type { Milestone } from "@/lib/types";

export default async function Timeline() {
  let milestones: Milestone[] = [];

  try {
    const data = await getTimeline();
    milestones = data.milestones;
  } catch {
    milestones = [
      { id: "registration", title: "Registration", icon: "📝", shortDescription: "Confirm eligibility and submit voter details.", longDescription: "Registration is the earliest and most important step.", windowLabel: "Preparation window", stage: "registration", eligibility: [], learnMore: [], boothQuery: "election office Chennai", actions: [] },
      { id: "nomination", title: "Nomination", icon: "📋", shortDescription: "Understand how candidates file nominations.", longDescription: "Nomination is the formal filing stage for candidates.", windowLabel: "Administrative stage", stage: "nomination", eligibility: [], learnMore: [], boothQuery: "district election office", actions: [] },
      { id: "campaign", title: "Campaign", icon: "📢", shortDescription: "Compare manifestos and local issues.", longDescription: "Campaign period is when voters gather context.", windowLabel: "Decision stage", stage: "campaign", eligibility: [], learnMore: [], boothQuery: "polling booth information", actions: [] },
      { id: "voting", title: "Voting", icon: "🗳️", shortDescription: "Arrive with valid ID and cast your vote.", longDescription: "Voting day is the most operational stage.", windowLabel: "Action day", stage: "voting", eligibility: [], learnMore: [], boothQuery: "polling booth Chennai", actions: [] },
      { id: "counting", title: "Counting", icon: "🔢", shortDescription: "Results are tabulated and announced.", longDescription: "Counting is primarily a transparency and results stage.", windowLabel: "Results stage", stage: "counting", eligibility: [], learnMore: [], boothQuery: "counting center", actions: [] },
      { id: "government-formation", title: "Government Formation", icon: "🏛️", shortDescription: "The winning party forms the government.", longDescription: "After results are finalized, swearing-in processes begin.", windowLabel: "Institutional transition", stage: "government-formation", eligibility: [], learnMore: [], boothQuery: "secretariat", actions: [] },
    ];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan/10 blur-[100px] -z-10 rounded-full" />
      
      <div className="text-center mb-24 space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold premium-gradient-text tracking-tight">
          The Grand Journey
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Tracing the path from civic enrollment to the dawn of a new administration.
        </p>
      </div>

      <TimelineClient milestones={milestones} />
    </div>
  );
}
