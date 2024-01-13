create table public.company_managers (
  "company_id" uuid not null,
  "user_id" uuid not null
);

create table public.company_manager_invitations (
  "id" uuid not null,
  "name" character varying(255) not null,
  "phone_number" character varying(255) not null,
  "email" character varying(255),
  "company_id" uuid not null,
  "sender_id" uuid,
  "invitation_code" character varying(255) not null,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE UNIQUE INDEX company_manager_invitations_id_unique ON public.company_manager_invitations USING btree (id);

CREATE UNIQUE INDEX company_manager_invitations_phone_number_unique ON public.company_manager_invitations USING btree (phone_number);