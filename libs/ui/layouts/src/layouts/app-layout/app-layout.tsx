import React from 'react';
import { ScrollView, View, XStack } from 'tamagui';
import { MainSideBar } from '../../components/main-side-bar/main-side-bar';
import AppBottomBar from '../../components/app-bottom-bar/app-bottom-bar';

export type AppLayoutProps = {
  children: React.ReactNode;
}


export const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  return (
    <XStack flex={1}>
      <MainSideBar
        display='none'
        $gtMd={{ display: 'block' }}
      />

      <View flex={1} backgroundColor="$color2" height='100vh'>
        {children}
        <AppBottomBar $gtMd={{ display: 'none' }} />
      </View>
    </XStack>
  );
}


export default AppLayout;
