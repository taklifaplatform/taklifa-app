import { supabase } from "./client.native";

// TODO: this might be remove also the client.native.ts
export const useSupabase = () => {
  return supabase;
};
