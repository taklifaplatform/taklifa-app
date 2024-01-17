create table public.service_zones (
  "id" uuid not null,
  "ownable_type" character varying(255) not null,
  "ownable_id" bigint not null,
  "name" character varying(255) not null,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.service_areas (
  "id" uuid not null,
  "service_zone_id" uuid not null,
  "name" character varying(255) not null,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE UNIQUE INDEX service_areas_id_unique ON public.service_areas USING btree (id);

CREATE UNIQUE INDEX service_zones_id_unique ON public.service_zones USING btree (id);

CREATE INDEX service_zones_ownable_type_ownable_id_index ON public.service_zones USING btree (ownable_type, ownable_id);