create table public.locations (
  "id" uuid not null,
  "locationable_type" character varying(255) not null,
  "locationable_id" bigint not null,
  "phone_number" character varying(255),
  "name" character varying(255),
  "address" character varying(255),
  "address_complement" character varying(255),
  "postcode" character varying(255),
  "latitude" character varying(255),
  "longitude" character varying(255),
  "is_primary" boolean not null default false,
  "country_id" bigint,
  "state_id" bigint,
  "city_id" bigint,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE INDEX locations_city_id_index ON public.locations USING btree (city_id);

CREATE INDEX locations_country_id_index ON public.locations USING btree (country_id);

CREATE UNIQUE INDEX locations_id_unique ON public.locations USING btree (id);

CREATE INDEX locations_locationable_type_locationable_id_index ON public.locations USING btree (locationable_type, locationable_id);

CREATE INDEX locations_state_id_index ON public.locations USING btree (state_id);