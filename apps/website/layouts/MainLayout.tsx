import React, { useState } from 'react';
import { Sheet, Stack, View, YStack } from 'tamagui';
import { TopHeader } from '../components/TopHeader';
import { Header } from '../components/Header';
import { MobileHeader } from '../components/MobileHeader';
import { Footer } from '../components/Footer';
import { MobileFooter } from '../components/MobileFooter';
import { MobileDrawer } from '../components/MobileDrawer';

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Stack
      justifyContent="center"
      flexDirection="row"
      paddingVertical="$4"
      $sm={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '$0'
      }}
    >
      <YStack
        flex={1}
        maxWidth={'1296px'}
        width={'100%'}
        // padding="$4"
        paddingHorizontal="$4"
        justifyContent="space-between"
      >
        <YStack>
          <TopHeader />
          <Header />
          <MobileHeader />
        </YStack>
        {children}
        <Footer />
      </YStack>
    </Stack>
  );
};

export default MainLayout;
