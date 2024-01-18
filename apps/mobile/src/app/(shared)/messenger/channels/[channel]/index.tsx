import React, { useEffect, useState } from 'react';
import { createParam } from 'solito';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  MessageType,
  OverlayProvider,
  Thread
} from 'stream-chat-expo';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useUser } from '@zix/core/auth';
import { Channel as ChannelType, StreamChat } from 'stream-chat';
import { Stack } from 'expo-router';

const client = StreamChat.getInstance('e2yk5ayrht2m', {
  logger: (logLevel, msg, extra) => {
    console.log(logLevel, msg, extra);
  }
});

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.sUGnVd7E7bhs4HQTDyTKMnSA2YszXlgkrs2OnaMUQSQ';

const tokens = {
  '966111111111111':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTY2MTExMTExMTExMTExIn0.g3YLeI7NLdkLeLyUl40x_7beHQBMgoBTG5L7-4VVfNU',
  '966222222222222':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTY2MjIyMjIyMjIyMjIyIn0.eqgLbSNVA82x_jMJ4Ezs_U0LkxEbM1pgUslVLJYUP8I'
};
const { useParam } = createParam<{ channel: string }>();

export default function StreamChatScreen() {
  const [userConnected, setUserConnected] = useState();
  const [channel, setChannel] = useState<ChannelType>();
  const [channelId] = useParam('channel');
  const [thread, setThread] = useState<MessageType | null>();
  const { user, profile } = useUser();

  async function connectUser() {
    if (userConnected || !user?.phone || !profile) return;
    console.log('=connectUser');
    try {
      const result = await client.connectUser(
        {
          id: user?.phone,
          name: profile?.name,
          image: profile?.avatar_url
        },
        tokens[user?.phone]
      );
      setUserConnected(result);
      console.log('=========');
      console.log('result::', result);
      console.log('=========');
    } catch (error) {
      console.log('=========');
      console.log('connectUser->error::', error);
      console.log('=========');
    }
  }

  useEffect(() => {
    connectUser();
    return () => {
      // client.disconnectUser()
    };
  }, [profile]);

  useEffect(() => {
    if (!channelId) return;
    const $channel = client.getChannelById('messaging', channelId, {});
    setChannel($channel);
    console.log('=========');
    console.log('$channel::', channelId);
    console.log('=========');
  }, [channelId]);

  async function createChannel() {
    const channel = client.channel('messaging', {
      members: ['jlahey', '247labs-abc']
    });
    await channel.create();
  }

  const renderChatUI = () =>
    userConnected && (
      <Chat client={client}>
        {channel && (
          <Channel
            channel={channel}
            keyboardVerticalOffset={0}
            thread={thread}
            threadList={!!thread}
          >
            {thread ? (
              <Thread
                closeThread={() => {
                  setThread(null);
                }}
                closeThreadOnDismount
              />
            ) : (
              <>
                <MessageList onThreadSelect={setThread} />
                <MessageInput />
              </>
            )}
          </Channel>
        )}
      </Chat>
    );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Stream Messenger',
          headerShown: true
        }}
      />
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
        <OverlayProvider>{renderChatUI()}</OverlayProvider>
      </SafeAreaView>
    </>
  );
}
