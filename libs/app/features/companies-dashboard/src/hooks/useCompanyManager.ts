import { useQuery } from "@tanstack/react-query";
import { useUser } from "@zix/core/auth";
import { ORG_MEMBERSHIPS_TABLE, Tables, useSupabase } from "@zix/core/supabase";
import { useState } from "react";

export type CompanyManager = {
  activeCompany?: Tables<"orgs">;
  switchCompany: (id: string) => void;
  companies: Tables<"orgs">[];
};

export function useCompanyManager(): CompanyManager {
  const { user } = useUser();
  const supabase = useSupabase();

  const [activeCompanyId, setActiveCompanyId] = useState<string>();

  const activeCompanyQuery = useQuery([
    ORG_MEMBERSHIPS_TABLE,
    activeCompanyId,
    user?.id,
  ], {
    queryFn: async () => {
      if (!user?.id || !activeCompanyId) {
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
        .eq("user_id", user?.id)
        .eq("org_id", activeCompanyId)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });

  const companiesQuery = useQuery([ORG_MEMBERSHIPS_TABLE, user?.id, "v8"], {
    queryFn: async () => {
      if (!user?.id) {
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
        .eq("user_id", user?.id);
      if (error) {
        throw error;
      }
      return data;
    },
  });

  function switchCompany(id: string) {
    setActiveCompanyId(id);
    activeCompanyQuery.refetch();
  }
  return {
    activeCompany: activeCompanyQuery?.data?.org,
    switchCompany,

    companies: companiesQuery?.data?.map((item) => item.org) || [],
  };
}
