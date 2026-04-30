"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarPlus, MapPin, CheckSquare, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { getCalendarLink, getMapsLink } from "@/lib/api";

const stepDetails: Record<string, {
  title: string;
  iconEmoji: string;
  description: string;
  extendedDetails: string;
  deadline: string;
  boothQuery: string;
}> = {
  registration: {
    title: "Voter Registration",
    iconEmoji: "📝",
    description: "Before you can vote, you must be registered. This ensures your name is on the electoral roll.",
    extendedDetails: "The electoral roll is a list of all eligible citizens who are registered to vote. If you have recently moved, turned 18, or have never voted before, you must register. Forms can be submitted online or at designated local offices.",
    deadline: "October 1, 2026",
    boothQuery: "election registration office Chennai",
  },
  nomination: {
    title: "Candidate Nomination",
    iconEmoji: "📋",
    description: "The formal filing stage for candidates, when official candidate lists begin to take shape.",
    extendedDetails: "Nomination is the formal filing stage for candidates. For voters, this is when election notifications become more concrete and useful for planning reminders and local awareness.",
    deadline: "October 20, 2026",
    boothQuery: "district election office Chennai",
  },
  campaign: {
    title: "Campaigning",
    iconEmoji: "📢",
    description: "Compare manifestos, debates, and local issues before voting day arrives.",
    extendedDetails: "The campaign period is when voters gather context. Use this stage to compare candidates, understand local issues, and confirm any public information about polling arrangements.",
    deadline: "November 3, 2026",
    boothQuery: "polling booth information Chennai",
  },
  voting: {
    title: "Voting Day",
    iconEmoji: "🗳️",
    description: "Cast your vote at your designated polling booth.",
    extendedDetails: "On voting day, polling booths are open from 7:00 AM to 6:00 PM. You must carry a valid photo ID. Arrive early, especially if you are a first-time voter, to make the process calmer and easier.",
    deadline: "November 5, 2026",
    boothQuery: "polling booth Chennai",
  },
  counting: {
    title: "Vote Counting",
    iconEmoji: "🔢",
    description: "Results are tabulated, verified, and announced through official channels.",
    extendedDetails: "Counting is primarily a transparency and results stage for voters. It is best to rely on official commission channels and reputable newsrooms rather than fragmented screenshots or social media claims.",
    deadline: "November 8, 2026",
    boothQuery: "counting center Chennai",
  },
  government: {
    title: "Government Formation",
    iconEmoji: "🏛️",
    description: "The winning alliance or party moves into the government formation phase.",
    extendedDetails: "After results are finalized, coalition-building, formal invitations, and swearing-in processes lead to government formation. This helps users understand what follows the vote.",
    deadline: "November 15, 2026",
    boothQuery: "secretariat Chennai",
  },
};

export default function StepDetail({ params }: { params: Promise<{ stepId: string }> }) {
  const resolvedParams = use(params);
  const stepId = resolvedParams.stepId;

  const data = stepDetails[stepId] ?? {
    title: "Step Details",
    iconEmoji: "⏰",
    description: "Details for this step are being updated.",
    extendedDetails: "Please check back later for more comprehensive information regarding this stage of the election timeline.",
    deadline: "TBD",
    boothQuery: "election office",
  };

  const [calLoading, setCalLoading] = useState(false);
  const [mapsLoading, setMapsLoading] = useState(false);
  const [calDone, setCalDone] = useState(false);

  const handleCalendar = async () => {
    setCalLoading(true);
    try {
      const { url } = await getCalendarLink(stepId);
      window.open(url, "_blank", "noopener,noreferrer");
      setCalDone(true);
    } catch {
      // fallback: open google calendar directly
      window.open("https://calendar.google.com", "_blank", "noopener,noreferrer");
    } finally {
      setCalLoading(false);
    }
  };

  const handleMaps = async () => {
    setMapsLoading(true);
    try {
      const { url } = await getMapsLink(data.boothQuery);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(data.boothQuery)}`, "_blank", "noopener,noreferrer");
    } finally {
      setMapsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/timeline" className="inline-flex items-center gap-2 text-mist/60 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Timeline
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-panel overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8 border-b border-white/10 pb-8">
            <div className="p-4 bg-ink rounded-2xl border border-cyan/20 shadow-[0_0_20px_rgba(89,213,224,0.2)] text-5xl">
              {data.iconEmoji}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-['var(--font-display)'] text-white mb-2">
                {data.title}
              </h1>
              <p className="text-lg text-mist/70">{data.description}</p>
            </div>
          </div>

          <div className="space-y-6 mb-12 text-mist/80 leading-relaxed">
            <h3 className="text-xl font-semibold text-white">What you need to know</h3>
            <p>{data.extendedDetails}</p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Deadline: {data.deadline}</span>
            </div>
          </div>

          {/* Action Buttons — wired to backend Google APIs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCalendar}
              disabled={calLoading}
              className="flex-1 px-6 py-4 rounded-xl bg-cyan text-ink font-semibold hover:bg-cyan/90 transition-all shadow-[0_0_20px_rgba(89,213,224,0.2)] flex items-center justify-center gap-2 disabled:opacity-60"
              aria-label="Add this event to Google Calendar"
            >
              {calLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : calDone ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <CalendarPlus className="w-5 h-5" />
              )}
              {calDone ? "Added to Calendar!" : "Add to Google Calendar"}
            </button>

            <button
              onClick={handleMaps}
              disabled={mapsLoading}
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              aria-label="Find nearest booth on Google Maps"
            >
              {mapsLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5 text-cyan" />
              )}
              Find on Google Maps
            </button>

            <Link
              href="/checklist"
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              aria-label="Go to your checklist"
            >
              <CheckSquare className="w-5 h-5 text-gold" />
              My Checklist
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
