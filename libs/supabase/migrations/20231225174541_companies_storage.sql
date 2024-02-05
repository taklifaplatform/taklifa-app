create schema if not exists private;

insert into storage.buckets (id, name, public)
values ('companies', 'companies', TRUE)
on conflict do nothing;


create policy "Only company member can read from company bucket"
on storage.objects
as permissive
for select
to public
using (
  (
    (bucket_id = 'companies'::text)
    AND (storage.foldername(name))[2]::text = 'public'::text
    OR EXISTS (
      SELECT 1
      FROM public.company_memberships
      WHERE company_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only company member can upload to company bucket"
on storage.objects
as permissive
for insert
to public
with check (
  (
    (bucket_id = 'companies'::text)
    AND EXISTS (
      SELECT 1
      FROM public.company_memberships
      WHERE company_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only company member can delete from company bucket"
on storage.objects
as permissive
for delete
to public
using (
  (
    (bucket_id = 'companies'::text)
    AND EXISTS (
      SELECT 1
      FROM public.company_memberships
      WHERE company_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only company member can update to company bucket"
on storage.objects
as permissive
for update
to public
using (
  (
    (bucket_id = 'companies'::text)
    AND EXISTS (
      SELECT 1
      FROM public.company_memberships
      WHERE company_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);



