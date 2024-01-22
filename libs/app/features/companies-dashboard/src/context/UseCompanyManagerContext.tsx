import React, { useContext } from 'react';

import { CompanyManager, useCompanyManager } from '../hooks/useCompanyManager';

export type CompanyManagerContextValue = CompanyManager;

export const CompanyManagerContext = React.createContext(
  {} as CompanyManagerContextValue
);

export const CompanyManagerProvider = (
  props: React.PropsWithChildren<{ value?: CompanyManagerContextValue }>
) => {
  const { children, value } = props;
  const companyManager = useCompanyManager();

  const userSearchContext = { ...companyManager, ...value };
  return (
    <CompanyManagerContext.Provider
      value={userSearchContext as CompanyManagerContextValue}
    >
      {children}
    </CompanyManagerContext.Provider>
  );
};

export const useCompanyManagerContext = () =>
  useContext(CompanyManagerContext) as unknown as CompanyManagerContextValue;
