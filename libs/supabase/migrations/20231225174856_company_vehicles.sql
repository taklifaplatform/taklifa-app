create table public.company_vehicle_drivers (
  "driver_id" uuid not null,
  "vehicle_id" uuid not null
);

create table public.company_vehicle_service_areas (
  "vehicle_id" uuid not null,
  "service_area_id" uuid not null
);

create table public.company_vehicle_service_zones (
  "vehicle_id" uuid not null,
  "service_zone_id" uuid not null
);