import type { ThoughtCard as ThoughtCardType } from "@/lib/profile";

export function ThoughtCard({ thought }: { thought: ThoughtCardType }) {
  return (
    <a
      href={thought.url}
      target="_blank"
      rel="noreferrer"
      className="premium-card rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-6"
    >
      <h3 className="line-clamp-2 text-lg font-semibold text-white">{thought.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">
        {thought.preview}
      </p>
      <p className="mt-4 text-xs text-indigo-200">Open on LinkedIn ↗</p>
    </a>
  );
}
