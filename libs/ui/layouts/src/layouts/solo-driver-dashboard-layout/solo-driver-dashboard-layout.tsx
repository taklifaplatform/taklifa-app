
import React from 'react';
import DashboardLayout from '../dashboard-layout/dashboard-layout';


export type SoloDriverDashboardLayoutProps = {
  children: React.ReactNode;
}


export const SoloDriverDashboardLayout: React.FC<SoloDriverDashboardLayoutProps> = ({
  children
}) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}


export default SoloDriverDashboardLayout;
