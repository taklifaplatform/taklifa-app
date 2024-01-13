create table public.rating_scores (
  "id" uuid not null,
  "rating_id" uuid,
  "rating_type_id" uuid,
  "score" double precision not null default '5' :: double precision,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.rating_types (
  "id" uuid not null,
  "name" character varying(255) not null,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.ratings (
  "id" uuid not null,
  "rateable_type" character varying(255) not null,
  "rateable_id" bigint not null,
  "score" double precision not null default '4.9' :: double precision,
  "user_id" uuid,
  "comment" text,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE UNIQUE INDEX rating_scores_id_unique ON public.rating_scores USING btree (id);

CREATE UNIQUE INDEX rating_types_id_unique ON public.rating_types USING btree (id);

CREATE UNIQUE INDEX ratings_id_unique ON public.ratings USING btree (id);

CREATE INDEX ratings_rateable_type_rateable_id_index ON public.ratings USING btree (rateable_type, rateable_id);