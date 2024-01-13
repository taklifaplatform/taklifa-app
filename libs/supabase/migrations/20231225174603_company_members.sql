create extension if not exists pg_net with schema extensions;

create table public.company_invitations (
  id uuid not null default gen_random_uuid (),
  user_name character varying(255) not null,
  user_phone character varying(255) not null,
  user_email character varying(255) null,
  company_id uuid not null,  
  sender_id uuid null,
  token character varying(255) not null,
  created_at timestamp without time zone not null default (now() at time zone 'utc' :: text),
  updated_at timestamp without time zone not null default now(),
  role text not null,
  constraint company_invitations_pkey primary key (id),
  constraint company_invitations_id_key unique (id),
  constraint company_invitations_company_id_fkey foreign key (company_id) references companies (id) on delete cascade
) tablespace pg_default;


CREATE OR REPLACE FUNCTION send_company_member_invitation_link()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  result int;
BEGIN
  -- Make HTTP POST request
  result := net.http_post(
    url := supabase_url() || '/functions/v1/company-invite-member',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', current_setting('request.headers', true)::json->>'authorization'::text
    ),
    body := jsonb_build_object(
      'record', NEW
    )
  );
  -- Ignore the result for now, you may want to handle it based on your use case
  RETURN NULL;
END;
$$;

create trigger on_company_member_invitation_inserted
after
insert
  on company_invitations for each row execute function send_company_member_invitation_link();
