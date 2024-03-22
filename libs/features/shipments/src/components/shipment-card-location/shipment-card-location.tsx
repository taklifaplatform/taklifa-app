import { PhoneCall, User } from '@tamagui/lucide-icons';
import { LocationTransformer, ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text, Stack, ThemeableStackProps } from 'tamagui';

/* eslint-disable-next-line */
export type ShipmentCardLocationProps = ThemeableStackProps & {
  location: LocationTransformer;
  date: string;
  phone_number: string;
  userName: string;
};

export const ShipmentCardLocation: React.FC<ShipmentCardLocationProps> = ({
  date,
  location,
  phone_number,
  userName,
  ...props
}) => {
  return (
    <YStack
      gap="$2"
      width={'100%'}
      padding={'$4'}
      borderWidth="$0.5"
      borderColor={'$color9'}
      borderRadius={'$6'}
      {...props}
    >
      <XStack justifyContent="space-between">
        <Text color={'$color'}>{date}</Text>
        {location.is_primary ? (
          <Stack
            paddingHorizontal="$3"
            backgroundColor={'$color5'}
            borderRadius={'$3'}
          >
            <Text fontSize={15} fontWeight={500}>
              {t('shipment:primary')}
            </Text>
          </Stack> 
        ): null}
      </XStack>
      <Stack width={'100%'} alignItems="flex-start">
        <Text fontSize={15} fontWeight={600}>
          {location.address}
        </Text>
      </Stack>

      <XStack gap="$4">
        <XStack gap="$2" alignItems="center">
          <User size="$1" color={'$color9'} />
          <Text>{userName}</Text>
        </XStack>
        <XStack gap="$2" alignItems="center">
          <PhoneCall size="$1" color={'$color9'} />
          <Text>{phone_number}</Text>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ShipmentCardLocation;
