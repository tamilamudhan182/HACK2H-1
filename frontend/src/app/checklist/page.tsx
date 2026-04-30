import { ChecklistClient } from "@/components/ChecklistClient";

export default function Checklist() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-['var(--font-display)'] text-white mb-4">
          My Election Journey
        </h1>
        <p className="text-mist/70">Track your progress and ensure you are ready for voting day.</p>
      </div>
      <ChecklistClient />
    </div>
  );
}
