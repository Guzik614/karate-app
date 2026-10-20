"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", next);
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo.toString() },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg border border-border bg-card p-4">
        Sprawdź skrzynkę <strong>{email}</strong> i kliknij link, aby się zalogować. Osu!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="twoj@email.pl"
        className="w-full rounded-lg border border-border bg-input px-4 py-3 outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "sending" ? "Wysyłanie…" : "Wyślij link"}
      </button>
      {status === "error" && <p className="text-sm text-accent-text">Nie udało się wysłać linku. Spróbuj ponownie.</p>}
    </form>
  );
}
