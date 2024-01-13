create schema if not exists private;

insert into storage.buckets (id, name, public)
values ('chat', 'chat', TRUE) on conflict do nothing;

create policy "Only allow users to read storage from chat buckets they're member on"
on storage.objects
as permissive
for select
to public
using (
  (
    (bucket_id = 'chat'::text)
    AND EXISTS (
      SELECT 1
      FROM chat.channel_members
      WHERE channel_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )
  )
);


create policy "Only allow users to write storage from chat buckets they're member on, and only to their own folder"
on storage.objects
as permissive
for insert
to public
with check (
  (
    (bucket_id = 'chat'::text)
    AND (storage.foldername(name))[2]::uuid = auth.uid()::uuid
    AND EXISTS (
      SELECT 1
      FROM chat.channel_members
      WHERE channel_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid      
    )
  )
);


create policy "Only allow users to delete storage from chat buckets they're member on, and only to their own folder"
on storage.objects
as permissive
for delete
to public
using (
  (
    (bucket_id = 'chat'::text)
    AND (storage.foldername(name))[2]::uuid = auth.uid()::uuid
    AND EXISTS (
      SELECT 1
      FROM chat.channel_members
      WHERE channel_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid      
    )    
  )
);


create policy "Only allow users to update storage from chat buckets they're member on, and only to their own folder"
on storage.objects
as permissive
for update
to public
using (
  (
    (bucket_id = 'chat'::text)
    AND (storage.foldername(name))[2]::uuid = auth.uid()::uuid
    AND EXISTS (
      SELECT 1
      FROM chat.channel_members
      WHERE channel_id = (storage.foldername(name))[1]::uuid
      AND user_id = auth.uid()::uuid
    )    
  )
);



