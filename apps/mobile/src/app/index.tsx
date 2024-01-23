import { Spinner, Stack, Theme, YStack } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { router } from 'expo-router';
import React from 'react';

export default function Screen() {
  return (
    <YStack
      flex={1}
      gap="$4"
      padding="$4"
      alignItems="center"
      justifyContent="center"
      onLayout={() => {
        router.replace('/customer');
      }}
    >
      <Theme name="light">
        <Stack width="$20">
          <CustomIcon name="logo" size="$20" color="$color5" />
          <Spinner mt="$4" size="large" color="$color5" />
        </Stack>
      </Theme>
    </YStack>
  );
}
