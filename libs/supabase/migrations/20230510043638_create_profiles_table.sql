create table public.users (
  id uuid not null references auth.users on delete cascade,
  -- Your profile fields go here...
  avatar_url text,
  name text,
  about text,

  primary key (id)
);

alter table public.users enable row level security;

create policy "Public users are viewable by everyone."
  on users for select
  using ( true );

-- the policy above could be replaced by this if users are private:

-- create policy "Profiles are viewable by users who created them."
-- on users for select
-- using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on users for update
  using ( auth.uid() = id );


-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
