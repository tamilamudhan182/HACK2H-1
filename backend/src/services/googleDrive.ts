import { resources } from "../data/electionData.js";

export function getGuideDocument() {
  return resources.find((resource) => resource.id === "guide-doc")?.url ?? "https://drive.google.com/";
}

