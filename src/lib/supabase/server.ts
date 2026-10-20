import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "./env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Wywołane z Server Component: sesję odświeża proxy.ts.
        }
      },
    },
  });
}

// Klient z kluczem service role omija RLS. Tylko dla webhooków i skryptów.
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Brak SUPABASE_SERVICE_ROLE_KEY");
  return createAdminClient(supabaseUrl, key, {
    auth: { persistSession: false },
  });
}
