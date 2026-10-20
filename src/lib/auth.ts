import "server-only";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./supabase/env";
import { createClient } from "./supabase/server";

export type CurrentUser = {
  id: string;
  email: string | null;
  role: "student" | "instructor" | "admin";
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return { id: user.id, email: user.email ?? null, role: profile?.role ?? "student" };
}

// Strony i akcje admina wołają to na starcie. RLS w bazie jest drugą linią obrony.
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/logowanie?next=/admin");
  if (user.role !== "admin") redirect("/?brak-uprawnien=1");
  return user;
}
