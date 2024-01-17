/**
 * System Level Vehicle Details
 */
create table public.vehicle_icons (
  "id" uuid not null,
  "name" character varying(255),
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_makes (
  "id" uuid not null,
  "name" character varying(255),
  "description" text,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_models (
  "id" uuid not null,
  "name" character varying(255),
  "vehicle_make_id" uuid not null,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

/**
 * Vehicle Information
 */
create table "public"."vehicles" (
  "id" uuid not null,
  "ownable_type" character varying(255) not null,
  "ownable_id" bigint not null,
  "vehicle_model_id" uuid,
  "vehicle_make_id" uuid,
  "vehicle_icon_id" uuid,
  "internal_id" character varying(255),
  "color" character varying(255),
  "plate_number" character varying(255),
  "VIN_number" character varying(255),
  "year" integer,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_information (
  "id" uuid not null,
  "vehicle_id" uuid not null,
  "body_type" character varying(255),
  "steering_wheel" character varying(255),
  "top_speed" integer,
  "doors_count" integer,
  "seats_count" integer,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_capacity_dimensions (
  "id" uuid not null,
  "vehicle_id" uuid not null,
  "length" character varying(255),
  "width" character varying(255),
  "height" character varying(255),
  "unit" character varying(255) not null default 'm' :: character varying,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_capacity_weights (
  "id" uuid not null,
  "vehicle_id" uuid not null,
  "value" character varying(255),
  "unit" character varying(255) not null default 'kg' :: character varying,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

create table public.vehicle_fuel_information (
  "id" uuid not null,
  "vehicle_id" uuid not null,
  "fuel_type" character varying(255),
  "fuel_capacity" double precision,
  "liter_per_km_in_city" double precision,
  "liter_per_km_in_highway" double precision,
  "liter_per_km_mixed" double precision,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE UNIQUE INDEX vehicle_capacity_dimensions_id_unique ON public.vehicle_capacity_dimensions USING btree (id);

CREATE UNIQUE INDEX vehicle_capacity_weights_id_unique ON public.vehicle_capacity_weights USING btree (id);

CREATE UNIQUE INDEX vehicle_fuel_information_id_unique ON public.vehicle_fuel_information USING btree (id);

CREATE UNIQUE INDEX vehicle_icons_id_unique ON public.vehicle_icons USING btree (id);

CREATE UNIQUE INDEX vehicle_information_id_unique ON public.vehicle_information USING btree (id);

CREATE UNIQUE INDEX vehicle_makes_id_unique ON public.vehicle_makes USING btree (id);

CREATE UNIQUE INDEX vehicle_models_id_unique ON public.vehicle_models USING btree (id);

CREATE UNIQUE INDEX vehicles_id_unique ON public.vehicles USING btree (id);

CREATE INDEX vehicles_ownable_type_ownable_id_index ON public.vehicles USING btree (ownable_type, ownable_id);