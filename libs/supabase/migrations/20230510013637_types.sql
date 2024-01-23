create schema if not exists private;

drop type if exists media_file;
create type media_file as (
  id uuid,
  uri text,
  file_name text,
  file_type text
);
