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
  readmeDescription?: string;
  techStackBadges?: string[];
  liveLink?: string | null;
};

const revalidateSeconds = 60 * 60;
const techKeywords = [
  "next.js",
  "react",
  "typescript",
  "javascript",
  "tailwind",
  "node",
  "express",
  "python",
  "flask",
  "django",
  "java",
  "spring",
  "mongodb",
  "postgresql",
  "mysql",
  "firebase",
  "supabase",
  "docker",
  "kubernetes",
  "redis",
  "openai",
  "langchain",
  "pytorch",
  "tensorflow",
];

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

function decodeReadme(base64Content: string) {
  try {
    return Buffer.from(base64Content, "base64").toString("utf8");
  } catch {
    return "";
  }
}

function formatBadge(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace("Js", "JS");
}

function extractLiveLink(readme: string, homepage: string | null) {
  if (homepage && homepage.trim()) return homepage.trim();
  const matches = Array.from(
    readme.matchAll(/https?:\/\/[^\s)"]+/gi),
    (item) => item[0],
  );
  return (
    matches.find((url) =>
      /(vercel\.app|netlify\.app|render\.com|onrender\.com|railway\.app|pages\.dev|herokuapp\.com)/i.test(
        url,
      ),
    ) ??
    matches.find((url) => !url.includes("github.com")) ??
    null
  );
}

function extractReadmeDescription(readme: string) {
  const lines = readme
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (line.startsWith("#")) continue;
    if (line.startsWith("![")) continue;
    if (line.includes("shields.io")) continue;
    if (line.length < 20) continue;
    return line.replace(/[`*_>#-]/g, "").trim();
  }

  return null;
}

function extractTechStack(repo: Repo, readme: string) {
  const stack = new Set<string>();
  if (repo.language) stack.add(formatBadge(repo.language));
  (repo.topics ?? []).forEach((topic) => stack.add(formatBadge(topic)));

  const lowerReadme = readme.toLowerCase();
  techKeywords.forEach((keyword) => {
    if (lowerReadme.includes(keyword)) {
      stack.add(formatBadge(keyword));
    }
  });

  return Array.from(stack).slice(0, 8);
}

type ReadmeResponse = {
  content: string;
};

async function enrichRepoWithReadme(
  owner: string,
  repoName: string,
  repo: Repo,
): Promise<Repo> {
  const readme = await fetchJson<ReadmeResponse>(
    `https://api.github.com/repos/${owner}/${repoName}/readme`,
  );
  const readmeText = readme?.content ? decodeReadme(readme.content) : "";

  return {
    ...repo,
    readmeDescription:
      extractReadmeDescription(readmeText) ?? repo.description ?? undefined,
    techStackBadges: extractTechStack(repo, readmeText),
    liveLink: extractLiveLink(readmeText, repo.homepage),
  };
}

export async function getHighlightedRepos(): Promise<Repo[]> {
  const profile = await getProfileData();
  const uniqueLinks = [...new Set(profile.projectLinks)];
  const parsedLinks = uniqueLinks.map(parseRepoPath).filter(Boolean) as Array<{
    owner: string;
    repo: string;
  }>;

  const repos = await Promise.allSettled(
    parsedLinks.map(async ({ owner, repo }) => {
      const repoData = await fetchJson<Repo>(
        `https://api.github.com/repos/${owner}/${repo}`,
      );
      if (!repoData) return null;
      return enrichRepoWithReadme(owner, repo, repoData);
    }),
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
