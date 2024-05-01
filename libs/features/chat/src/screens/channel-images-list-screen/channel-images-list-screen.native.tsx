import Dayjs from 'dayjs';

import { CustomIcon } from '@zix/ui/icons';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, ViewToken } from 'react-native';
import type { Attachment } from 'stream-chat';
import { useChannelContext, useImageGalleryContext } from 'stream-chat-expo';
import { View } from 'tamagui';
import ChannelHeader from '../../components/channel-header/channel-header';
import { usePaginatedAttachments } from '../../hooks/usePaginatedAttachments';
import { ScreenLayout } from '@zix/ui/layouts';


const screen = Dimensions.get('screen').width;

export function ChannelImagesListScreen() {
  const { channel } = useChannelContext();
  const {
    messages: images,
    setMessages: setImages,
    setSelectedMessage: setImage,
  } = useImageGalleryContext();
  const { loading, loadMore, messages } = usePaginatedAttachments(
    channel,
    'image',
  );

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

  const photos = messages.reduce((acc: Photo[], cur) => {
    const attachmentImages =
      (cur.attachments as Attachment[])?.filter(
        (attachment) =>
          attachment.type === 'image' &&
          !attachment.title_link &&
          !attachment.og_scrape_url &&
          (attachment.image_url || attachment.thumb_url),
      ) || [];

    const attachmentPhotos = attachmentImages.map((attachmentImage) => ({
      created_at: cur.created_at,
      id: `photoId-${cur.id}-${attachmentImage.image_url || attachmentImage.thumb_url
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
      (message.attachments as Attachment[])
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
    <ScreenLayout safeAreaBottom authProtected>
      <ChannelHeader />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
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
              // setOverlay('gallery');
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
        style={{
          flex: 1
        }}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </ScreenLayout>
  );
}

const EmptyListComponent = () => {
  return (
    <View flex={1} alignItems='center' justifyContent='center'>
      <CustomIcon name='empty_chat' size='$20' />
    </View>
  );
};

export default ChannelImagesListScreen;
