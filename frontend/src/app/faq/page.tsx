import { FAQClient } from "@/components/FAQClient";
import { getFaqs, getResources } from "@/lib/api";
import type { FaqItem, ResourceLink } from "@/lib/types";

// This page is a Server Component — data is fetched at request time on the server
export default async function FAQ() {
  let faqs: FaqItem[] = [];
  let resources: ResourceLink[] = [];

  try {
    [{ faqs }, { resources }] = await Promise.all([getFaqs(), getResources()]);
  } catch {
    // Fallback static data if backend is unavailable
    faqs = [
      { id: "faq-id", question: "What ID do I need to vote?", shortAnswer: "Carry an accepted photo ID (EPIC, passport, driving licence).", detailedAnswer: "Your ID alone may not be enough if your name is missing from the voter roll, so confirm both ahead of time." },
      { id: "faq-register", question: "How do I know if I am registered?", shortAnswer: "Search the official elector portal.", detailedAnswer: "Use the national elector search or your state CEO portal to check whether your name appears." },
      { id: "faq-booth", question: "How do I find my polling booth?", shortAnswer: "Use the official elector search and save directions.", detailedAnswer: "Polling booth information is available through the national elector search or state election portals." },
      { id: "faq-counting", question: "When should I trust election results?", shortAnswer: "Trust official result dashboards only.", detailedAnswer: "Use official Election Commission channels before treating any outcome as final." },
    ];
    resources = [
      { id: "eci", title: "Election Commission of India", description: "Central reference for official election notifications.", url: "https://www.eci.gov.in/", category: "Official" },
      { id: "elector-search", title: "National Elector Search", description: "Search voter registration status before voting day.", url: "https://electoralsearch.eci.gov.in/", category: "Verification" },
      { id: "tn-ceo", title: "Tamil Nadu CEO Portal", description: "State-specific notices and voter-facing instructions.", url: "https://www.elections.tn.gov.in/", category: "State" },
    ];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-['var(--font-display)'] text-white mb-4">
          FAQs & Resources
        </h1>
        <p className="text-mist/70">
          Find answers to common questions and links to official election resources.
        </p>
      </div>
      <FAQClient faqs={faqs} resources={resources} />
    </div>
  );
}
