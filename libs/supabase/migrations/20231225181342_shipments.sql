/** 
 * Shipment System Tables
 */
create table public.shipment_types (
  "id" uuid not null,
  "name" character varying(255),
  "identifier" character varying(255),
  "is_multiple" boolean not null default false,
  "created_at" timestamp(0) without time zone,
  "updated_at" timestamp(0) without time zone
);

CREATE UNIQUE INDEX shipment_types_id_unique ON public.shipment_types USING btree (id);