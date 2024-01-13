create table public.companies (
  id uuid not null default gen_random_uuid (),
  name character varying(255) not null,
  owner_id uuid not null,
  created_at timestamp without time zone not null default (now() at time zone 'utc' :: text),
  updated_at timestamp without time zone not null default now(),
  constraint companies_pkey primary key (id),
  constraint companies_id_key unique (id),
  constraint companies_owner_id_fkey foreign key (owner_id) references auth.users (id) on delete cascade
) tablespace pg_default;

create unique index companies_id_unique on public.companies using btree (id) tablespace pg_default;