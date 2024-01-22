create schema if not exists private;

insert into storage.buckets (id, name, public)
values ('orgs', 'orgs', TRUE)
on conflict do nothing;


create policy "Only org member can read from org bucket"
on storage.objects
as permissive
for select
to public
using (
  (
    (bucket_id = 'orgs'::text)
    AND (storage.foldername(name))[2]::text = 'public'::text
    OR EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only org member can upload to org bucket"
on storage.objects
as permissive
for insert
to public
with check (
  (
    (bucket_id = 'orgs'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only org member can delete from org bucket"
on storage.objects
as permissive
for delete
to public
using (
  (
    (bucket_id = 'orgs'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only org member can update to org bucket"
on storage.objects
as permissive
for update
to public
using (
  (
    (bucket_id = 'orgs'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);



