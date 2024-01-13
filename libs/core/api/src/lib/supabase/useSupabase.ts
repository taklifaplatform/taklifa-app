import { Database } from '@zix/supabase'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useSupabase = () => {
  return useSupabaseClient<Database>()
}
