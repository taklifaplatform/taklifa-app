import { ProvidersComposer, TamaguiProvider } from '@zix/core/providers';

import React from 'react';

export interface AdminAppProviderProps {
  children: React.ReactNode;
}

export const AdminAppProvider: React.FC<AdminAppProviderProps> = ({
  children
}) => {
  return (
    <ProvidersComposer providers={[TamaguiProvider]}>
      {children}
    </ProvidersComposer>
  );
};

export default AdminAppProvider;
