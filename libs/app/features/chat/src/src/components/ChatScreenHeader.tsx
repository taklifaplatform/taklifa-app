import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useChatContext, useTheme } from 'stream-chat-expo';

import { RoundButton } from './RoundButton';
import { ScreenHeader } from './ScreenHeader';

import { NewDirectMessageIcon } from '../icons/NewDirectMessageIcon';

import { useRouter } from 'solito/router';
import { NetworkDownIndicator } from './NetworkDownIndicator';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40
  }
});

export const ChatScreenHeader: React.FC<{ title?: string }> = ({
  title = 'Sawaeed Chat'
}) => {
  const {
    theme: {
      colors: { accent_blue }
    }
  } = useTheme();
  const router = useRouter();
  const { client: chatClient } = useChatContext();
  const { isOnline } = useChatContext();

  return (
    <ScreenHeader
      LeftContent={() => (
        <TouchableOpacity onPress={() => alert('NOTHING!!')}>
          <Image
            source={{
              uri: chatClient?.user?.image
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      RightContent={() => (
        <RoundButton
          onPress={() => {
            router.push('/chat/new-direct-messaging');
          }}
        >
          <NewDirectMessageIcon
            active
            color={accent_blue}
            height={25}
            width={25}
          />
        </RoundButton>
      )}
      Title={
        isOnline ? undefined : () => <NetworkDownIndicator titleSize="large" />
      }
      titleText={title}
    />
  );
};
