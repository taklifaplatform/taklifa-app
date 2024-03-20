
import React from 'react';
import {  View } from 'tamagui';
import { TopHeader } from './top-header/TopHeader';
import { Header } from './header/Header';
import { MobileHeader } from './menu-header/MobileHeader';
import { ZixContainer } from '@zix/ui/common';

/* eslint-disable-next-line */
export interface ZixWebHeaderProps {
}

export function ZixWebHeader(props: ZixWebHeaderProps) {
  return (
    <>
      <View
        position='fixed'
        zIndex={100}
        alignSelf='center'
        top={10}
        left={0}
        right={0}
      >
        <ZixContainer
        >
          <View borderRadius='$4' overflow='hidden' >
            <TopHeader />
            <Header />
            <MobileHeader />
          </View>
        </ZixContainer>
      </View >
      <View
        minHeight={200}
        $sm={{ minHeight: 130 }}
      />
    </>
  );
}


export default ZixWebHeader;
