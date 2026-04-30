import { milestones } from "../data/electionData.js";

function formatGoogleDate(dateString: string) {
  return new Date(dateString)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function buildCalendarLink(stageId: string) {
  const milestone = milestones.find((item) => item.id === stageId) ?? milestones[0];
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", `Election Compass: ${milestone.title}`);
  url.searchParams.set(
    "details",
    `${milestone.longDescription} Review official election notifications before acting.`
  );
  url.searchParams.set(
    "dates",
    `${formatGoogleDate(milestone.calendarStart)}/${formatGoogleDate(milestone.calendarEnd)}`
  );
  url.searchParams.set("location", milestone.boothQuery);
  return url.toString();
}
