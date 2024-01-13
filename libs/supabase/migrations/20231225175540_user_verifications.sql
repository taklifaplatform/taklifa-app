create table
  public.user_verifications (
    id uuid not null,
    name character varying(255) null,
    birth_date date null,
    driving_license_number character varying(255) null,
    nationality_id bigint null,
    created_at timestamp without time zone null default (now() at time zone 'utc'::text),
    updated_at timestamp without time zone null,
    constraint user_verifications_pkey primary key (id),
    constraint user_verifications_id_key unique (id),
    constraint user_verifications_nationality_id_fkey foreign key (nationality_id) references countries (id) on delete set null,
    constraint user_verifications_id_fkey foreign key (id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create unique index user_verifications_id_unique on public.user_verifications using btree (id) tablespace pg_default;