import { Database } from "@zix/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient<Database>();
