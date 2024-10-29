import { ZixContainer } from '@zix/ui/common';
import { ZixCookiesBanner, ZixWebFooter, ZixWebHeader } from '@zix/ui/widgets';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'tamagui';

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      setHeaderVisible(false);
    } else if (currentScrollY < lastScrollY.current) {
      // Scrolling up
      setHeaderVisible(true);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerStyle = {
    zIndex: 20,
    transition: 'transform 0.3s ease-in-out',
    transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
  };

  return (
    <View flex={1} backgroundColor='$color1'>
      <View
        position='fixed'
        zIndex={100}
        alignSelf='center'
        top={-10}
        left={0}
        right={0}
        style={headerStyle}>
        <ZixWebHeader />
      </View>
      <ZixContainer>
       {headerVisible && <View height={100}/>}
        {children}
        <ZixCookiesBanner />
      </ZixContainer>

      <ZixWebFooter />
    </View>
  );
};

export default MainLayout;
