export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Bez skonfigurowanego Supabase aplikacja czyta treści z src/content (tryb podglądu).
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
