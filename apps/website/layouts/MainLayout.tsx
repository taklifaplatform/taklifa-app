import { ZixContainer } from '@zix/ui/common';
import { ZixCookiesBanner, ZixWebFooter, ZixWebHeader } from '@zix/ui/widgets';
import React from 'react';



export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <ZixWebHeader />

      <ZixContainer>
        {children}
        <ZixCookiesBanner />
      </ZixContainer>

      <ZixWebFooter />
    </>

  );
};

export default MainLayout;
