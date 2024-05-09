
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MediaTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { useSafeAreaInsets } from '@zix/utils';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import {
  ImageGalleryFooter,
  ImageGalleryOverlay,
  ImageGrid,
  ImageGridHandle,
  Photo,
  useViewport
} from 'stream-chat-expo';
import { Image, SizeTokens, Stack, ThemeableStackProps, View } from 'tamagui';


export type ZixMediasListWidgetProps = ThemeableStackProps & {
  medias?: MediaTransformer[];
  imageWidth?: SizeTokens;
  imageHeight?: SizeTokens;
}


export const ZixMediasListWidget: React.FC<ZixMediasListWidgetProps> = ({
  medias = [],
  imageWidth = 62,
  imageHeight = 43,
  ...props
}) => {
  // Hooks
  const { isRtl } = useMultiLang()

  const { top, bottom } = useSafeAreaInsets()

  // States
  const [imageGalleryAttachments, setImageGalleryAttachments] = useState<
    Photo[]>([]);
  const [currentBottomSheetIndex, setCurrentBottomSheetIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [gridPhotos, setGridPhotos] = useState<Photo[]>([]);

  // Reanimated
  const animatedBottomSheetIndex = useSharedValue(0);
  const { vh, vw } = useViewport();
  const headerFooterVisible = useSharedValue(1);
  const headerFooterOpacity = useDerivedValue(() => {
    return currentBottomSheetIndex === 0 ? 1 : 0;

  });

  // Constants
  const numberOfImageGalleryGridColumns = 2;
  const fullWindowHeight = vh(90);
  const fullWindowWidth = vw(100);

  // Refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const imageGalleryFooterRef = useRef<ImageGalleryFooter>(null);
  const carouselRef = useRef<ICarouselInstance>(null)

  // Snap Points
  const snapPoints = React.useMemo(
    () => [(fullWindowHeight * 3) / 4, fullWindowHeight - 40],
    [],
  );
  const onSnapToItem = (index: number) => {
    setSelectedIndex(index);
  };

  // Effects
  useEffect(() => {
    setImageGalleryAttachments(medias.map((media) => ({
      id: String(media.id),
      uri: media.original_url,
      original_width: imageWidth,
      original_height: imageHeight,
      type: 'image'
    })));
  }, []);



  // functions to close and open the grid view
  const closeGridView = () => {
    if (bottomSheetModalRef.current?.close) {
      bottomSheetModalRef.current.close();
      setGridPhotos([]);
    }
  };
  const openGridView = () => {
    if (bottomSheetModalRef.current?.present) {
      bottomSheetModalRef.current.present();
      setGridPhotos(imageGalleryAttachments);
    }
  };
  const closeGalleryView = () => {
    if (imageGalleryFooterRef.current?.close) {
      imageGalleryFooterRef.current.close();
      setGridPhotos([]);
    }
  };
  const openGalleryView = () => {
    if (imageGalleryFooterRef.current?.present) {
      imageGalleryFooterRef.current.present();
      setGridPhotos(imageGalleryAttachments);
    }
  };

  // function to handle the play pause of the audio
  const handlePlayPause = (index: string, pausedStatus?: boolean) => {
    if (pausedStatus === false) {
      // If the status is false we set the audio with the index as playing and the others as paused.
      setImageGalleryAttachments((prevImageGalleryAttachment) =>
        prevImageGalleryAttachment.map((imageGalleryAttachment) => ({
          ...imageGalleryAttachment,
          paused: imageGalleryAttachment.id === index ? false : true,
        })),
      );
    } else {
      // If the status is true we simply set all the audio's paused state as true.
      setImageGalleryAttachments((prevImageGalleryAttachment) =>
        prevImageGalleryAttachment.map((imageGalleryAttachment) => ({
          ...imageGalleryAttachment,
          paused: true,
        })),
      );
    }
  };
  const onPlayPause = (status?: boolean) => {
    if (status === undefined) {
      if (imageGalleryAttachments[selectedIndex].paused) {
        handlePlayPause(imageGalleryAttachments[selectedIndex].id, false);
      } else {
        handlePlayPause(imageGalleryAttachments[selectedIndex].id, true);
      }
    } else {
      handlePlayPause(imageGalleryAttachments[selectedIndex].id, status);
    }
  };

  // functions to render the carousel
  const renderCarouselItem = ({
    item,
    index,
  }: {
    index: number;
    item: Photo;
  }) => {
    return (
      <Stack flex={1} justifyContent='center' alignItems='center'>
        <Image
          key={`key-${index}`}
          source={{ uri: item.uri }}
          width={fullWindowWidth}
          height={fullWindowHeight}
          borderRadius="$4"
          marginHorizontal="$2"
          resizeMode='center'
        />
      </Stack>
    );
  };

  const renderCarousel = () => (
    <Carousel
      key={imageGalleryAttachments.length}
      ref={carouselRef}
      width={fullWindowWidth}
      height={fullWindowHeight}
      autoPlay={false}
      data={imageGalleryAttachments || []}
      defaultIndex={selectedIndex}
      renderItem={renderCarouselItem}
      onSnapToItem={onSnapToItem}
    />
  )

  // function to render the image gallery
  const renderImageGallery = () => (
    <BottomSheetModal
      animatedIndex={animatedBottomSheetIndex}
      enablePanDownToClose={true}
      index={0}
      onChange={(index: number) => {
        setCurrentBottomSheetIndex(index)
      }}
      ref={imageGalleryFooterRef}
      snapPoints={['100%']}
      topInset={top}
      bottomInset={bottom}
    >
      <ImageGridHandle
        closeGridView={closeGalleryView}
      />
      {renderCarousel()}
      {imageGalleryAttachments[selectedIndex] && (
        <ImageGalleryFooter
          accessibilityLabel={'Image Gallery Footer'}
          onPlayPause={onPlayPause}
          duration={imageGalleryAttachments[selectedIndex].duration || 0}
          opacity={headerFooterOpacity}
          openGridView={() => openGridView()}
          paused={imageGalleryAttachments[selectedIndex].paused || false}
          photo={imageGalleryAttachments[selectedIndex]}
          photoLength={imageGalleryAttachments.length}
          progress={imageGalleryAttachments[selectedIndex].progress || 0}
          selectedIndex={selectedIndex}
          visible={headerFooterVisible}
          videoRef={imageGalleryFooterRef}
        />
      )}
      <ImageGalleryOverlay
        animatedBottomSheetIndex={animatedBottomSheetIndex}
        closeGridView={closeGridView}
        currentBottomSheetIndex={currentBottomSheetIndex}
      />
    </BottomSheetModal>
  )

  // function to render the image grid
  const renderImageGrid = () => (
    <BottomSheetModal
      animatedIndex={animatedBottomSheetIndex}
      enablePanDownToClose={true}
      handleComponent={() => (
        <ImageGridHandle
          closeGridView={closeGridView}
        />
      )}
      index={0}
      onChange={(index: number) => setCurrentBottomSheetIndex(index)}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
    >
      <ImageGrid
        closeGridView={closeGridView}
        numberOfImageGalleryGridColumns={numberOfImageGalleryGridColumns}
        photos={gridPhotos}
        setSelectedMessage={(index) => {
          imageGalleryAttachments.filter((photo, i) => {
            if (photo.uri === index?.url) {
              setSelectedIndex(i);
              //setCurrentBottomSheetIndex(i);
            }
          });
        }
        }
      />
    </BottomSheetModal>

  )

  if (!medias.length) return null;

  return (
    <View minHeight={imageHeight} {...props}>
      <FlatList
        data={medias}
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted={isRtl}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => {
            openGalleryView()

          }}>
            <Image
              key={`key-${index}`}
              source={{ uri: item.original_url }}
              width={imageWidth}
              height={imageHeight}
              borderRadius="$4"
              marginHorizontal="$2"
              resizeMode='cover'
            />
          </Pressable>
        )}
      />
      {renderImageGallery()}
      {renderImageGrid()}

    </View>
  );
}

export default ZixMediasListWidget;
