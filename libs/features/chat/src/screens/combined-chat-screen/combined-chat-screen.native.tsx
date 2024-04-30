
import { ScreenLayout } from '@zix/ui/layouts';
import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface CombinedChatScreenProps {
}


export function CombinedChatScreen(props: CombinedChatScreenProps) {
  return (
    <ScreenLayout>
      <Text>Welcome to combined-chat-screen!</Text>
    </ScreenLayout>
  );
}


export default CombinedChatScreen;
