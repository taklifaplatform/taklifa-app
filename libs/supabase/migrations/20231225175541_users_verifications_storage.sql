insert into storage.buckets (id, name, public)
values ('users_verification', 'users_verification', false)
on conflict do nothing;

create policy "Give users access to own folder 1oj01fb_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'users_verification'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1oj01fb_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'users_verification'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1oj01fb_2"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'users_verification'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1oj01fb_3"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'users_verification'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



