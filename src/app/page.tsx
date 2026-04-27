import Link from "next/link";
import { RepoCard } from "@/components/repo-card";
import { Section } from "@/components/section";
import { getHighlightedRepos } from "@/lib/github";
import { getProfileData } from "@/lib/profile";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "AI Prompt Engineering",
];

export default async function Home() {
  const profile = await getProfileData();
  const highlightedRepos = await getHighlightedRepos();

  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(239,68,68,0.2),transparent_44%)]" />
        <div className="relative max-w-3xl">
          <p className="mb-5 inline-block rounded-full border border-red-300/50 bg-red-400/15 px-4 py-2 text-sm text-red-100">
            Kanto-style trainer portfolio
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-slate-300 md:text-xl">{profile.role}</p>
          <p className="mt-4 max-w-2xl text-slate-300">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="pokemon-button rounded-full bg-yellow-300 px-6 py-3 font-semibold text-slate-900"
            >
              Pokedex (GitHub)
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="pokemon-button rounded-full bg-blue-500 px-6 py-3 font-semibold text-white"
            >
              Trainer Log (LinkedIn)
            </a>
          </div>
        </div>
      </section>

      <Section id="about" title="About">
        <p className="max-w-3xl leading-8 text-slate-300">
          I am an aspiring entrepreneur and builder who enjoys crafting software
          that solves practical problems. Outside code, I explore leadership,
          magic performance, and continuous learning.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.goalsAndHobbies.map((item) => (
            <span
              key={item}
              className="rounded-full border border-blue-300/40 bg-blue-400/15 px-3 py-1 text-sm text-blue-100"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        title="Project Highlights"
        subtitle="Auto-fetched using GitHub API from links in me.md"
      >
        {highlightedRepos.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlightedRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p className="text-slate-300">Unable to fetch repositories right now.</p>
        )}
      </Section>

      <Section id="skills" title="Skills">
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-yellow-300/45 bg-yellow-300/15 px-4 py-2 text-sm text-yellow-100"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-slate-300">
          Open to collaborations, internships, and startup ideas.
        </p>
        <Link
          href="/contact"
          className="pokemon-button mt-4 inline-flex rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
        >
          Send Challenge Invite
        </Link>
      </Section>
    </>
  );
}
