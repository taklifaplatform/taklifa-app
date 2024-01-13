create schema if not exists private;

/**
  * This function is called when a new document is created.
  * It sends a request to the process function.
  */
create function supabase_url()
returns text
language plpgsql
security definer
as $$
declare
  secret_value text;
begin
  select decrypted_secret into secret_value from vault.decrypted_secrets where name = 'supabase_url';
  return secret_value;
end;
$$;

--- Helper function to create a user
CREATE OR REPLACE FUNCTION private.create_seed_user(
    phone text,
    email text,
    password text,
    profile_name text,
    profile_avatar_url text
) RETURNS uuid AS $$
  declare
  user_id uuid;
  encrypted_pw text;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, phone, encrypted_password, phone_confirmed_at, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, phone, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '{"provider":"phone","providers":["email", "phone"]}', '{}', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '')
    on conflict do nothing;
  
  UPDATE profiles SET name = profile_name, avatar_url = profile_avatar_url WHERE id = user_id;
  -- INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  -- VALUES
  --   (gen_random_uuid(), user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');

  RETURN user_id;
END;
$$ LANGUAGE plpgsql;