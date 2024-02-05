import { useQuery } from "@tanstack/react-query";
import { useUser } from "@zix/core/auth";
import { COMPANY_MEMBERSHIPS_TABLE, Tables, useSupabase } from "@zix/core/supabase";
import { useState } from "react";

export type CompanyManager = {
  switchCompany: (id: string) => void;

  activeCompany?: Tables<"companies">;
  refreshActiveCompany: () => void;

  companies: Tables<"companies">[];
  refreshCompanies: () => void;
};

export function useCompanyManager(): CompanyManager {
  const { user } = useUser();
  const supabase = useSupabase();

  const [activeCompanyId, setActiveCompanyId] = useState<string>();

  const activeCompanyQuery = useQuery([
    COMPANY_MEMBERSHIPS_TABLE,
    activeCompanyId,
    user?.id,
  ], {
    queryFn: async () => {
      if (!user?.id || !activeCompanyId) {
        return null;
      }

      const { data, error } = await supabase
        .from(COMPANY_MEMBERSHIPS_TABLE)
        .select<
          string,
          {
            role: string;
            company: Tables<"companies">;
          }
        >(`role, company:company_id(*)`)
        .eq("user_id", user?.id)
        .eq("company_id", activeCompanyId)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });

  const companiesQuery = useQuery([COMPANY_MEMBERSHIPS_TABLE, user?.id, "v8"], {
    queryFn: async () => {
      if (!user?.id) {
        return null;
      }

      const { data, error } = await supabase
        .from(COMPANY_MEMBERSHIPS_TABLE)
        .select<
          string,
          {
            role: string;
            company: Tables<"companies">;
          }
        >(`role, company:company_id(*)`)
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
    activeCompany: activeCompanyQuery?.data?.company,
    refreshActiveCompany: activeCompanyQuery.refetch,
    switchCompany,

    companies: companiesQuery?.data?.map((item) => item.company) || [],
    refreshCompanies: companiesQuery.refetch,
  };
}
