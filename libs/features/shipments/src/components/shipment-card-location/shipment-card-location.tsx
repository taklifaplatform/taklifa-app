import { PhoneCall, User } from '@tamagui/lucide-icons';
import { LocationTransformer, ShipmentTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text, Stack, ThemeableStackProps, View } from 'tamagui';

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
      gap="$3"
      paddingHorizontal='$4'
      paddingVertical='$3'
      borderWidth="$0.5"
      borderColor='$color9'
      borderRadius='$4'
      {...props}
    >
      <XStack justifyContent="space-between">
        <Text fontWeight='bold'>{date}</Text>
        {location.is_primary ? (
          <View
            theme='accent'
            paddingHorizontal="$3"
            paddingVertical="$1"
            backgroundColor='$color10'
            borderRadius='$3'
          >
            <Text fontWeight='700' >
              {t('shipment:primary')}
            </Text>
          </View>
        ) : null}
      </XStack>

      <Text fontWeight='bold'>
        {location.address}
      </Text>

      <XStack gap="$4">
        <XStack gap="$2" alignItems="center">
          <User size="$1" />
          <Text>{userName}</Text>
        </XStack>
        <XStack gap="$2" alignItems="center">
          <PhoneCall size="$1" />
          <Text>{phone_number}</Text>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default ShipmentCardLocation;
