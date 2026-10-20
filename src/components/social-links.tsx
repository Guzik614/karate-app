import type { SocialLink } from "@/content/club";

const LABELS: Record<SocialLink["network"], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};

// Uproszczone ikony serwisów (24×24, currentColor).
const ICONS: Record<SocialLink["network"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3Z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.9c-1.4.1-2.6-.3-3.9-1.1v5.6c0 3.9-3.6 6.6-7.2 5.6-3.9-1.1-5-6.1-2-8.7 1.2-1 2.6-1.4 4.2-1.2v3.1c-.5-.2-1-.2-1.5-.1-1.6.4-2.2 2.4-1 3.5 1.3 1.2 3.6.4 3.6-1.7V3h3.9Z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
    />
  ),
};

export function SocialLinks({ links, label }: { links: SocialLink[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {links.map((link) => (
        <li key={link.network}>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent-text"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
              {ICONS[link.network]}
            </svg>
            {LABELS[link.network]}
          </a>
        </li>
      ))}
    </ul>
  );
}
