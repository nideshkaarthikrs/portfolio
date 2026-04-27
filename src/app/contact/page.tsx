import { Section } from "@/components/section";
import { getProfileData } from "@/lib/profile";

export default async function ContactPage() {
  const profile = await getProfileData();

  return (
    <Section title="Contact">
      <div className="max-w-xl space-y-4 text-slate-300">
        <p>
          Reach out for internships, collaborations, startup ideas, or AI/product
          discussions.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-indigo-300/40 px-5 py-2 hover:bg-indigo-300/10"
          >
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-amber-300/40 px-5 py-2 hover:bg-amber-300/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
}
