
import React from 'react';
import DashboardLayout from '../dashboard-layout/dashboard-layout';


export type AccountDashboardLayoutProps = {
  children: React.ReactNode;
}


export const AccountDashboardLayout: React.FC<AccountDashboardLayoutProps> = ({
  children
}) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}


export default AccountDashboardLayout;
