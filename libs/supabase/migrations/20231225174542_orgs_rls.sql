

-- Enable RLS for Orgs, Org Memberships
alter table public.orgs enable row level security;
alter table public.org_memberships enable row level security;

CREATE POLICY "Only auth user can read org"
  ON public.orgs for select
  USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Only the org owner can update org"
  ON public.orgs for update
  USING (
    auth.uid() = (select user_id from public.org_memberships where org_id = id and role = 'owner')
  );

CREATE POLICY "Only the org owner can delete org"
  ON public.orgs for delete
  USING (
    auth.uid() = (select user_id from public.org_memberships where org_id = id and role = 'owner')
  );

CREATE POLICY "Users can view all org members of org they're a member of"
  ON public.org_memberships FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );
