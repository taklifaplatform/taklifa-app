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
  const [drawer, setDrawer] = useState(false);
  return (
    <Stack
      flex={1}
      justifyContent="center"
      flexDirection="row"
      $sm={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <YStack width="90%" padding="$4">
        <TopHeader />
        <Header />
        <MobileHeader drawer={drawer} setDrawer={setDrawer} />
        {children}
        <Footer />
        <MobileFooter />
      </YStack>
      <Sheet snapPoints={[90, 50]} open={drawer}>
        <Sheet.Overlay onPress={() => setDrawer(!drawer)} />
        <Sheet.Handle />
        <Sheet.Frame>
          <MobileDrawer />
        </Sheet.Frame>
      </Sheet>
    </Stack>
  );
};

export default MainLayout;
