import { ChannelListScreen } from '@zix/app/features/chat';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChannelListScreen />
    </>
  );
}
