create type company_roles as ENUM (
  'owner',
  'manager',
  'driver',
  'member'
);

create table
  public.companies (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    owner_id uuid null default auth.uid (),
    name text not null,
    logo media_file null,
    constraint companies_pkey primary key (id),
    constraint companies_owner_id_fkey foreign key (owner_id) references users (id) on delete set null
  ) tablespace pg_default;

create table
  public.company_memberships (
    id uuid not null default gen_random_uuid (),
    user_id uuid null,
    company_id uuid not null,
    role public.company_roles not null default 'member'::company_roles,
    invited_email text null,
    code text null,
    created_at timestamp with time zone not null default now(),
    constraint company_memberships_user_id_company_id_key unique (user_id, company_id),
    constraint company_memberships_user_id_fkey foreign key (user_id) references users (id) on delete cascade,
    constraint company_memberships_company_id_fkey foreign key (company_id) references companies (id) on delete cascade,
    unique (user_id, company_id)
  ) tablespace pg_default;


/**
  * Create new company function
  */
create or replace function create_new_company ( -- create_new_companyanization
  company_name text
)
returns public.companies as $$
declare
  company public.companies;
begin
  insert into public.companies (name)
    values (company_name)
  returning * into company;

  insert into public.company_memberships (user_id, company_id, role)
    values (auth.uid(), company.id, 'owner');
  return company;
end;
$$ language plpgsql security definer set search_path = public;

/**
  * Invite new company member
  * this function will accept name, email, phone number, company_id
  * first need to check if auth have role manager or owner in company
  * next we need to check if user already exist in users table base on email or phone number
  * if user exist, we need to check if user already have membership in company
  * if user already have membership in company, we need to check if user already have role manager or owner in company
  * if user already have role manager or owner in company, we need to return error
  * if user already have membership in company, we need to update role to manager or owner
  * if user doesn't have membership in company, we need to create new membership with role manager or owner
  * next we need to create supabase auth invite
  * next we need to send email to user
  * next we need to return membership
  */
create or replace function invite_company_member ( -- invite_new_companyanization_member
  company_id uuid,
  name text default null,
  email text default null,
  phone_number text default null,
  role company_roles default 'member'
)
returns public.company_memberships as $$
declare
  company public.companies;
  auth_company_membership public.company_memberships;
  membership public.company_memberships;
  user auth.users;
  user_membership public.company_memberships;
  user_role company_roles;
  user_email text;
  user_phone_number text;
  user_id uuid;
begin
  if email is null and phone_number is null then
    raise exception 'Either email or phone number must be provided';
  end if;

  select * from public.companies where id = company_id into company;
  select * from public.company_memberships where user_id = auth.uid() and company_id = company.id into auth_company_membership;

  if auth_company_membership is null then
    raise exception 'You are not allowed to invite new member';
  end if;

  if auth_company_membership.role != 'owner' and auth_company_membership.role != 'manager' then
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
  -- select * from public.company_memberships where user_id = user.id and company_id = company.id into user_membership;

  -- if user_membership is null then
  --   insert into public.company_memberships (user_id, company_id, role)
  --     values (user.id, company.id, role)
  --   returning * into membership;
  -- else
  --   update public.company_memberships set role = role where id = user_membership.id returning * into membership;
  -- end if;

  return membership;
end;
$$ language plpgsql security definer set search_path = public;
