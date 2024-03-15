
import { Route } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Stack, XStack, Text, ThemeableStackProps } from 'tamagui';

/* eslint-disable-next-line */
export type ShipmentDeliveringDetailProps = ThemeableStackProps & {
}


export const ShipmentDeliveringDetail: React.FC<ShipmentDeliveringDetailProps> = ({ ...props}) => {
  return (
    <XStack width={'100%'} gap="$2" justifyContent="space-between">
            <Stack
              paddingHorizontal="$5"
              paddingVertical='$2'
              borderRadius={'$4'}
              backgroundColor={'$color3'}
              borderWidth="$1"
              borderColor={'$color5'}
              justifyContent='center'
              alignItems='center'
            >
              <Text color={'$color5'}>جاري التوصيل</Text>
            </Stack>
            <Stack
            flexDirection='row'
            gap="$2"
              paddingHorizontal="$5"
              paddingVertical='$2'
              borderRadius={'$4'}
              backgroundColor={'$gray3'}
              borderWidth="$1"
              borderColor={'$gray7'}
              justifyContent='center'
              alignItems='center'
            >
              <Route size={15} color={'$gray9'} rotate='90deg' />
              <Text color={'$gray9'}>٧٥ كلمتر</Text>
            </Stack>
            <Stack
            flexDirection='row'
            gap="$2"
              paddingHorizontal="$5"
              paddingVertical='$2'
              borderRadius={'$4'}
              backgroundColor={'$gray3'}
              borderWidth="$1"
              borderColor={'$gray7'}
              justifyContent='center'
              alignItems='center'
            >
              <CustomIcon name="time" size={15} color={'$gray9'} />
              <Text color={'$gray9'}>٣٠ دقيقة</Text>
            </Stack>
          </XStack>
  );
}


export default ShipmentDeliveringDetail;
