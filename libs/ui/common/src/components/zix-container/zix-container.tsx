
import React from 'react';

import { View, XStack } from 'tamagui';

export type ZixContainerProps = {
  children: React.ReactNode;
}


export const ZixContainer: React.FC<ZixContainerProps> = ({
  children
}) => {
  return (
    <XStack justifyContent='space-around' width='100%'>
      <View maxWidth={'1296px'} width='100%' paddingHorizontal='$4'>
        {children}
      </View>
    </XStack>
  );
}


export default ZixContainer;
