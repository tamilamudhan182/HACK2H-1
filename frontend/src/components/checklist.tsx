"use client";

import { useState } from "react";
import { Check, CloudUpload, LoaderCircle } from "lucide-react";
import type { ProgressPayload } from "@/lib/types";

type ChecklistProps = {
  progress?: ProgressPayload;
  onToggle: (id: string) => Promise<void>;
  onSync: () => Promise<string>;
};

export function Checklist({ progress, onToggle, onSync }: ChecklistProps) {
  const [syncMessage, setSyncMessage] = useState("Checklist ready to sync.");
  const [isSyncing, setIsSyncing] = useState(false);

  if (!progress) {
    return (
      <section className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
        <p className="text-sm text-slate-300">Loading your checklist...</p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-panel">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
            Personalized checklist
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Stay prepared without losing momentum
          </h2>
        </div>
        <button
          type="button"
          onClick={async () => {
            setIsSyncing(true);
            const message = await onSync();
            setSyncMessage(message);
            setIsSyncing(false);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/35 px-4 py-2 text-sm text-slate-200 transition hover:border-gold/60"
        >
          {isSyncing ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <CloudUpload className="h-4 w-4" />
          )}
          Sync Google Tasks
        </button>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-slate-950/35 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-300">Progress</span>
          <span className="text-lg font-semibold text-white">
            {progress.percentage}%
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-coral via-gold to-cyan transition-all"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {progress.checklist.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={`flex w-full items-start gap-4 rounded-[1.4rem] border p-4 text-left transition ${
              item.completed
                ? "border-cyan/50 bg-cyan/10"
                : "border-white/10 bg-white/4 hover:border-white/20"
            }`}
          >
            <span
              className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                item.completed
                  ? "border-cyan bg-cyan text-slate-950"
                  : "border-white/20 text-transparent"
              }`}
            >
              <Check className="h-4 w-4" />
            </span>
            <span className="flex-1">
              <span className="block font-medium text-white">{item.title}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-300">
                {item.description}
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-400">{syncMessage}</p>
    </section>
  );
}

