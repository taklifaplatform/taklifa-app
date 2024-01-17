import { View } from '@zix/app/ui/core';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useChatClient } from '../hooks/useChatClient';

export function ChatLayout() {
  const { client } = useChatClient();
  const { bottom } = useSafeAreaInsets();

  return (
    <View backgroundColor="white" flex={1}>
      <OverlayProvider bottomInset={bottom}>
        <Chat client={client}>
          <Stack screenOptions={{ headerShown: false }} />
        </Chat>
      </OverlayProvider>
    </View>
  );
}
