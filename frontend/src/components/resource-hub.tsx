import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { ResourceLink } from "@/lib/types";

type ResourceHubProps = {
  resources: ResourceLink[];
};

export function ResourceHub({ resources }: ResourceHubProps) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
        Trusted resources
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">
        Official links and practical handoffs
      </h2>
      <div className="mt-6 space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-slate-950/35 px-5 py-4 transition hover:border-gold/60"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                <BadgeCheck className="h-3.5 w-3.5 text-cyan" />
                {resource.category}
              </div>
              <h3 className="mt-2 font-medium text-white">{resource.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                {resource.description}
              </p>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
          </a>
        ))}
      </div>
    </section>
  );
}

