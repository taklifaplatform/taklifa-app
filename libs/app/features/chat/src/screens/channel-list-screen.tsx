import { useScrollToTop } from '@react-navigation/native';
import {
  Button,
  Input,
  Text,
  Input as TextInput,
  View,
  XStack
} from '@zix/app/ui/core';
import React, { useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Channel } from 'stream-chat';
import {
  ChannelList,
  Search,
  useChatContext,
  useTheme
} from 'stream-chat-expo';
import { ChannelPreview } from '../src/components/ChannelPreview';
import { ChatScreenHeader } from '../src/components/ChatScreenHeader';
import { MessageSearchList } from '../src/components/MessageSearch/MessageSearchList';
import { usePaginatedSearchedMessages } from '../src/hooks/usePaginatedSearchedMessages';

import type { ChannelSort } from 'stream-chat';

import { XCircle } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import type { StreamChatGenerics } from '../src/types';

const styles = StyleSheet.create({
  channelListContainer: {
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
  emptyIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  emptyIndicatorText: { paddingTop: 28 },
  flex: {
    flex: 1
  },
  searchContainer: {
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    includeFontPadding: false, // for android vertical text centering
    padding: 0, // removal of default text input padding on android
    paddingHorizontal: 10,
    paddingTop: 0, // removal of iOS top padding for weird centering
    textAlignVertical: 'center' // for android vertical text centering
  }
});

const baseFilters = {
  type: 'messaging'
};
const sort: ChannelSort<StreamChatGenerics> = { last_updated: -1 };
const options = {
  presence: true,
  state: true,
  watch: true
};

export function ChannelListScreen() {
  const { client: chatClient } = useChatContext();
  const router = useRouter();
  const {
    theme: {
      colors: { black, grey, grey_gainsboro, grey_whisper, white, white_snow }
    }
  } = useTheme();

  const searchInputRef = useRef<TextInput | null>(null);
  const scrollRef = useRef<FlatList<Channel<StreamChatGenerics>> | null>(null);

  const [searchInputText, setSearchInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { loading, loadMore, messages, refreshing, refreshList, reset } =
    usePaginatedSearchedMessages(searchQuery);

  const chatClientUserId = chatClient?.user?.id;
  const filters = useMemo(
    () => ({
      ...baseFilters,
      members: {
        $in: [chatClientUserId]
      }
    }),
    [chatClientUserId]
  );

  useScrollToTop(scrollRef);

  const EmptySearchIndicator = () => (
    <View style={styles.emptyIndicatorContainer}>
      <Search height={112} pathFill={grey_gainsboro} width={112} />
      <Text style={[styles.emptyIndicatorText, { color: grey }]}>
        {`No results for "${searchQuery}"`}
      </Text>
    </View>
  );

  const setScrollRef = (
    ref: React.RefObject<FlatList<Channel<StreamChatGenerics>> | null>
  ) => {
    scrollRef.current = ref;
  };

  if (!chatClient) {
    return null;
  }

  const renderSearchBar = () => (
    <XStack
      padding="$4"
      paddingVertical="$2"
      alignItems="center"
      justifyContent="space-between"
    >
      <XStack
        alignItems="center"
        flex={1}
        borderWidth="$0.5"
        borderRadius="$5"
        borderColor="$gray10"
      >
        <Button
          size="$4"
          icon={Search}
          color="$color5"
          marginRight="$-3"
          backgroundColor="white"
        />
        <Input
          size="$4"
          placeholder={'Search here'}
          flex={1}
          borderColor="transparent"
          focusStyle={{ borderColor: 'transparent' }}
          value={searchInputText}
          onChangeText={(text) => {
            setSearchInputText(text);
            if (!text) {
              reset();
              setSearchQuery('');
            }
          }}
          onSubmitEditing={({ nativeEvent: { text } }) => {
            setSearchQuery(text);
          }}
          ref={searchInputRef}
          returnKeyType="search"
        />

        {!!searchInputText && (
          <Button
            unstyled
            paddingHorizontal="$2.5"
            paddingVertical="$1.5"
            icon={<XCircle size="$1" />}
            marginLeft="$-4"
            onPress={() => {
              setSearchInputText('');
              setSearchQuery('');
              if (searchInputRef.current) {
                searchInputRef.current.blur();
              }
              reset();
            }}
          />
        )}
      </XStack>
    </XStack>
  );

  return (
    <View flex={1}>
      <ChatScreenHeader />

      <View flex={1}>
        {renderSearchBar()}

        {(!!searchQuery || (messages && messages.length > 0)) && (
          <MessageSearchList
            EmptySearchIndicator={EmptySearchIndicator}
            loading={loading}
            loadMore={loadMore}
            messages={messages}
            ref={scrollRef}
            refreshing={refreshing}
            refreshList={refreshList}
            showResultCount
          />
        )}
        <View flex={searchQuery ? 0 : 1}>
          <View
            style={[
              styles.channelListContainer,
              { opacity: searchQuery ? 0 : 1 }
            ]}
          >
            <ChannelList<StreamChatGenerics>
              additionalFlatListProps={{
                getItemLayout: (_, index) => ({
                  index,
                  length: 65,
                  offset: 65 * index
                }),
                keyboardDismissMode: 'on-drag'
              }}
              filters={filters}
              HeaderNetworkDownIndicator={() => null}
              maxUnreadCount={99}
              onSelect={(channel) => {
                router.push(`/chat/channels/${channel.id}`);
              }}
              options={options}
              Preview={ChannelPreview}
              setFlatListRef={setScrollRef}
              sort={sort}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
