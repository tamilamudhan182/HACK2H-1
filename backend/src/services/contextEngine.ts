import { acceptedIds, milestones, stateResources } from "../data/electionData.js";
import { buildMapsLink } from "./googleMaps.js";

function getStateContext(state: string) {
  return (stateResources as any)[state] ?? stateResources["Tamil Nadu"];
}

function buildOfficialAction(label: string, url: string) {
  return {
    label,
    type: "open-url",
    value: url
  };
}

function highlightStageAction(stageId: string, label: string) {
  return {
    label,
    type: "highlight-stage",
    value: stageId
  };
}

export function answerElectionQuery({ query, selectedStage, profile }: any) {
  const normalized = query.toLowerCase();
  const stateContext = getStateContext(profile.state);
  const activeStage = milestones.find((milestone) => milestone.id === selectedStage);

  if (normalized.includes("deadline") || normalized.includes("last date")) {
    return {
      answer: `I can guide you to the right source for ${profile.state}, but this build uses seeded planning data rather than live statutory deadlines. Open the state election portal, confirm the official cut-off for registration or revision, and add a reminder immediately after you verify it. ${stateContext.registrationSupport}`,
      stage: "registration",
      actions: [
        buildOfficialAction("Open official state site", stateContext.officialSite),
        highlightStageAction("registration", "Review registration step")
      ],
      source: "official-link"
    };
  }

  if (normalized.includes("id") || normalized.includes("document")) {
    return {
      answer: `For ${profile.state}, bring an accepted photo ID and make sure your name is on the voter roll. Commonly accepted IDs include ${acceptedIds.slice(0, 3).join(", ")}. ${profile.firstTimeVoter ? "Because you’re marked as a first-time voter, I’d strongly suggest confirming your record before voting day." : "A quick pre-check the day before voting can save time at the booth."}`,
      stage: "voting",
      actions: [
        buildOfficialAction("Check elector search", stateContext.boothFinder),
        highlightStageAction("voting", "Open voting guidance")
      ],
      source: "seeded"
    };
  }

  if (normalized.includes("booth") || normalized.includes("polling") || normalized.includes("nearest")) {
    const queryText = `${profile.district} polling booth ${profile.state}`;
    return {
      answer: `The safest path is to verify your polling booth through the official elector search, then save directions in Google Maps for ${profile.district}. If booth data changes close to voting day, the official portal will be more reliable than copied messages.`,
      stage: "voting",
      actions: [
        buildOfficialAction("Open elector search", stateContext.boothFinder),
        buildOfficialAction("Open booth map", buildMapsLink(queryText))
      ],
      source: "official-link"
    };
  }

  if (normalized.includes("what next") || normalized.includes("next step") || normalized.includes("now what")) {
    const nextStage = activeStage ?? milestones[0];
    return {
      answer: `Your current focus is ${nextStage.title}. The practical next step is to complete one concrete action tied to this stage, then update the checklist so reminders stay useful. ${profile.languagePreference === "detailed" ? nextStage.longDescription : nextStage.shortDescription}`,
      stage: nextStage.id,
      actions: [highlightStageAction(nextStage.id, `Open ${nextStage.title}`)],
      source: "seeded"
    };
  }

  return {
    answer: `Here’s the simplest path for ${profile.state}: confirm registration status, verify booth details before voting day, carry accepted ID, and follow official Election Commission updates for any timing changes. ${profile.firstTimeVoter ? "Because you’re a first-time voter, I’d prioritize registration proof and a saved booth route first." : "You can use the timeline to jump directly to the stage you care about."}`,
    stage: selectedStage ?? "registration",
    actions: [
      highlightStageAction(selectedStage ?? "registration", "Show current stage"),
      buildOfficialAction("Open official state site", stateContext.officialSite)
    ],
    source: "seeded"
  };
}
