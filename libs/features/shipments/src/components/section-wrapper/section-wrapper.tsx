import React from 'react';
import { Stack } from 'tamagui';

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <Stack
    padding="$3"
    backgroundColor={'$color1'}
    borderRadius={'$4'}
    $sm={{ backgroundColor: 'transparent' }}
  >
    {children}
  </Stack>
);

export default SectionWrapper;
