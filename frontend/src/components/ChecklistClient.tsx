"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, RefreshCw, Award, Loader2 } from "lucide-react";
import { getProgress, toggleChecklist, syncGoogleTasks } from "@/lib/api";
import type { ChecklistItem } from "@/lib/types";

export function ChecklistClient() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  // Load real progress from backend on mount
  useEffect(() => {
    getProgress()
      .then(data => {
        setItems(data.checklist);
        setSynced(data.synced);
      })
      .catch(() => {
        // Fallback to local state if backend is unavailable
        setItems([
          { id: "register", title: "Register to Vote", description: "Confirm enrollment.", completed: true },
          { id: "verify-roll", title: "Verify Name on Electoral Roll", description: "Double-check your record.", completed: false },
          { id: "research", title: "Research Candidates", description: "Review manifestos.", completed: false },
          { id: "find-booth", title: "Find Polling Booth", description: "Save directions.", completed: false },
          { id: "reminder", title: "Set Reminder for Voting Day", description: "Set an alert.", completed: false },
          { id: "cast-vote", title: "Cast Vote", description: "Carry accepted ID, arrive with enough time.", completed: false },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string) => {
    // Optimistic UI update
    setItems(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      const data = await toggleChecklist(id);
      setItems(data.checklist);
      setSynced(data.synced);
    } catch {
      // Revert on failure
      setItems(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
  };

  const handleSync = async () => {
    setSyncLoading(true);
    setSyncMessage("");
    try {
      const result = await syncGoogleTasks();
      setSynced(true);
      setSyncMessage(result.message ?? "Successfully synced with Google Tasks!");
    } catch {
      setSyncMessage("Sync failed. Please try again.");
    } finally {
      setSyncLoading(false);
      setTimeout(() => setSyncMessage(""), 4000);
    }
  };

  const completedCount = items.filter(t => t.completed).length;
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <>
      {/* Progress Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-panel"
      >
        <div 
          className="relative w-32 h-32 flex items-center justify-center shrink-0"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Checklist ${progress}% complete`}
        >
          <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
            <circle cx="64" cy="64" r="56" className="stroke-white/10 fill-none" strokeWidth="12" />
            <circle 
              cx="64" cy="64" r="56" 
              className="stroke-cyan fill-none transition-all duration-1000 ease-out" 
              strokeWidth="12" 
              strokeDasharray="351.86" 
              strokeDashoffset={351.86 - (351.86 * progress) / 100}
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-cyan" />
            ) : (
              <span className="text-2xl font-bold text-white">{progress}%</span>
            )}
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
            {progress === 100 ? (
              <><Award className="text-gold w-6 h-6" /> You're All Set!</>
            ) : (
              "Keep Going!"
            )}
          </h2>
          <p className="text-mist/70 mb-4">
            {loading ? "Loading your progress..." : `You have completed ${completedCount} out of ${items.length} essential tasks.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={handleSync}
              disabled={syncLoading}
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              aria-label="Sync checklist with Google Tasks"
            >
              {syncLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {synced ? "Re-sync with Google Tasks" : "Sync with Google Tasks"}
            </button>
            {syncMessage && (
              <p className={`text-xs ${syncMessage.includes("failed") ? "text-red-400" : "text-cyan"}`}>
                {syncMessage}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Task List */}
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 md:p-6 rounded-2xl border border-white/10 bg-white/5 animate-pulse h-20" />
            ))
          : items.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleToggle(task.id)}
              className={`p-4 md:p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                task.completed 
                  ? "bg-cyan/5 border-cyan/20 opacity-70" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-sm"
              }`}
              role="button"
              aria-pressed={task.completed}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggle(task.id);
                }
              }}
            >
              <div className="shrink-0" aria-hidden="true">
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-cyan" />
                ) : (
                  <Circle className="w-6 h-6 text-mist/40" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium text-lg ${task.completed ? "text-mist/70 line-through decoration-mist/30" : "text-white"}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-mist/50 mt-0.5">{task.description}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </>
  );
}
