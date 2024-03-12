import { PhoneCall, User } from '@tamagui/lucide-icons';
import { ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { XStack, YStack, Text, Stack } from 'tamagui';

/* eslint-disable-next-line */
export interface ShipmentCardLocationProps {
  address: string;
  date: string;
  icon: React.ReactNode;
  phone_number: string;
  userName: string;
}

export const ShipmentCardLocation: React.FC<ShipmentCardLocationProps> = ({
  address,
  date,
  icon,
  phone_number,
  userName,
}) => {
  return (
    <YStack
      gap="$2"
      width={'100%'}
      padding={'$4'}
      borderWidth="$0.5"
      borderColor={'$color'}
      borderRadius={'$4'}
    >
      <XStack justifyContent='space-between'>
        <Text>{date}</Text>
        <Stack paddingHorizontal="$3" backgroundColor={'$color5'} borderRadius={'$3'}>
          <Text fontSize={18} fontWeight={500}>
            الأولوية
          </Text>
        </Stack>
      </XStack>
      <Stack alignItems='flex-start'>
      <Text fontSize={18} fontWeight={600}>{address}</Text>
      </Stack>
      
      <XStack gap="$4">
        <XStack gap="$2" alignItems="center">
          <User size="$1" color={'$gray9'} />
          <Text>{userName}</Text>
        </XStack>
        <XStack gap="$2" alignItems="center">
          <PhoneCall size="$1" color={'$gray9'} />
          <Text>{phone_number}</Text>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ShipmentCardLocation;
