create schema if not exists chat;

GRANT USAGE ON SCHEMA chat TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA chat TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA chat TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA chat TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA chat GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA chat GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA chat GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

----------------------------------------
-- a copy of the profiles table in chat schema
create table chat.users (
  id uuid not null references auth.users on delete cascade,
  -- Your profile fields go here...
  image text,
  name text,
  banned boolean not null default false,
  online boolean not null default true,
  role text not null default 'user'::text,

  last_active timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  primary key (id)
);

alter table chat.users enable row level security;

create policy "Chat users are viewable by everyone."
  on chat.users for select
  using ( true );

-- the policy above could be replaced by this if profiles are private:

-- create policy "Profiles are viewable by users who created them."
-- on users for select
-- using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on chat.users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on chat.users for update
  using ( auth.uid() = id );



-- inserts or updates a row in chat.users
create function chat.handle_user_profile_changes()
returns trigger
language plpgsql
security definer set search_path = chat
as $$
begin
  if (TG_OP = 'INSERT') then
    insert into chat.users (id, name, image)
    values (new.id, new.name, new.avatar_url);
  elsif (TG_OP = 'UPDATE') then
    update chat.users
    set name = new.name,
        image = new.avatar_url
    where id = new.id;
  end if;

  return new;
end;
$$;

-- trigger the function every time a user profile is created or updated
create trigger on_user_profile_changes
  after insert or update on public.profiles
  for each row execute procedure chat.handle_user_profile_changes();


----------------------------------------
create table
  chat.channels (
    id uuid not null default gen_random_uuid (),
    is_public boolean not null default false,
    created_at timestamp with time zone not null default now(),
    name text null,
    updated_at timestamp without time zone not null default now(),
    type text not null default 'messaging'::text,
    last_message_at timestamp without time zone null,
    creator_id uuid not null default auth.uid (),
    frozen boolean not null default false,
    disabled boolean not null default false,
    hidden boolean not null default false,
    members_count numeric not null default '1'::numeric,
    constraint channels_pkey primary key (id),
    constraint channels_creator_id_fkey foreign key (creator_id) references chat.users (id) on delete cascade
  ) tablespace pg_default;

create table
  chat.channel_members (
    id uuid not null default gen_random_uuid (),
    role text not null default 'member'::text,
    channel_id uuid not null,
    user_id uuid not null,
    added_by_user_id uuid null default auth.uid (),
    created_at timestamp with time zone not null default now(),
    channel_role text not null default 'channel_member'::text,
    status text not null default 'member'::text,
    shadow_banned boolean not null default false,
    notifications_muted boolean not null default false,
    banned boolean not null default false,
    constraint channel_members_channel_id_fkey foreign key (channel_id) references chat.channels (id) on delete cascade,
    constraint channel_members_user_id_fkey foreign key (user_id) references chat.users (id) on delete cascade,
    constraint channel_members_added_by_user_id_fkey foreign key (added_by_user_id) references chat.users (id) on delete set null
  ) tablespace pg_default;

create table
  chat.channel_invitations (
    id uuid not null default gen_random_uuid (),
    type text not null default 'user'::text,

    channel_id uuid not null,
    user_id uuid not null,

    invited_by_user_id uuid null default auth.uid (),
    created_at timestamp with time zone not null default now(),
    constraint channel_invitations_channel_id_fkey foreign key (channel_id) references chat.channels (id) on delete cascade,
    constraint channel_invitations_user_id_fkey foreign key (user_id) references chat.users (id) on delete cascade,
    constraint channel_invitations_invited_by_user_id_fkey foreign key (invited_by_user_id) references chat.users (id) on delete set null
  ) tablespace pg_default;

-- Enable RLS for Channels & Channel Members & Channel Invitations
alter table chat.channels enable row level security;
-- alter table chat.channel_members enable row level security;

create policy "Users are able to create new channels"
  on chat.channels for insert
  with check ( auth.uid() = creator_id );

CREATE POLICY "User are able to view only the channels he's member on"
  ON chat.channels for select
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM chat.channel_members
      WHERE channel_id = chat.channels.id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view all channel members of channels they're a member of"
  ON chat.channel_members FOR SELECT
  USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM chat.channels
      WHERE id = channel_members.channel_id
      AND EXISTS (
        SELECT 1
        FROM chat.channel_members
        WHERE channel_id = chat.channels.id
        AND user_id = auth.uid()
      )
    )
  );

-- CREATE POLICY "Users can create channel invitations if they are channel members with admin role"
--   ON chat.channel_invitations FOR INSERT
--   WITH CHECK (
--     auth.uid() IS NOT NULL
--     AND EXISTS (
--       SELECT 1
--       FROM chat.channels
--       WHERE id = channel_members.channel_id
--       AND EXISTS (
--         SELECT 1
--         FROM chat.channel_members
--         WHERE channel_id = chat.channels.id
--         AND user_id = auth.uid()
--         AND role = 'admin' -- Assuming 'admin' is the role for admin users
--       )
--     )
--   );


create table
  chat.messages (
    id text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    text text not null,
    type text not null default 'regular'::text,
    user_id uuid not null default auth.uid (),
    channel_id uuid not null,
    attachments jsonb[] null,
    mentioned_users text[] null,
    quoted_message_id text null,
    show_in_channel boolean null,
    parent_id text null,
    constraint messages_pkey primary key (id),
    constraint messages_user_id_fkey foreign key (user_id) references chat.users (id) on delete cascade,
    constraint messages_channel_id_fkey foreign key (channel_id) references chat.channels (id) on delete cascade,
    constraint messages_quoted_message_id_fkey foreign key (quoted_message_id) references chat.messages (id) on delete cascade,
    constraint messages_parent_id_fkey foreign key (parent_id) references chat.messages (id) on delete cascade
  ) tablespace pg_default;


---------------------
create table
  chat.reactions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    message_id text not null,
    user_id uuid not null default auth.uid (),
    type text not null default 'haha'::text,
    score numeric not null default '1'::numeric,
    constraint reactions_pkey primary key (id),
    constraint reactions_message_id_fkey foreign key (message_id) references chat.messages (id) on delete cascade,
    constraint reactions_user_id_fkey foreign key (user_id) references chat.users (id) on delete cascade
  ) tablespace pg_default;




-- Functions


/**
  * Start chat between 2 users
  * if the channel already exists between the 2 users, it will return the existing channel
  * @param {string} user_id - The user to start the chat with
  * @returns {object} The newly created channel
 */
create or replace function chat.start_chat_with_user(
  member_id uuid
)
returns chat.channels as $$
declare
  channel chat.channels;
begin
  select * from chat.channels
  where type = 'messaging'
  and members_count = 2
  and exists (
    select 1 from chat.channel_members
    where channel_id = chat.channels.id
    and user_id = auth.uid()
  )
  and exists (
    select 1 from chat.channel_members
    where channel_id = chat.channels.id
    and user_id = member_id
  )
  into channel;

  if found then
    return channel;
  end if;

  insert into chat.channels (type, members_count)
  values ('messaging', 2)
  returning * into channel;

  insert into chat.channel_members (channel_id, user_id)
  values (channel.id, auth.uid());

  insert into chat.channel_members (channel_id, user_id)
  values (channel.id, member_id);

  return channel;
end;
$$ language plpgsql security definer set search_path = chat;



/**
  * Start Chat
  * will accept members array, optional channel_name, optional is_public
  * @param {string[]} members - The members of the channel
  * @param {string} channel_name - The name of the channel
  * @param {boolean} is_public - Whether the channel is public or private
  *
  */
create or replace function chat.start_chat(
  members uuid[],
  channel_name text default null,
  is_public boolean default false
)
returns chat.channels as $$
declare
  channel chat.channels;
  member uuid;
begin
  -- if members array is empty, throw error
  if array_length(members, 1) = 0 then
    raise exception 'Members array cannot be empty';
  end if;

  -- if members array has only 1 member and no channel_name is given, start chat with that user
  if array_length(members, 1) = 1 and channel_name is null then
    return chat.start_chat_with_user(members[1]);
  end if;

  -- if members array is 2 and auth.uid() is one of the members, start chat with the other member
  if array_length(members, 1) = 2 and auth.uid() = any(members) then
    foreach member in array members loop
      if member != auth.uid() then
        return chat.start_chat_with_user(member);
      end if;
    end loop;
  end if;

  -- initialize the channel
  insert into chat.channels (type, members_count, is_public)
  values ('messaging', array_length(members, 1), is_public)
  returning * into channel;

  -- if channel_name is provided update it
  if channel_name is not null then
    update chat.channels
    set name = channel_name
    where id = channel.id;
  end if;

  -- create channel owner
  insert into chat.channel_members (channel_id, user_id, role)
  values (channel.id, auth.uid(), 'owner');

  -- add members to the channel
  foreach member in array members loop
    if member != auth.uid() then
      insert into chat.channel_members (channel_id, user_id)
      values (channel.id, member) on conflict do nothing;
    end if;
  end loop;

  return channel;
end;
$$ language plpgsql security definer set search_path = chat;
