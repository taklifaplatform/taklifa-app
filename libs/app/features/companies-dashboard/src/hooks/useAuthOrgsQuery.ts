import { useQuery } from "@tanstack/react-query";
import { useUser } from "@zix/core/auth";
import { ORG_MEMBERSHIPS_TABLE, Tables, useSupabase } from "@zix/core/supabase";

/**
 * @returns
 */
export function useAuthOrgsQuery() {
  const supabase = useSupabase();
  const { profile } = useUser();

  return useQuery([ORG_MEMBERSHIPS_TABLE, profile?.id], {
    queryFn: async () => {
      if (!profile?.id) {
        return;
      }

      const { data, error } = await supabase
        .from(ORG_MEMBERSHIPS_TABLE)
        .select<
          string,
          {
            role: string;
            org: Tables<"orgs">;
          }
        >(`role, org:org_id(*)`)
        .eq("user_id", profile?.id);
      if (error) {
        throw error;
      }
      return data;
    },
  });
}
