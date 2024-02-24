import { Image } from 'react-native';
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

export default function QrCard() {
  return (
    <YStack
      alignItems="center"
      gap="$4"
      backgroundColor={'rgba(255, 251, 237, 1)'}
      padding="$4"
      borderRadius="$2"
    >
      <XStack gap="$4">
        <Text fontWeight="bold" fontSize="$3">
          رمز الشحنة
        </Text>
        <Text fontWeight="bold" fontSize="$3">
          SWDKSA256399
        </Text>
      </XStack>
      <Image
        source={{
          uri: 'https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png',
        }}
        width={154}
        height={154}
      />
    </YStack>
  );
}
