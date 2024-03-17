
import React from 'react';

import { XStack, YStack } from 'tamagui';


export type LayoutContainerProps = {
  children: React.ReactNode
}


export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children
}) => {
  return (
    <XStack width={'100%'} alignItems='center' justifyContent='center'>
      <YStack
        flex={1}
        maxWidth={'1296px'}
        width={'100%'}
        paddingHorizontal="$4"
        justifyContent="space-between"
      >
        {children}
      </YStack>
    </XStack>

  );
}


export default LayoutContainer;
