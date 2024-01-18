import React, { useEffect, useState } from 'react';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-expo';

import { useUser } from '@zix/core/auth';
import { useRouter } from 'solito/router';
import { StreamChat } from 'stream-chat';
import { Stack } from 'expo-router';

const client = StreamChat.getInstance('e2yk5ayrht2m');

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.sUGnVd7E7bhs4HQTDyTKMnSA2YszXlgkrs2OnaMUQSQ';

const tokens = {
  '966111111111111':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTY2MTExMTExMTExMTExIn0.g3YLeI7NLdkLeLyUl40x_7beHQBMgoBTG5L7-4VVfNU',
  '966222222222222':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTY2MjIyMjIyMjIyMjIyIn0.eqgLbSNVA82x_jMJ4Ezs_U0LkxEbM1pgUslVLJYUP8I'
};
export default function StreamChatListScreen() {
  const router = useRouter();
  const [userConnected, setUserConnected] = useState();
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
      console.log('connectUser->error::', error, user.phone);
      console.log('=========');
    }
  }

  useEffect(() => {
    connectUser();
    return () => {
      // client.disconnectUser()
    };
  }, []);

  async function createChannel() {
    const channel = client.channel('messaging', {
      members: ['jlahey', '247labs-abc']
    });
    await channel.create();
  }

  if (!userConnected) return null;
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Stream Chat List',
          headerShown: true
        }}
      />
      <OverlayProvider>
        <Chat client={client}>
          <ChannelList
            filters={{ type: 'messaging', members: { $in: [user?.phone] } }}
            onSelect={(channel) => {
              console.log('onSelect::', channel.id);
              router.push(`/messenger/channels/${channel.id}`);
            }}
          />
        </Chat>
      </OverlayProvider>
    </>
  );
}
