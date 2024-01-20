import { useQuery } from "@tanstack/react-query";
import { useUser } from "@zix/core/auth";
import { ORG_MEMBERSHIPS_TABLE, Tables, useSupabase } from "@zix/core/supabase";
import { createParam } from "solito";

const { useParam } = createParam<{ company: string }>();

/**
 * @returns
 */
export function useCurrentActiveOrg() {
  const supabase = useSupabase();
  const { profile } = useUser();
  const [orgId] = useParam("company");

  const { data, isLoading } = useQuery([
    ORG_MEMBERSHIPS_TABLE,
    orgId,
    profile?.id,
  ], {
    queryFn: async () => {
      if (!profile?.id || !orgId) {
        return null;
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
        .eq("user_id", profile?.id)
        .eq("org_id", orgId)
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  return {
    isLoading,
    org: data?.org,
    role: data?.role,
  };
}
