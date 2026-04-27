import { readFile } from "node:fs/promises";
import path from "node:path";

export type ProfileData = {
  name: string;
  role: string;
  tagline: string;
  githubUrl: string;
  linkedinUrl: string;
  goalsAndHobbies: string[];
  projectLinks: string[];
  linkedinPostLinks: string[];
};

const fallbackContent = `# About Me
Name: Nidesh Kaarthik R S
Role: Learning Software Development and AI Engineering (student at Scaler School of Technology, Bangalore)
Tagline: Building practical software with strong product taste and an AI-first mindset.
# Links
GitHub: https://github.com/nideshkaarthikrs
LinkedIn: linkedin.com/in/nidesh-kaarthik-r-s-6bb535362
# Project Highlights
- https://github.com/nideshkaarthikrs/PatientRecordManagerRepo.git
- https://github.com/nideshkaarthikrs/receipt-end-term-project.git
- https://github.com/nideshkaarthikrs/PromptShield.git
- https://github.com/nideshkaarthikrs/DisasterReliefLogisticsCoordinator.git`;

async function readProfileSource() {
  const candidatePaths = [
    path.join(/* turbopackIgnore: true */ process.cwd(), "../me.md"),
    path.join(/* turbopackIgnore: true */ process.cwd(), "me.md"),
  ];

  for (const filePath of candidatePaths) {
    try {
      const content = await readFile(filePath, "utf8");
      if (content.trim()) return content;
    } catch {
      // Try the next path.
    }
  }

  try {
    return await readFile(
      path.join(/* turbopackIgnore: true */ process.cwd(), "me.md"),
      "utf8",
    );
  } catch {
    return fallbackContent;
  }
}

function matchValue(content: string, key: string, fallback = "") {
  const regex = new RegExp(`^${key}:\\s*(.+)$`, "im");
  return content.match(regex)?.[1]?.trim() ?? fallback;
}

function normalizeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value}`;
}

export type ThoughtCard = {
  url: string;
  title: string;
  preview: string;
};

function wordsToTitle(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function wordsFromLinkedInUrl(url: string) {
  try {
    const parsed = new URL(normalizeUrl(url));
    const postSegment =
      parsed.pathname
        .split("/")
        .filter(Boolean)
        .find((segment) => segment.includes("-activity-")) ?? "";

    const slugPart = postSegment.split("-activity-")[0] || postSegment;
    const rawWords = decodeURIComponent(slugPart)
      .replace(/[-_]/g, " ")
      .replace(/[^\w\s]/g, " ")
      .toLowerCase()
      .trim();

    const words = rawWords
      .split(" ")
      .filter((word) => word.length > 2)
      .filter((word) => !["www", "linkedin", "posts", "activity"].includes(word));

    return words.slice(0, 12);
  } catch {
    return [];
  }
}

export function buildThoughtCards(links: string[]): ThoughtCard[] {
  return links.map((link, index) => {
    const words = wordsFromLinkedInUrl(link);
    const titleWords = words.slice(0, 6);
    const previewWords = words.slice(6, 22);

    return {
      url: normalizeUrl(link),
      title: titleWords.length
        ? wordsToTitle(titleWords.join(" "))
        : `LinkedIn Thought #${index + 1}`,
      preview: previewWords.length
        ? `${wordsToTitle(previewWords.join(" "))}.`
        : `Sharing practical thoughts on software, AI, building products, and growth.`,
    };
  });
}

export async function getProfileData(): Promise<ProfileData> {
  const content = await readProfileSource();

  const projectLinks = Array.from(
    content.matchAll(/-\s*(https?:\/\/github\.com\/[^\s)]+)/gi),
  )
    .map((match) => match[1].replace(/\.git$/, ""))
    .filter((link, index, arr) => arr.indexOf(link) === index);

  const goalsAndHobbies = content
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#") && !line.includes(":"))
    .slice(-2)
    .flatMap((line) => line.split(","))
    .map((item) => item.trim())
    .filter(Boolean);

  const linkedinPostLinks = Array.from(
    content.matchAll(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s)]+/gi),
  )
    .map((match) => normalizeUrl(match[0]))
    .filter(
      (link, index, arr) =>
        arr.indexOf(link) === index &&
        /linkedin\.com\/(posts\/|feed\/update\/|pulse\/)/i.test(link),
    );

  return {
    name: matchValue(content, "Name", "Nidesh Kaarthik R S"),
    role: matchValue(content, "Role", "Software Developer"),
    tagline: matchValue(content, "Tagline", "Building things that help people."),
    githubUrl: normalizeUrl(matchValue(content, "GitHub", "github.com/nideshkaarthikrs")),
    linkedinUrl: normalizeUrl(
      matchValue(content, "LinkedIn", "linkedin.com/in/nidesh-kaarthik-r-s-6bb535362"),
    ),
    goalsAndHobbies,
    projectLinks,
    linkedinPostLinks,
  };
}
