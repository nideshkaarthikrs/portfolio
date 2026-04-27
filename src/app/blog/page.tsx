import { Section } from "@/components/section";

const posts = [
  {
    title: "Building for Real Users: Family Doctor App",
    excerpt:
      "How I built a patient record manager for a real clinic and what changed when real constraints appeared.",
  },
  {
    title: "PromptShield and AI Safety Lessons",
    excerpt:
      "What I learned while designing practical protection layers around prompts and model outputs.",
  },
  {
    title: "From Student to Founder Mindset",
    excerpt:
      "A reflection on leadership, execution, and shipping products while learning in public.",
  },
];

export default function BlogPage() {
  return (
    <Section title="Blog / Posts" subtitle="Writing about building, AI, and leadership.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
