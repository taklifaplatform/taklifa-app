
import React from 'react';
import DashboardLayout from '../dashboard-layout/dashboard-layout';


export type CompanyDashboardLayoutProps = {
  children: React.ReactNode;
}


export const CompanyDashboardLayout: React.FC<CompanyDashboardLayoutProps> = ({
  children
}) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}


export default CompanyDashboardLayout;
