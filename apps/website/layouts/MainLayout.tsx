import { LayoutContainer } from '@zix/ui/layouts';
import React from 'react';
import { YStack } from 'tamagui';
import { Footer } from '../components/web-home/footer/Footer';
import { Header } from '../components/web-home/header/Header';
import { MobileHeader } from '../components/web-home/menu-header/MobileHeader';
import { TopHeader } from '../components/web-home/top-header/TopHeader';

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <>
        <YStack>
          <TopHeader />
          <Header />
          <MobileHeader />
        </YStack>
        {children}
        <Footer />
      </>
    </LayoutContainer>
  );
};

export default MainLayout;
