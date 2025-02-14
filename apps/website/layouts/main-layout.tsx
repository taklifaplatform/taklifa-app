import { ZixContainer } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixCookiesBanner, ZixWebFooter, ZixWebHeader } from '@zix/ui/widgets';
import React from 'react';
import { Button, View } from 'tamagui';

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
      <Button
        onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        position='fixed'
        bottom={'$5'}
        right={'$5'}
        zIndex={1}
        theme={'accent'}
        padding={'$2'}
        borderRadius={15}
        borderTopLeftRadius={0}
        style={{ transform: [{ rotate: '230deg' }] }}
      >
        <CustomIcon name='arrow_left' size={'$1'} color='black' />
      </Button>
    </View>
  );
};

export default MainLayout;
