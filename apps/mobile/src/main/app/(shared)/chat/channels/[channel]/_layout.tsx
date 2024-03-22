import { ChatChannelLayout } from '@zix/features/chat';
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <ChatChannelLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </ChatChannelLayout>
  );
}
