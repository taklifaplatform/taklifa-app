import { Spinner, Stack, Theme, YStack } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
      <YStack
        f={1}
        gap="$4"
        p="$4"
        alignItems="center"
        justifyContent="center"
        onLayout={() => {
          router.replace('/auth');
        }}
      >
        <Theme name="light">
          <Stack width="$20">
            <CustomIcon name="logo" size="$20" color="$color5" />
            <Spinner mt="$4" size="large" color="$color5" />
          </Stack>
        </Theme>
      </YStack>
    </SafeAreaView>
  );
}
