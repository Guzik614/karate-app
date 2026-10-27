-- Program treningowy przygotowuje do konkretnego stopnia (np. 'J-10.1', 'S-10', 'D-1').
-- Zakładka Programy grupuje programy według torów Junior / Senior / Dan.

alter table public.programs
  add column if not exists grade_code text references public.grades on update cascade on delete set null;

create index if not exists programs_grade_idx on public.programs (grade_code);
