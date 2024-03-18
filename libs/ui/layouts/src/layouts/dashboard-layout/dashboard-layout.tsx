import React from 'react';
import { View, XStack } from 'tamagui';
import SideBar from '../../components/side-bar/side-bar';

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <XStack flex={1}>
      <SideBar />

      <View flex={1} backgroundColor="$gray2">
        {children}
      </View>
    </XStack>
  );
};

export default DashboardLayout;
