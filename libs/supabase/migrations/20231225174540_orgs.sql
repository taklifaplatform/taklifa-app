create type org_roles as ENUM (
  'owner',
  'manager',
  'driver',
  'member'
);

create table
  public.orgs (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    owner_id uuid null default auth.uid (),
    name text not null,
    logo_url text null,
    constraint orgs_pkey primary key (id),
    constraint orgs_owner_id_fkey foreign key (owner_id) references users (id) on delete set null
  ) tablespace pg_default;

create table
  public.org_memberships (
  id uuid not null default gen_random_uuid (),
  user_id uuid references public.users,
  org_id uuid not null references public.orgs,
  role org_roles not null default 'member',
  invited_email text,
  code text,
  created_at timestamptz not null default now(),
  unique (user_id, org_id)
);


-- Enable RLS for Orgs, Org Memberships
alter table public.orgs enable row level security;
alter table public.org_memberships enable row level security;

/**
  * Create new org function
  */
create or replace function create_new_org ( -- create_new_organization
  org_name text
)
returns public.orgs as $$
declare
  org public.orgs;
begin
  insert into public.orgs (name)
    values (org_name)
  returning * into org;

  insert into public.org_memberships (user_id, org_id, role)
    values (auth.uid(), org.id, 'owner');
  return org;
end;
$$ language plpgsql security definer set search_path = public;
