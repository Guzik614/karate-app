"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Start", icon: "⌂" },
  { href: "/techniki", label: "Techniki", icon: "拳" },
  { href: "/programy", label: "Programy", icon: "☰" },
  { href: "/wiedza", label: "Teoria i Wiedza", short: "Wiedza", icon: "書" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-xl text-accent">極真</span>
          <span>Kyokushin Dojo</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, l.href) ? "bg-accent text-white" : "hover:bg-card"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Dolny pasek zakładek na telefonie (PWA).
export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`flex flex-col items-center gap-0.5 py-2 text-xs ${
            isActive(pathname, l.href) ? "text-accent" : "text-muted"
          }`}
        >
          <span className="text-lg leading-none">{l.icon}</span>
          {l.short ?? l.label}
        </Link>
      ))}
    </nav>
  );
}
