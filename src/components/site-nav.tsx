import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Thoughts" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold tracking-wide text-white">
          Nidesh<span className="text-amber-300">.dev</span>
        </Link>
        <ul className="flex items-center gap-5 text-sm text-slate-200">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="transition hover:text-amber-300" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
