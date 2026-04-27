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
            className="pokemon-button rounded-full bg-yellow-300 px-5 py-2 font-semibold text-slate-900"
          >
            Pokedex (GitHub)
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="pokemon-button rounded-full bg-blue-500 px-5 py-2 font-semibold text-white"
          >
            Trainer Log (LinkedIn)
          </a>
        </div>
      </div>
    </Section>
  );
}
