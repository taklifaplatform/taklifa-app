import { useQuery } from "@tanstack/react-query";
import { CompanyAdminService, CompanyTransformer } from "@zix/api";
import { useState } from "react";

export type CompanyManager = {
  switchCompany: (id: string) => void;

  activeCompany?: CompanyTransformer;
  refreshActiveCompany: () => void;
};

export function useCompanyManager(): CompanyManager {
  const [activeCompanyId, setActiveCompanyId] = useState<string>();

  const activeCompanyQuery = useQuery({
    queryFn: () =>
      activeCompanyId
        ? CompanyAdminService.retrieve({
          company: activeCompanyId,
        })
        : null,
    queryKey: ["CompanyAdminService.list", activeCompanyId],
  });

  function switchCompany(id: string) {
    setActiveCompanyId(id);
    activeCompanyQuery.refetch();
  }
  return {
    activeCompany: activeCompanyQuery?.data?.data,
    refreshActiveCompany: activeCompanyQuery.refetch,
    switchCompany,
  };
}
