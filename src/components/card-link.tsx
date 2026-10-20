import Link from "next/link";

type Props = {
  href: string;
  title: string;
  subtitle?: string | null;
  meta?: string | null;
  children?: React.ReactNode;
};

export function CardLink({ href, title, subtitle, meta, children }: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
    >
      {meta && <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent">{meta}</p>}
      <h3 className="font-semibold group-hover:text-accent">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      {children}
    </Link>
  );
}

export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {lead && <p className="mt-2 max-w-2xl text-muted">{lead}</p>}
    </div>
  );
}
