import React from 'react';

import { Spinner, SpinnerProps, YStack } from 'tamagui';

export const FullScreenSpinner: React.FC<SpinnerProps> = (props) => {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Spinner {...props} />
    </YStack>
  );
};

export default FullScreenSpinner;
