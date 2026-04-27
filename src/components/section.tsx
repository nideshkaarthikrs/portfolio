export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-reveal scroll-mt-24 py-14">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          <span className="mr-2 text-red-300">◓</span>
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-slate-300/95">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
