import { Image } from 'react-native';
import React from 'react';
import { XStack, YStack, Text } from '@zix/core/ui';
import { CustomIcon } from '@zix/app/ui/icons';

export function RatingCard({ item }) {
  return (
    <YStack space="$4">
      <XStack justifyContent="space-between" alignItems="flex-end">
        <XStack space="$3">
          <Image
            source={{ uri: item.image }}
            style={{ width: 35, height: 35, borderRadius: 50 }}
          />
          <YStack space="$2">
            <Text fontWeight="bold">{item.user}</Text>
            <Text color={'$gray9'} fontWeight="500">
              {item.date}
            </Text>
          </YStack>
        </XStack>
        <XStack paddingVertical="$4" alignItems="center">
          <Text color={'$gray9'} paddingRight="$2">
            {item.rating}
          </Text>
          <CustomIcon name="star" size={15} color={'#FECA16'} />
          <CustomIcon name="star" size={15} color={'#FECA16'} />
          <CustomIcon name="star" size={15} color={'#FECA16'} />
          <CustomIcon name="half_star" size={15} color={'#FECA16'} />
        </XStack>
      </XStack>
      <Text lineHeight="$4">{item.desc}</Text>
    </YStack>
  );
}
