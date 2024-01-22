insert into storage.buckets (id, name, public)
values ('orgs', 'orgs', false)
on conflict do nothing;

create schema if not exists private;

create policy "Only allow users to read storage from org buckets they're member on or the public files"
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


create policy "Only allow users to write storage from org buckets they're member on"
on storage.objects
as permissive
for insert
to public
with check (
  (
    (bucket_id = 'chat'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only allow users to delete storage from org buckets they're member on"
on storage.objects
as permissive
for delete
to public
using (
  (
    (bucket_id = 'chat'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only allow users to update storage from org buckets they're member on"
on storage.objects
as permissive
for update
to public
using (
  (
    (bucket_id = 'chat'::text)
    AND EXISTS (
      SELECT 1
      FROM public.org_memberships
      WHERE org_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);



