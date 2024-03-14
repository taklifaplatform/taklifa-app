import { PhoneCall, User } from '@tamagui/lucide-icons';
import { LocationTransformer, ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text, Stack } from 'tamagui';

/* eslint-disable-next-line */
export interface ShipmentCardLocationProps {
  location: LocationTransformer;
  date: string;
  phone_number: string;
  userName: string;
}

export const ShipmentCardLocation: React.FC<ShipmentCardLocationProps> = ({
  date,
  location,
  phone_number,
  userName,
}) => {
  return (
    <YStack
      gap="$2"
      width={'100%'}
      padding={'$4'}
      borderWidth="$0.5"
      borderColor={'$gray9'}
      borderRadius={'$6'}
    >
      <XStack justifyContent="space-between">
        <Text color={'$color'}>{date}</Text>
        <Stack
          paddingHorizontal="$3"
          backgroundColor={'$color5'}
          borderRadius={'$3'}
        >
          <Text fontSize={15} fontWeight={500}>
            {location.is_primary ? t('shipment:primary') : t('shipment:secondary')}
          </Text>
        </Stack>
      </XStack>
      <Stack width={'100%'} alignItems="flex-start">
        <Text fontSize={15} fontWeight={600}>
          {location.address}
        </Text>
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
