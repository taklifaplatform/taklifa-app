import { ChannelLayout } from '@zix/features/chat';
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <ChannelLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </ChannelLayout>
  );
}
