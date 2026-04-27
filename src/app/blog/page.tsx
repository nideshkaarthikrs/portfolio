import { ThoughtCard } from "@/components/thought-card";
import { Section } from "@/components/section";
import { buildThoughtCards, getProfileData } from "@/lib/profile";

export default async function BlogPage() {
  const profile = await getProfileData();
  const thoughtCards = buildThoughtCards(profile.linkedinPostLinks);
  return (
    <Section
      title="Writing / Thoughts"
      subtitle="LinkedIn posts pulled from me.md."
    >
      {thoughtCards.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {thoughtCards.map((post) => (
            <ThoughtCard key={post.url} thought={post} />
          ))}
        </div>
      ) : (
        <p className="text-slate-300">
          Add LinkedIn post URLs in `me.md` under a bullet list to populate this
          section automatically.
        </p>
      )}
    </Section>
  );
}
