import type { Metadata } from "next";
import { PageHeader } from "@/components/card-link";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Logowanie" };

export default async function LoginPage({ searchParams }: PageProps<"/logowanie">) {
  const { next } = await searchParams;
  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Logowanie" lead="Wyślemy Ci link do logowania na adres e-mail." />
      {isSupabaseConfigured ? (
        <LoginForm next={typeof next === "string" ? next : "/"} />
      ) : (
        <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted">
          Logowanie zadziała po uzupełnieniu zmiennych Supabase w pliku <code>.env.local</code>{" "}
          (zobacz README).
        </p>
      )}
    </div>
  );
}
