-- INSERT INTO
-- 	"storage"."buckets" (
-- 		"id",
-- 		"name",
-- 		"owner",
-- 		"created_at",
-- 		"updated_at",
-- 		"public",
-- 		"avif_autodetection",
-- 		"file_size_limit",
-- 		"allowed_mime_types"
-- 	)
-- VALUES
-- 	(
-- 		'avatars',
-- 		'avatars',
-- 		NULL,
-- 		NOW(),
-- 		NOW(),
-- 		true,
-- 		false,
-- 		NULL,
-- 		NULL
-- 	);

-- select vault.create_secret(
--   'http://api.supabase.internal:8000',
--   'supabase_url'
-- );

/**
 * If you are developing directly on the cloud, open up the SQL Editor and set this to your Supabase project's API URL:
 https://supabase.com/dashboard/project/_/sql/new
 *
select vault.create_secret(
  'https://rqbqtxitbletwahyxcbc.supabase.co',
  'supabase_url'
);
 *
 */



DO $$
DECLARE
    admin_id uuid;
    user_id uuid;
    customer_id uuid;
    solo_driver_id uuid;
    company_owner_id uuid;
    company_manager_id uuid;
    company_driver_id uuid;
BEGIN
    -- TODO Create Super User
    admin_id := private.create_seed_user('966554943343', 'admin@sawaeed.com', '123456789', 'سعيد القحطاني', 'https://i.pravatar.cc/150?u=admin@sawaeed.com');
    user_id := private.create_seed_user('21622074426', 'badi.ifaoui@zixdev.com', '123456789', 'Badi Ifaoui', 'https://i.pravatar.cc/150?u=badi.ifaoui@zixdev.com');
    customer_id := private.create_seed_user('966111111111', 'customer@sawaeed.com', '123456789', 'Fake Customer', 'https://i.pravatar.cc/150?u=customer@sawaeed.com');
    solo_driver_id := private.create_seed_user('966222222222', 'solo.driver@sawaeed.com', '123456789', 'Fake Solo Driver', 'https://i.pravatar.cc/150?u=solo.driver@sawaeed.com');
    company_owner_id := private.create_seed_user('966333333333', 'company.admin@sawaeed.com', '123456789', 'Fake Company Owner', 'https://i.pravatar.cc/150?u=company.admin@sawaeed.com');
    company_manager_id := private.create_seed_user('966444444444', 'company.manager@sawaeed.com', '123456789', 'Fake Company Manager', 'https://i.pravatar.cc/150?u=company.manager@sawaeed.com');
    company_driver_id := private.create_seed_user('966555555555', 'company.driver@sawaeed.com', '123456789', 'Fake Company Driver', 'https://i.pravatar.cc/150?u=company.driver@sawaeed.com');


    INSERT INTO chat.channels (id, name, creator_id, is_public)
    VALUES
      ('78e2e0e1-02af-4a5b-b794-1e3aba89dec6', 'Public Sawaeed Group', customer_id, true),
      ('d77326f1-bc08-47df-a006-8089f1dfee73', 'ABC Shipment Request Support', user_id, false),
      ('4c59448d-9bde-4869-bb27-26d88f6bdaf7', 'Driver Shipping', solo_driver_id, false);

    INSERT INTO  chat.channel_members (role, user_id, added_by_user_id ,channel_id)
    VALUES
      -- ABC Shipment Request Support
      ('admin', company_owner_id, company_owner_id, 'd77326f1-bc08-47df-a006-8089f1dfee73'),
      ('admin', company_manager_id, company_owner_id, 'd77326f1-bc08-47df-a006-8089f1dfee73'),
      ('user', company_driver_id, company_owner_id, 'd77326f1-bc08-47df-a006-8089f1dfee73'),
      ('user', customer_id, company_owner_id, 'd77326f1-bc08-47df-a006-8089f1dfee73'),
      -- Public Sawaeed Group
      ('user', admin_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', user_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', customer_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', solo_driver_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', company_owner_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', company_manager_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      ('user', company_driver_id, null, '78e2e0e1-02af-4a5b-b794-1e3aba89dec6'),
      -- Driver Shipping
      ('admin', solo_driver_id, null, '4c59448d-9bde-4869-bb27-26d88f6bdaf7'),
      ('user', customer_id, null, '4c59448d-9bde-4869-bb27-26d88f6bdaf7');

END $$;
