import React from 'react';
import { Stack, YStack } from 'tamagui';
import { MobileHeader } from '../components/web-home/menu-header/MobileHeader';
import { TopHeader } from '../components/web-home/top-header/TopHeader';
import { Footer } from '../components/web-home/footer/Footer';
import { Header } from '../components/web-home/header/Header';

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
        paddingTop: '$0',
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
