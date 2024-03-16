
import React from 'react';
import DashboardLayout from '../dashboard-layout/dashboard-layout';


export type CustomerDashboardLayoutProps = {
  children: React.ReactNode;
}


export const CustomerDashboardLayout: React.FC<CustomerDashboardLayoutProps> = ({
  children
}) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}


export default CustomerDashboardLayout;
