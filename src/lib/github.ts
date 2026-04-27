import { getProfileData } from "@/lib/profile";

export type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
};

const revalidateSeconds = 60 * 60;

function parseRepoPath(repoUrl: string) {
  const cleaned = repoUrl.replace(/\.git$/, "");
  const match = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

async function fetchJson<T>(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      throw new Error(`GitHub request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return null as T;
  }
}

export async function getHighlightedRepos(): Promise<Repo[]> {
  const profile = await getProfileData();
  const uniqueLinks = [...new Set(profile.projectLinks)];
  const parsedLinks = uniqueLinks.map(parseRepoPath).filter(Boolean) as Array<{
    owner: string;
    repo: string;
  }>;

  const repos = await Promise.allSettled(
    parsedLinks.map(({ owner, repo }) =>
      fetchJson<Repo>(`https://api.github.com/repos/${owner}/${repo}`),
    ),
  );

  return repos
    .filter((item): item is PromiseFulfilledResult<Repo> => item.status === "fulfilled")
    .map((item) => item.value)
    .filter((repo): repo is Repo => Boolean(repo))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    );
}

export async function getLatestUserRepos(limit = 6): Promise<Repo[]> {
  const profile = await getProfileData();
  const username = profile.githubUrl.match(/github\.com\/([^/]+)/i)?.[1];
  if (!username) return [];

  const repos = await fetchJson<Repo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
  );

  if (!repos) return [];
  return repos.filter((repo) => !repo.name.endsWith(".github.io")).slice(0, limit);
}
