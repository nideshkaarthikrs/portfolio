import { RepoCard } from "@/components/repo-card";
import { Section } from "@/components/section";
import { getHighlightedRepos, getLatestUserRepos } from "@/lib/github";

export default async function ProjectsPage() {
  const [highlightedRepos, latestRepos] = await Promise.all([
    getHighlightedRepos(),
    getLatestUserRepos(12),
  ]);

  return (
    <>
      <Section title="Highlighted Projects">
        {highlightedRepos.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlightedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p className="text-slate-300">Unable to fetch highlighted repositories.</p>
        )}
      </Section>
      <Section title="All Recent Repositories">
        {latestRepos.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p className="text-slate-300">Latest repositories will appear here soon.</p>
        )}
      </Section>
    </>
  );
}
