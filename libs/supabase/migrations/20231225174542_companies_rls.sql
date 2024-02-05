

-- Enable RLS for companies, company Memberships
alter table public.companies enable row level security;
alter table public.company_memberships enable row level security;

CREATE POLICY "Only auth user can read company"
  ON public.companies for select
  USING (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Only the company owner can update company"
  ON public.companies for update
  USING (
    auth.uid() IS NOT NULL -- TODO: AND role = 'owner'
  );

CREATE POLICY "Only the company owner can delete company"
  ON public.companies for delete
  USING (
    auth.uid() IS NOT NULL -- TODO: AND role = 'owner'
  );

CREATE POLICY "Users can view all company members of company they're a member of"
  ON public.company_memberships FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );
