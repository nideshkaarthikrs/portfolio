import { Section } from "@/components/section";
import { getProfileData } from "@/lib/profile";

export default async function AboutPage() {
  const profile = await getProfileData();

  return (
    <Section title="About Me">
      <div className="space-y-5 text-slate-300">
        <p>
          {profile.name} is a student developer at Scaler School of Technology,
          focused on software engineering and AI engineering.
        </p>
        <p>
          Alongside coding, he explores entrepreneurship, leadership, and
          communication through creative hobbies like magic.
        </p>
      </div>
    </Section>
  );
}
