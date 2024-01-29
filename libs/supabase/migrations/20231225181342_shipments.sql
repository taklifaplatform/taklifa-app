drop type if exists shipment_types;
create type shipment_types as ENUM (
  'document',
  'box',
  'multiple_boxes',
  'other'
);

drop type if exists shipment_status;
create type shipment_status as ENUM (
  'draft',
  'assigned',
  'searching'
);

drop type if exists shipment_delivery_status;
create type shipment_delivery_status as ENUM (
  'pending',
  'cancelled',
  'delivering',
  'delivered'
);

/**
 * Shipment System Tables
 */
create table public.shipments (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null default auth.uid (),

  type shipment_types not null default 'document',
  status shipment_status not null default 'draft',
  delivery_status shipment_delivery_status null,

  created_at timestamp without time zone not null default now(),
  updated_at timestamp without time zone not null default now(),

  constraint channels_user_id_fkey foreign key (user_id) references public.users (id) on delete cascade
);
