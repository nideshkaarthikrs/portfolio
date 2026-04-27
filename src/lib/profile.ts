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
  try {
    return await readFile(path.join(process.cwd(), "me.md"), "utf8");
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

function titleFromLinkedInUrl(url: string) {
  try {
    const parsed = new URL(normalizeUrl(url));
    const segments = parsed.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] ?? "linkedin-post";
    const cleaned = decodeURIComponent(last)
      .replace(/[-_]/g, " ")
      .replace(/\d+/g, "")
      .trim();
    const titleBase = cleaned || "LinkedIn Post";
    return titleBase.replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return "LinkedIn Post";
  }
}

export function buildThoughtCards(links: string[]): ThoughtCard[] {
  return links.map((link, index) => ({
    url: normalizeUrl(link),
    title: titleFromLinkedInUrl(link),
    preview: `Thought #${index + 1} from my LinkedIn feed on software, AI, and growth.`,
  }));
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
    content.matchAll(/-\s*(https?:\/\/(?:www\.)?linkedin\.com\/[^\s)]+)/gi),
  )
    .map((match) => normalizeUrl(match[1]))
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
