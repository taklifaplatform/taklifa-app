import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types";

const SUPABASE_URL = "http://localhost:54321";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

/**
 * only meant to be used on the server side.
 */
export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY,
);
