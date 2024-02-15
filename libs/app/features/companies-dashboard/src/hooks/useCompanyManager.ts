import { api } from "@zix/api";
import { Tables } from "@zix/core/supabase";
import { useState } from "react";

export type CompanyManager = {
  switchCompany: (id: string) => void;

  activeCompany?: Tables<"companies">;
  refreshActiveCompany: () => void;
};

export function useCompanyManager(): CompanyManager {
  const [activeCompanyId, setActiveCompanyId] = useState<string>();

  const activeCompanyQuery = api.manageCompany.get.useQuery({
    id: activeCompanyId,
  });

  function switchCompany(id: string) {
    setActiveCompanyId(id);
    activeCompanyQuery.refetch();
  }
  return {
    activeCompany: activeCompanyQuery?.data?.data?.company,
    refreshActiveCompany: activeCompanyQuery.refetch,
    switchCompany,
  };
}
