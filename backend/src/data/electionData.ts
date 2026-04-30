export const milestones = [
  {
    id: "registration",
    title: "Registration",
    icon: "??",
    shortDescription: "Confirm eligibility, submit your voter details, and verify your name on the rolls.",
    longDescription:
      "Registration is the earliest and most important step. First-time voters should verify eligibility, prepare identity and address proofs, and confirm enrollment status through the official election portal before any constituency-specific cut-off approaches.",
    windowLabel: "Preparation window",
    stage: "registration",
    eligibility: [
      "Valid proof of identity and address",
      "Basic demographic details matching your documents",
      "A follow-up check to confirm your record appears on the voter roll"
    ],
    learnMore: [
      "Check whether you are already enrolled before creating a fresh application.",
      "Use the national voter service portal or your state CEO website for the final form submission.",
      "Keep a screenshot or acknowledgement number so you can track application status later."
    ],
    boothQuery: "election registration office Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find office", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-05-05T09:00:00+05:30",
    calendarEnd: "2026-05-05T09:30:00+05:30"
  },
  {
    id: "nomination",
    title: "Nomination",
    icon: "??",
    shortDescription: "Understand how candidates file nominations and how scrutiny works.",
    longDescription:
      "Nomination is the formal filing stage for candidates. For voters, this is when official candidate lists begin to take shape and election notifications become more concrete and useful for planning reminders and local awareness.",
    windowLabel: "Administrative stage",
    stage: "nomination",
    eligibility: [
      "Track announcements from the Election Commission and state CEO office",
      "Review official candidate notifications once scrutiny is complete",
      "Watch for constituency-specific updates or re-poll notices"
    ],
    learnMore: [
      "Scrutiny verifies whether candidate papers meet legal requirements.",
      "The final candidate list often sharpens the campaign period for voters.",
      "This stage is a good time to verify constituency and booth details."
    ],
    boothQuery: "district election office Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find office", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-05-12T11:00:00+05:30",
    calendarEnd: "2026-05-12T11:30:00+05:30"
  },
  {
    id: "campaign",
    title: "Campaign",
    icon: "??",
    shortDescription: "Compare manifestos, debates, and local issues before voting day arrives.",
    longDescription:
      "The campaign period is when voters gather context. Use this stage to compare candidates, understand local issues, and confirm any public information about polling arrangements. This is also when misinformation risk is highest, so official sources matter most.",
    windowLabel: "Decision stage",
    stage: "campaign",
    eligibility: [
      "Verify claims against official notices and reputable reporting",
      "Keep booth information handy before crowds build near voting day",
      "Review candidate affidavits where available"
    ],
    learnMore: [
      "Focus on practical facts such as polling date, booth location, and approved ID.",
      "If you are helping family members vote, share reminders early.",
      "Use quieter days to plan transport and timing for voting."
    ],
    boothQuery: "polling booth information Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find booth", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-05-20T18:00:00+05:30",
    calendarEnd: "2026-05-20T18:30:00+05:30"
  },
  {
    id: "voting",
    title: "Voting",
    icon: "???",
    shortDescription: "Arrive at the polling booth with valid ID, verify your name, and cast your vote.",
    longDescription:
      "Voting day is the most operational stage. Confirm your booth, carry an accepted photo ID, allow extra travel time, and follow local polling staff instructions. If you are a first-time voter, arriving early usually makes the process calmer and easier.",
    windowLabel: "Action day",
    stage: "voting",
    eligibility: [
      "Accepted photo identification",
      "Your name listed on the voter roll",
      "Knowledge of your polling booth and voting time window"
    ],
    learnMore: [
      "Check your polling station the night before and save directions.",
      "Bring only what you need to move quickly through the queue.",
      "Follow accessibility or assistance provisions if you need support at the booth."
    ],
    boothQuery: "polling booth Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find booth", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-05-28T07:00:00+05:30",
    calendarEnd: "2026-05-28T17:00:00+05:30"
  },
  {
    id: "counting",
    title: "Counting",
    icon: "??",
    shortDescription: "Results are tabulated, verified, and announced through official channels.",
    longDescription:
      "Counting is primarily a transparency and results stage for voters. It is best to rely on official commission channels and reputable newsrooms rather than fragmented screenshots or social media claims.",
    windowLabel: "Results stage",
    stage: "counting",
    eligibility: [
      "Use official results dashboards or state CEO pages",
      "Expect rolling updates before final confirmation",
      "Avoid treating early trends as final outcomes"
    ],
    learnMore: [
      "Counting updates can change during the day as rounds progress.",
      "Official declarations matter more than viral claim posts.",
      "This stage is informational for most users, not task-heavy."
    ],
    boothQuery: "counting center Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find updates", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-05-31T08:00:00+05:30",
    calendarEnd: "2026-05-31T08:30:00+05:30"
  },
  {
    id: "government-formation",
    title: "Government Formation",
    icon: "???",
    shortDescription: "The winning alliance or party moves into the government formation phase.",
    longDescription:
      "After results are finalized, coalition-building, formal invitations, and swearing-in processes lead to government formation. This stage helps users understand what follows the vote rather than requiring voter action.",
    windowLabel: "Institutional transition",
    stage: "government-formation",
    eligibility: [
      "Follow formal announcements from constitutional authorities",
      "Distinguish between seat counts and confirmed government formation",
      "Look for verified statements on alliances and leadership"
    ],
    learnMore: [
      "Not every result leads to a straightforward government immediately.",
      "Official swearing-in or confidence processes can take additional time.",
      "This stage is best explained with simple institutional summaries."
    ],
    boothQuery: "secretariat Chennai",
    actions: [
      { label: "Add reminder", kind: "calendar" },
      { label: "Find office", kind: "maps" },
      { label: "Track checklist", kind: "tasks" }
    ],
    calendarStart: "2026-06-03T10:00:00+05:30",
    calendarEnd: "2026-06-03T10:30:00+05:30"
  }
];

export const stateResources = {
  "Tamil Nadu": {
    officialSite: "https://www.elections.tn.gov.in/",
    boothFinder: "https://electoralsearch.eci.gov.in/",
    registrationSupport: "Use the state CEO portal and the national elector search for final verification."
  },
  Karnataka: {
    officialSite: "https://ceokarnataka.karnataka.gov.in/",
    boothFinder: "https://electoralsearch.eci.gov.in/",
    registrationSupport: "Confirm both enrollment status and polling part details before voting day."
  },
  Maharashtra: {
    officialSite: "https://ceoelection.maharashtra.gov.in/",
    boothFinder: "https://electoralsearch.eci.gov.in/",
    registrationSupport: "Use the CEO portal for state notices and the national portal for roll search."
  },
  Delhi: {
    officialSite: "https://ceodelhi.gov.in/",
    boothFinder: "https://electoralsearch.eci.gov.in/",
    registrationSupport: "Keep a digital copy of your enrollment acknowledgment for quick status checks."
  },
  Kerala: {
    officialSite: "https://ceo.kerala.gov.in/",
    boothFinder: "https://electoralsearch.eci.gov.in/",
    registrationSupport: "Track polling updates through the state CEO portal and district notices."
  }
};

export const acceptedIds = [
  "EPIC voter ID card",
  "Passport",
  "Driving licence",
  "Aadhaar card where accepted per local notification",
  "PAN card or another officially accepted photo ID listed by election authorities"
];

export const resources = [
  {
    id: "eci",
    title: "Election Commission of India",
    description: "The central reference point for official election notifications, voter services, and results.",
    url: "https://www.eci.gov.in/",
    category: "Official"
  },
  {
    id: "elector-search",
    title: "National Elector Search",
    description: "Search voter registration status and polling details before voting day.",
    url: "https://electoralsearch.eci.gov.in/",
    category: "Verification"
  },
  {
    id: "tn-ceo",
    title: "Tamil Nadu CEO Portal",
    description: "State-specific notices, electoral roll updates, and voter-facing instructions.",
    url: "https://www.elections.tn.gov.in/",
    category: "State"
  },
  {
    id: "guide-doc",
    title: "Election Readiness Guide",
    description: "A shareable guide placeholder that can later be synced into Google Docs or Drive.",
    url: "https://drive.google.com/",
    category: "Guide"
  }
];

