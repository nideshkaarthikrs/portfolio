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
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-indigo-300/40 hover:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{post.preview}</p>
              <p className="mt-4 text-xs text-indigo-200">Open on LinkedIn ↗</p>
            </a>
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
