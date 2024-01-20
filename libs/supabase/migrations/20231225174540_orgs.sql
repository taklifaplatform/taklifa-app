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

/**
  * Invite new org member
  * this function will accept name, email, phone number, org_id
  * first need to check if auth have role manager or owner in org
  * next we need to check if user already exist in users table base on email or phone number
  * if user exist, we need to check if user already have membership in org
  * if user already have membership in org, we need to check if user already have role manager or owner in org
  * if user already have role manager or owner in org, we need to return error
  * if user already have membership in org, we need to update role to manager or owner
  * if user doesn't have membership in org, we need to create new membership with role manager or owner
  * next we need to create supabase auth invite
  * next we need to send email to user
  * next we need to return membership
  */
create or replace function invite_org_member ( -- invite_new_organization_member
  org_id uuid,
  name text default null,
  email text default null,
  phone_number text default null,
  role org_roles default 'member'
)
returns public.org_memberships as $$
declare
  org public.orgs;
  auth_org_membership public.org_memberships;
  membership public.org_memberships;
  user auth.users;
  user_membership public.org_memberships;
  user_role org_roles;
  user_email text;
  user_phone_number text;
  user_id uuid;
begin
  if email is null and phone_number is null then
    raise exception 'Either email or phone number must be provided';
  end if;

  select * from public.orgs where id = org_id into org;
  select * from public.org_memberships where user_id = auth.uid() and org_id = org.id into auth_org_membership;

  if auth_org_membership is null then
    raise exception 'You are not allowed to invite new member';
  end if;

  if auth_org_membership.role != 'owner' and auth_org_membership.role != 'manager' then
    raise exception 'You are not allowed to invite new member';
  end if;

  -- get user
  if user_email is not null then
    select * from auth.users where email = user_email into user;
  end if;

  if user is null and user_phone_number is not null then
    select * from auth.users where phone = user_phone_number into user;
  end if;

  if user is null then
    raise exception 'User not found';
  end if;

  -- get user membership
  -- select * from public.org_memberships where user_id = user.id and org_id = org.id into user_membership;

  -- if user_membership is null then
  --   insert into public.org_memberships (user_id, org_id, role)
  --     values (user.id, org.id, role)
  --   returning * into membership;
  -- else
  --   update public.org_memberships set role = role where id = user_membership.id returning * into membership;
  -- end if;

  return membership;
end;
$$ language plpgsql security definer set search_path = public;
