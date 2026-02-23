-- Run this in Supabase SQL editor

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  notes text default '',
  column_name text not null check (column_name in ('Do Now', 'Do Next', 'Later')),
  votes integer not null default 0,
  owner text default '',
  due_date date null,
  impact integer not null default 3 check (impact between 1 and 5),
  revenue integer not null default 3 check (revenue between 1 and 5),
  urgency integer not null default 3 check (urgency between 1 and 5),
  confidence integer not null default 3 check (confidence between 1 and 5),
  effort integer not null default 3 check (effort between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_ideas_updated_at on public.ideas;
create trigger trg_ideas_updated_at
before update on public.ideas
for each row execute procedure public.set_updated_at();

alter table public.ideas enable row level security;

-- Demo mode policy (open board). Tighten later if needed.
drop policy if exists "ideas_select_all" on public.ideas;
create policy "ideas_select_all" on public.ideas for select using (true);

drop policy if exists "ideas_insert_all" on public.ideas;
create policy "ideas_insert_all" on public.ideas for insert with check (true);

drop policy if exists "ideas_update_all" on public.ideas;
create policy "ideas_update_all" on public.ideas for update using (true) with check (true);

drop policy if exists "ideas_delete_all" on public.ideas;
create policy "ideas_delete_all" on public.ideas for delete using (true);

-- Seed rows
insert into public.ideas (title, notes, column_name, impact, revenue, urgency, confidence, effort)
values
('Automate client onboarding packet', 'Forms + e-sign + CRM handoff', 'Do Now', 5,4,5,4,2),
('Build tax-savings lead magnet quiz', 'Capture W-2 and owner leads', 'Do Next', 4,5,3,3,3)
on conflict do nothing;
