import { ZixContainer } from '@zix/ui/common';
import { ZixCookiesBanner, ZixWebFooter, ZixWebHeader } from '@zix/ui/widgets';
import React from 'react';
import { View } from 'tamagui';



export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <View flex={1} backgroundColor='$color1'>
      <ZixWebHeader />

      <ZixContainer>
        {children}
        <ZixCookiesBanner />
      </ZixContainer>

      <ZixWebFooter />
    </View>

  );
};

export default MainLayout;
