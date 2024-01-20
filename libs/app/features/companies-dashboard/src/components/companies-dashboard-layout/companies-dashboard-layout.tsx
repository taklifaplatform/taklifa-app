import React from 'react';

import { View } from '@zix/app/ui/core';

export interface CompaniesDashboardLayoutProps {
  children: React.ReactNode;
}

export const CompaniesDashboardLayout: React.FC<
  CompaniesDashboardLayoutProps
> = ({ children }) => {
  return <View flex={1}>{children}</View>;
};

export default CompaniesDashboardLayout;
