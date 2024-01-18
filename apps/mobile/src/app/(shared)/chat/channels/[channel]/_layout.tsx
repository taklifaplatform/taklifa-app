import { ChannelLayout } from '@zix/app/features/chat';
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <ChannelLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </ChannelLayout>
  );
}
