"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem, UserProfile } from "@/lib/types";

type FaqSectionProps = {
  faqs: FaqItem[];
  profile: UserProfile;
};

export function FaqSection({ faqs, profile }: FaqSectionProps) {
  const [openId, setOpenId] = useState(faqs[0]?.id);

  useEffect(() => {
    if (!openId && faqs[0]?.id) {
      setOpenId(faqs[0].id);
    }
  }, [faqs, openId]);

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
        FAQs and clarity
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        Quick answers, with detail when you want it
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((item) => {
          const open = item.id === openId;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/35"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open}
                onClick={() => setOpenId(open ? "" : item.id)}
              >
                <span className="font-medium text-white">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open ? (
                <div className="border-t border-white/8 px-5 py-4 text-sm leading-7 text-slate-300">
                  {profile.languagePreference === "simple"
                    ? item.shortAnswer
                    : item.detailedAnswer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

