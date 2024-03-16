
import { AppHeader, DashboardLayout } from '@zix/ui/layouts';
import { useEffect, useState } from 'react';
import { Channel, ChannelHeader, ChannelList, MessageInput, Thread, VirtualizedMessageList, useChatContext } from 'stream-chat-react';
import { View, XStack } from 'tamagui';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  const { client } = useChatContext()

  const [screenReady, setScreenReady] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setScreenReady(true)
    }, 1000)
  }, [])

  const renderChatUI = () => (screenReady && !!client?.userID) && (
    <XStack flex={1} alignItems='stretch'>
      <View minWidth={300}>
        <ChannelList />
      </View>
      <View flex={1}>
        <Channel>
          <View flex={1}>
            <View bg='blue'>
              <ChannelHeader />
            </View>
            <View flex={1}>
              <VirtualizedMessageList />
            </View>
            <View bg='red'>
              <MessageInput />
            </View>
          </View>
          <Thread />
        </Channel>

      </View>

    </XStack>
  )

  return (
    <>
      <AppHeader
        title="Chat"
      />

      {renderChatUI()}
    </>
  );
}




Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

// TODO: we need to protect all screens
// export const getServerSideProps = userProtectedGetSSP()

export default Page
