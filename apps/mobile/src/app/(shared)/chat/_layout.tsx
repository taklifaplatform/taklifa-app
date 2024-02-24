import { ChatLayout } from '@zix/features/chat';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <ChatLayout>
        <Stack screenOptions={{ headerShown: false }} />
      </ChatLayout>
    </SafeAreaView>
  );
}
