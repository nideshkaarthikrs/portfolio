import type { Repo } from "@/lib/github";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <article className="group rounded-2xl border border-indigo-200/20 bg-gradient-to-b from-indigo-500/10 to-slate-900 p-6 shadow-lg shadow-indigo-900/20 transition hover:-translate-y-1 hover:border-amber-300/40">
      <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
        {repo.readmeDescription ?? repo.description ?? "No description provided yet."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
        {(repo.techStackBadges?.length
          ? repo.techStackBadges
          : [repo.language ?? "Multi-stack"]
        ).map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-indigo-300/30 bg-indigo-400/10 px-2.5 py-1 text-[11px]"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
        <span>⭐ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-amber-300/50 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-300/15"
        >
          GitHub
        </a>
        {repo.liveLink ? (
          <a
            href={repo.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-emerald-300/50 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-300/15"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
