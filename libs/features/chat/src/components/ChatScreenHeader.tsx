import React from 'react';
import { useChatContext } from 'stream-chat-expo';

import { ScreenHeader } from './ScreenHeader';

import { MoreHorizontal, Plus } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { Button } from 'tamagui';
import { NetworkDownIndicator } from './NetworkDownIndicator';

export const ChatScreenHeader: React.FC<{ title?: string }> = ({
  title = 'Chat',
}) => {
  const router = useRouter();
  const { isOnline } = useChatContext();

  return (
    <ScreenHeader
      LeftContent={() => (
        <Button
          width="$4"
          backgroundColor="$gray5"
          color="black"
          onPress={() => {
            router.back();
          }}
          icon={(props) => <MoreHorizontal {...props} size="$2" />}
        />
      )}
      RightContent={() => (
        <Button
          width="$4"
          backgroundColor="$gray5"
          color="black"
          onPress={() => {
            router.push('/chat/new-direct-messaging');
          }}
          icon={(props) => <Plus {...props} size="$2" />}
        />
      )}
      Title={
        isOnline ? undefined : () => <NetworkDownIndicator titleSize="large" />
      }
      titleText={title}
    />
  );
};
