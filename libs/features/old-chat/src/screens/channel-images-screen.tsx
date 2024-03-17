import Dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DateHeader,
  Photo,
  useChannelContext,
  useImageGalleryContext,
  useOverlayContext,
  useTheme,
} from 'stream-chat-expo';

import { FileImage } from '@tamagui/lucide-icons';
import type { Attachment } from 'stream-chat';
import { ScreenHeader } from '../components';
import { usePaginatedAttachments } from '../hooks';
import { StreamChatGenerics } from '../types';

const screen = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  contentContainer: { flexGrow: 1 },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  flex: { flex: 1 },
  noMedia: {
    fontSize: 16,
    paddingBottom: 8,
  },
  noMediaDetails: {
    fontSize: 14,
    textAlign: 'center',
  },
  stickyHeader: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 8, // DateHeader already has marginTop 8
  },
});

export const ChannelImagesScreen: React.FC = () => {
  const { channel } = useChannelContext();
  const {
    messages: images,
    setMessages: setImages,
    setSelectedMessage: setImage,
  } = useImageGalleryContext<StreamChatGenerics>();
  const { setOverlay } = useOverlayContext();
  const { loading, loadMore, messages } = usePaginatedAttachments(
    channel,
    'image',
  );
  const {
    theme: {
      colors: { white },
    },
  } = useTheme();

  const channelImages = useRef(images);

  const [stickyHeaderDate, setStickyHeaderDate] = useState(
    Dayjs(messages?.[0]?.created_at).format('MMM YYYY'),
  );
  const stickyHeaderDateRef = useRef('');

  const updateStickyDate = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems?.length) {
        const lastItem = viewableItems[0];

        const created_at = lastItem?.item?.created_at;

        if (
          created_at &&
          !lastItem.item.deleted_at &&
          Dayjs(created_at).format('MMM YYYY') !== stickyHeaderDateRef.current
        ) {
          stickyHeaderDateRef.current = Dayjs(created_at).format('MMM YYYY');
          const isCurrentYear =
            new Date(created_at).getFullYear() === new Date().getFullYear();
          setStickyHeaderDate(
            isCurrentYear
              ? Dayjs(created_at).format('MMM')
              : Dayjs(created_at).format('MMM YYYY'),
          );
        }
      }
    },
  );

  /**
   * Photos array created from all currently available
   * photo attachments
   */
  messages.forEach((message) => {
    console.log('=');
    console.log('=');
    console.log('message::', JSON.stringify(message, null, 2));
    console.log('=');
    console.log('=');
    console.log('=');
  });
  const photos = messages.reduce((acc: Photo<StreamChatGenerics>[], cur) => {
    const attachmentImages =
      (cur.attachments as Attachment<StreamChatGenerics>[])?.filter(
        (attachment) =>
          attachment.type === 'image' &&
          !attachment.title_link &&
          !attachment.og_scrape_url &&
          (attachment.image_url || attachment.thumb_url),
      ) || [];

    const attachmentPhotos = attachmentImages.map((attachmentImage) => ({
      created_at: cur.created_at,
      id: `photoId-${cur.id}-${
        attachmentImage.image_url || attachmentImage.thumb_url
      }`,
      messageId: cur.id,
      uri: attachmentImage.image_url || (attachmentImage.thumb_url as string),
    }));

    return [...acc, ...attachmentPhotos];
  }, []);

  const messagesWithImages = messages
    .map((message) => ({ ...message, groupStyles: [], readBy: false }))
    .filter((message) => {
      if (!message.deleted_at && message.attachments) {
        return message.attachments.some(
          (attachment) =>
            attachment.type === 'image' &&
            !attachment.title_link &&
            !attachment.og_scrape_url &&
            (attachment.image_url || attachment.thumb_url),
        );
      }
      return false;
    });

  /**
   * This is for the useEffect to run again in the case that a message
   * gets edited with more or the same number of images
   */
  const imageString = messagesWithImages
    .map((message) =>
      (message.attachments as Attachment<StreamChatGenerics>[])
        .map((attachment) => attachment.image_url || attachment.thumb_url || '')
        .join(),
    )
    .join();

  const numberOfMessagesWithImages = messagesWithImages.length;
  useEffect(() => {
    setImages(messagesWithImages);
    return () => setImages(channelImages.current);
  }, [imageString, numberOfMessagesWithImages]);

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: white }]}>
      <ScreenHeader inSafeArea titleText="Photos and Videos" />
      <View style={styles.flex}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={photos}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListEmptyComponent={EmptyListComponent}
          numColumns={3}
          onEndReached={loadMore}
          onViewableItemsChanged={updateStickyDate.current}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setImage({
                  messageId: item.messageId,
                  url: item.uri,
                });
                setOverlay('gallery');
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{
                  height: screen / 3,
                  margin: 1,
                  width: screen / 3 - 2,
                }}
              />
            </TouchableOpacity>
          )}
          style={styles.flex}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 50,
          }}
        />
        {photos && photos.length ? (
          <View style={styles.stickyHeader}>
            <DateHeader dateString={stickyHeaderDate} />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const EmptyListComponent = () => {
  const {
    theme: {
      colors: { black, grey, grey_gainsboro },
    },
  } = useTheme();
  return (
    <View style={styles.emptyContainer}>
      <FileImage fill={grey_gainsboro} scale={6} />
      <Text style={[styles.noMedia, { color: black }]}>No media</Text>
      <Text style={[styles.noMediaDetails, { color: grey }]}>
        Photos or video sent in this chat will appear here
      </Text>
    </View>
  );
};

export default ChannelImagesScreen;
