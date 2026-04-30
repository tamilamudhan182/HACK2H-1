"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, RefreshCw, Award, Loader2, Sparkles } from "lucide-react";
import { getProgress, toggleChecklist, syncGoogleTasks } from "@/lib/api";
import type { ChecklistItem } from "@/lib/types";

export function ChecklistClient() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  useEffect(() => {
    getProgress()
      .then(data => {
        setItems(data.checklist);
        setSynced(data.synced);
      })
      .catch(() => {
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
    setItems(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    try {
      const data = await toggleChecklist(id);
      setItems(data.checklist);
      setSynced(data.synced);
    } catch {
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
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Progress Card - Million Dollar Aesthetic */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-glass p-10 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles className="w-32 h-32 text-cyan" />
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
            <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none" strokeWidth="14" />
            <motion.circle 
              cx="80" cy="80" r="70" 
              className="stroke-cyan fill-none" 
              strokeWidth="14" 
              strokeDasharray="439.8" 
              initial={{ strokeDashoffset: 439.8 }}
              animate={{ strokeDashoffset: 439.8 - (439.8 * progress) / 100 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-black text-white">{progress}%</span>
            <span className="text-[10px] font-bold tracking-widest text-cyan uppercase opacity-70">Complete</span>
          </div>
          {/* Progress Glow */}
          <div className="absolute inset-0 bg-cyan/20 rounded-full blur-[40px] opacity-20" />
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {progress === 100 ? "Elite Voter Status" : "Your Civic Journey"}
            </h2>
            <p className="text-slate-400 font-light">
              {loading ? "Initializing tracker..." : `You've mastered ${completedCount} of ${items.length} critical actions.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={handleSync}
              disabled={syncLoading}
              className="px-6 py-3 bg-cyan text-ink font-bold rounded-2xl hover:bg-cyan/90 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50"
            >
              {syncLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
              {synced ? "Re-sync Assets" : "Sync with Google Tasks"}
            </button>
            
            <AnimatePresence>
              {syncMessage && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm font-medium ${syncMessage.includes("failed") ? "text-red-400" : "text-cyan"}`}
                >
                  {syncMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Task List - Refined Items */}
      <div className="grid grid-cols-1 gap-4">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 premium-glass rounded-2xl animate-pulse" />
            ))
          : items.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleToggle(task.id)}
              className={`p-6 rounded-[1.5rem] border transition-all cursor-pointer flex items-center gap-6 group ${
                task.completed 
                  ? "bg-cyan/5 border-cyan/20 opacity-60" 
                  : "premium-glass hover:border-cyan/30"
              }`}
            >
              <div className="shrink-0 transition-transform group-active:scale-90">
                {task.completed ? (
                  <div className="w-8 h-8 rounded-full bg-cyan flex items-center justify-center cyan-glow">
                    <CheckCircle2 className="w-5 h-5 text-ink" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-cyan/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan/50 transition-colors" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold tracking-tight transition-all ${task.completed ? "text-slate-500 line-through" : "text-white"}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-slate-400 font-light mt-0.5">{task.description}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <div className={`text-[10px] font-bold px-2 py-1 rounded-md border ${task.completed ? "border-cyan/20 text-cyan/50" : "border-white/10 text-slate-500"}`}>
                  {task.completed ? "COMPLETED" : "PENDING"}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
