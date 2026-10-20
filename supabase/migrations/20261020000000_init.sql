-- Schemat początkowy aplikacji Karate Kyokushin.
-- Treści publiczne czyta każdy (także niezalogowany), zapis ma tylko rola admin.

-- ───────────────────────── Profile i role ─────────────────────────
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'instructor', 'admin')),
  belt text,
  created_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ───────────────────────── Techniki i wideo ─────────────────────────
create table public.techniques (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  name_jp text,
  category text not null check (category in ('kihon', 'kata', 'kihon_kumite')),
  subcategory text,
  belt_level text,
  description text,
  mux_asset_id text,
  mux_playback_id text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger techniques_updated_at before update on public.techniques
  for each row execute function public.set_updated_at();

-- ───────────────────────── Programy treningowe ─────────────────────────
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  level text,
  duration_weeks int,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.program_items (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs on delete cascade,
  technique_id uuid references public.techniques on delete set null,
  day int not null default 1,
  reps text,
  notes text,
  sort_order int not null default 0
);

create table public.progress (
  user_id uuid not null references auth.users on delete cascade,
  technique_id uuid not null references public.techniques on delete cascade,
  status text not null default 'learning' check (status in ('learning', 'practiced', 'mastered')),
  updated_at timestamptz not null default now(),
  primary key (user_id, technique_id)
);

-- ───────────────────────── Teoria i Wiedza ─────────────────────────
create table public.knowledge_categories (
  slug text primary key,
  name text not null,
  description text,
  sort_order int not null default 0
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '', -- Markdown
  category_slug text not null references public.knowledge_categories on update cascade,
  published boolean not null default false,
  sort_order int not null default 0,
  author_id uuid references auth.users on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

create table public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  term text not null unique,
  kanji text,
  meaning text not null,
  category text not null,
  description text,
  technique_id uuid references public.techniques on delete set null,
  sort_order int not null default 0
);

create index articles_category_idx on public.articles (category_slug, sort_order);
create index glossary_category_idx on public.glossary_terms (category, term);
create index program_items_program_idx on public.program_items (program_id, day, sort_order);

-- ───────────────────────── Row Level Security ─────────────────────────
alter table public.profiles enable row level security;
alter table public.techniques enable row level security;
alter table public.programs enable row level security;
alter table public.program_items enable row level security;
alter table public.progress enable row level security;
alter table public.knowledge_categories enable row level security;
alter table public.articles enable row level security;
alter table public.glossary_terms enable row level security;

create policy "Własny profil" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "Edycja własnego profilu" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

create policy "Publiczne techniki" on public.techniques
  for select using (published or public.is_admin());
create policy "Admin: techniki" on public.techniques
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Publiczne programy" on public.programs
  for select using (published or public.is_admin());
create policy "Admin: programy" on public.programs
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Publiczne elementy programów" on public.program_items
  for select using (true);
create policy "Admin: elementy programów" on public.program_items
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Własne postępy" on public.progress
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Publiczne kategorie wiedzy" on public.knowledge_categories
  for select using (true);
create policy "Admin: kategorie wiedzy" on public.knowledge_categories
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Opublikowane artykuły" on public.articles
  for select using (published or public.is_admin());
create policy "Admin: artykuły" on public.articles
  for all using (public.is_admin()) with check (public.is_admin());

create policy "Publiczny słowniczek" on public.glossary_terms
  for select using (true);
create policy "Admin: słowniczek" on public.glossary_terms
  for all using (public.is_admin()) with check (public.is_admin());
