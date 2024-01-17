import { AppHeader } from '@zix/app/ui/common';

import { Avatar, Button, Stack, Text, View, XStack, YStack } from 'tamagui';

import { CustomIcon } from '@zix/app/ui/icons';
import React from 'react';

// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=2327-12534&mode=design&t=qL3wyztSyKaOgoFi-4
export default function Screen() {
  return (
    <>
      <AppHeader showBackButton title="Orders" />

      <View backgroundColor="gray" flex={1}>
        <View
          backgroundColor="white"
          margin="$4"
          borderRadius="$5"
          overflow="hidden"
        >
          <XStack
            padding="$4"
            marginVertical="$1.5"
            borderBottomWidth="$1"
            space="$2.5"
          >
            <XStack flex={1} alignItems="center">
              <Avatar circular size="$4.5">
                <Avatar.Image
                  accessibilityLabel="Nate Wienert"
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                />
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
              </Avatar>
              <Avatar
                circular
                size="$5"
                marginLeft="$-5"
                borderWidth="$1"
                borderColor="$gray6"
              >
                <Avatar.Image
                  accessibilityLabel="Nate Wienert"
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
                />
                <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
              </Avatar>
            </XStack>

            <YStack flex={2} justifyContent="space-between">
              <Text fontSize="$1" fontWeight="bold">
                John Doe
              </Text>
              <XStack alignItems="center" space="$1">
                <CustomIcon name="half_star" size={14} color="$color5" />
                <Text fontSize={10} color="$gray11">
                  4.7/5
                </Text>
              </XStack>
              <XStack alignItems="center" space="$1">
                <CustomIcon name="local_shipping" size={14} color="$gray10" />
                <Text fontSize={10} color="$gray11" numberOfLines={1}>
                  Mercedes-White TNJ7653
                </Text>
              </XStack>
            </YStack>

            <XStack flex={1} space="$2.5" alignItems="center">
              <Button
                size="$2.5"
                icon={(props) => <CustomIcon name="chat" {...props} />}
              />
              <Button
                size="$2.5"
                icon={(props) => <CustomIcon name="star" {...props} />}
              />
            </XStack>
          </XStack>

          <XStack
            padding="$4"
            marginVertical="$1.5"
            justifyContent="space-between"
            backgroundColor="green"
          >
            <Text>A</Text>
            <Text>B</Text>
            <Text>C</Text>
          </XStack>
          <Stack
            marginVertical="$1.5"
            marginHorizontal="$4"
            height="$10"
            backgroundColor="blue"
            borderRadius="$5"
          ></Stack>
          <YStack
            padding="$4"
            marginVertical="$1.5"
            justifyContent="space-between"
            backgroundColor="green"
          >
            <XStack
              padding="$4"
              marginVertical="$1.5"
              justifyContent="space-between"
              backgroundColor="red"
            >
              <Text>A</Text>
              <Text>B</Text>
            </XStack>
            <XStack
              padding="$4"
              marginVertical="$1.5"
              justifyContent="space-between"
              backgroundColor="red"
            >
              <Text>A</Text>
              <Text>B</Text>
            </XStack>
            <XStack
              padding="$4"
              marginVertical="$1.5"
              justifyContent="space-between"
              backgroundColor="purple"
            >
              <Text>A</Text>
              <Text>B</Text>
            </XStack>
          </YStack>
        </View>
      </View>
    </>
  );
}
