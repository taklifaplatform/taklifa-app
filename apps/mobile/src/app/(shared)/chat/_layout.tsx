import { ChatLayout } from '@zix/app/features/chat';
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <ChatLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </ChatLayout>
  );
}
