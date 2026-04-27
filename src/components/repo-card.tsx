import type { Repo } from "@/lib/github";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <article className="premium-card group rounded-2xl border border-blue-200/20 p-5 shadow-lg shadow-slate-950/30 sm:p-6">
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
            className="rounded-full border border-red-300/35 bg-red-400/10 px-2.5 py-1 text-[11px]"
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
          className="pokemon-button inline-flex bg-yellow-300 px-4 py-2 text-sm font-semibold text-slate-900"
        >
          GitHub
        </a>
        {repo.liveLink ? (
          <a
            href={repo.liveLink}
            target="_blank"
            rel="noreferrer"
            className="pokemon-button inline-flex bg-blue-400 px-4 py-2 text-sm font-semibold text-white"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
