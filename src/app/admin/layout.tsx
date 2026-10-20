import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold">Panel admina</h1>
        <p className="mt-2 text-muted">
          Panel wymaga połączenia z Supabase. Uzupełnij <code>.env.local</code> i nadaj swojemu kontu
          rolę <code>admin</code> (instrukcja w README).
        </p>
      </div>
    );
  }

  await requireAdmin();

  return (
    <div className="space-y-6">
      <nav className="flex gap-2 border-b border-border pb-3 text-sm">
        <span className="mr-2 font-semibold">Panel admina:</span>
        <Link href="/admin/wiedza" className="hover:text-accent-text">
          Artykuły
        </Link>
        <Link href="/admin/techniki" className="hover:text-accent-text">
          Techniki i wideo
        </Link>
      </nav>
      {children}
    </div>
  );
}
