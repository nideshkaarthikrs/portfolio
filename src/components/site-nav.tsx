"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="pokeball-divider sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          Nidesh<span className="text-yellow-300">.dex</span>
        </Link>
        <ul className="flex w-full items-center gap-2 overflow-x-auto pb-1 text-sm text-slate-200 sm:w-auto sm:gap-5 sm:pb-0">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={`inline-flex rounded-full border px-3 py-1.5 transition ${
                  pathname === link.href
                    ? "border-yellow-300/70 bg-yellow-300/15 text-yellow-200"
                    : "border-transparent hover:border-red-300/40 hover:text-red-200"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
